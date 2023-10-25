import { Op } from 'sequelize'
import supertest from 'supertest'
import makeApp from '../../app.js'
import sequelize from '../../src/database/config.js'
import Post from '../../src/database/model/Post.model.js'
import User from '../../src/database/model/User.model.js'
import { userRequestBody } from '../constants.js'

describe("GET /search", () => {
	let response;
	let app;

	beforeAll(async () => {
		await sequelize.sync()
		app = await makeApp(sequelize);
	})


	it("Should return a status of 200 when given a query parameter", async () => {
		response = await supertest(app).get('/api/search?query=france')
		expect(response.body.status).toBe(200);
	})

	it("Should return a status code of 400 when there is no query param", async () => {
		response = await supertest(app).get('/api/search')
		expect(response.status).toBe(400)
	})

	it("Should return a message of search parmeter is requierd when not given", async () => {
		response = await supertest(app).get('/api/search')
		expect(response.body.data).toBe("Search parameter is required")
	})

	it("Should return search results when search parameter is provided", async () => {
		const responseArr = [{...userRequestBody, country: "china"}]

		User.findAll = jest.fn(() => Promise.resolve(responseArr))

		response = await supertest(app).get('/api/search?query=china')

		expect(response.body.data).toEqual(responseArr)

		expect(response.status).toBe(200);

		expect(User.findAll).toHaveBeenCalled();

		expect(User.findAll.mock.calls).toHaveLength(1)

		expect(User.findAll).toHaveBeenCalledWith({
			where: {
				[Op.or]: [
					{ username: { [Op.like]: '%china%' } },
					{ firstname: { [Op.like]: '%china%' } },
					{ lastname: { [Op.like]: '%china%' } },
					{ email: { [Op.like]: '%china%' } },
					{ country: { [Op.like]: '%china%' } },
				],
			},
			include: { model: Post },
			limit: 10,
		});
	})

})

