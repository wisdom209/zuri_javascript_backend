import supertest from "supertest";
import makeApp from '../../app.js';
import sequelize from "../../src/database/config.js";
import User from "../../src/database/model/User.model.js";
import { userRequestBody, usersArray } from "../constants.js";

describe("Test User endpoints", () => {
	let app, response;

	beforeAll(async () => {
		await sequelize.sync()
		app = await makeApp(sequelize)
	})

	describe("GET /api/users", () => {

		beforeAll(async () => {
			app = await makeApp(sequelize);
		})

		it("Should return a status of 200", async () => {
			response = await supertest(app).get('/api/users');
			expect(response.status).toBe(200)
		})

		it("Should call query the db to find all users", async () => {
			User.findAll = jest.fn(() => Promise.resolve(usersArray))

			response = await supertest(app).get('/api/users')
			expect(User.findAll).toHaveBeenCalled()

			expect(User.findAll.mock.calls).toHaveLength(1)

			expect(User.findAll).toHaveBeenCalledWith({
				limit: expect.any(Number),
				offset: expect.any(Number)
			})
		})

		it("Should return a list of users", async () => {
			User.findAll = jest.fn(() => Promise.resolve(usersArray))
			response = await supertest(app).get('/api/users')
			expect(response.body.data).toEqual({ page: expect.any(Number), users: usersArray })
		})
	})


	describe("POST /api/user", () => {

		it("Should return a bad request when missing a required field; call User.findAll", async () => {
			let newRequestBody = { ...userRequestBody }
			delete newRequestBody.country;

			User.findAll = jest.fn(() => Promise.resolve(userRequestBody))

			response = await supertest(app).post('/api/user').send(newRequestBody)

			expect(User.findAll.mock.calls).toHaveLength(0)
			expect(response.status).toBe(400)
			expect(response.body.data).toBe("Missing required field")
		})


		it("Should create a new user in the db when called with correct input", async () => {
			User.create = jest.fn(() => Promise.resolve({ ...userRequestBody, toJSON: () => userRequestBody }))
			response = await supertest(app).post('/api/user').send(userRequestBody)
			expect(response.statusCode).toBe(201)
			expect(User.create).toHaveBeenCalledWith(userRequestBody)
			expect(User.create.mock.calls).toHaveLength(1)
			expect(response.body.message).toBe("Resource created")
		})
	})


	describe("GET /api/user/:userId", () => {
		it("Should return success when user is found", async () => {
			User.findOne = jest.fn(() => Promise.resolve({ toJSON: () => userRequestBody }))

			response = await supertest(app).get('/api/user/1');
			expect(response.body.status).toBe(200)
			expect(User.findOne).toHaveBeenCalled()
			expect(User.findOne).toHaveBeenCalledWith({ where: { id: "1" } })
			expect(User.findOne.mock.calls).toHaveLength(1)
			expect(response.status).toBe(200)
		})

		it("Should return a bad request when a user not found", async () => {
			User.findOne = jest.fn(() => Promise.resolve(null))

			response = await supertest(app).get('/api/user/1');

			expect(response.body.status).toBe(404)
			expect(response.body.message).toBe("Not found")
			expect(User.findOne).toHaveBeenCalled()
			expect(User.findOne).toHaveBeenCalledWith({ where: { id: "1" } })
			expect(User.findOne.mock.calls).toHaveLength(1)

		})

	})

	it("Should call User.destroy when delete endpoint is hit and with the right userId", async () => {
		User.destroy = jest.fn()
		response = await supertest(app).delete('/api/user/1');

		expect(User.destroy.mock.calls).toHaveLength(1)

		expect(User.destroy).toHaveBeenCalledWith({ where: { id: "1" } })

		expect(response.status).toBe(200)
	})

	describe("PUT /:user/userId", () => {

		it("Should return a bad request error when given invalid request body", async () => {
			const requestBody = { ...userRequestBody }
			delete requestBody.username;

			User.findByPk = jest.fn(() => Promise.resolve({ toJSON: () => userRequestBody }))

			response = await supertest(app).put("/api/user/1").send(requestBody)

			expect(User.findByPk.mock.calls).toHaveLength(0)
			expect(response.statusCode).toBe(400)
		})

		it("Should return a not found error when user with given id is not found", async () => {

			User.findByPk = jest.fn(() => Promise.resolve(null))

			response = await supertest(app).put("/api/user/1").send(userRequestBody)

			expect(User.findByPk.mock.calls).toHaveLength(1)
			expect(User.findByPk).toHaveBeenCalledWith("1")
			expect(response.statusCode).toBe(404)
		})

		it("Should update a user when called with the right id", async () => {
			const saveMock = jest.fn(() => Promise.resolve({ toJSON: () => userRequestBody }))

			User.findByPk = jest.fn(() => Promise.resolve({ toJSON: () => userRequestBody, save: saveMock }))

			response = await supertest(app).put("/api/user/1").send(userRequestBody)
			
			expect(User.findByPk.mock.calls).toHaveLength(1)
			expect(User.findByPk).toHaveBeenCalledWith("1")
			expect(response.statusCode).toBe(200)

			let user = await User.findByPk("1")
			expect(user.save).toHaveBeenCalled()
			expect(user.save.mock.calls).toHaveLength(1)
			expect(user.toJSON()).toEqual(userRequestBody)
		})
	})
})
