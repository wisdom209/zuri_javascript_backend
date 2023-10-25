import supertest from 'supertest';
import makeApp from '../../app.js'
import sequelize from '../../src/database/config.js'
import Post from '../../src/database/model/Post.model.js';
import { postRequestBody, userRequestBody } from '../constants.js'
import User from '../../src/database/model/User.model.js';

describe("Testing the post model endpoints", () => {
	let app;

	beforeAll(async () => {
		app = await makeApp(sequelize)
	})

	describe("GET /api/posts", () => {
		it("should respond with status code of 200", async () => {
			const response = await supertest(app).get('/api/posts?page=1')
			expect(response.status).toBe(200)
		})

		it("should return 25 posts in the db per call", async () => {
			let postArray = Array(100).fill(postRequestBody)
			Post.findAll = jest.fn(() => Promise.resolve(postArray))

			const response = await supertest(app).get('/api/posts?page=3')

			expect(Post.findAll.mock.calls).toHaveLength(1)

			expect(Post.findAll).toHaveBeenCalledWith({
				limit: 25,
				offset: 50
			})

			expect(response.body.data).toEqual({ page: 3, posts: postArray })
		})
	})

	describe('GET /post/:postId', () => {

		it("should return not found error when post does not exist", async () => {
			Post.findByPk = jest.fn(() => Promise.resolve(null))

			const response = await supertest(app).get('/api/post/1');

			expect(Post.findByPk.mock.calls).toHaveLength(1)
			expect(Post.findByPk).toHaveBeenCalledWith("1")
			expect(response.body.data).toBe("Post not found")
			expect(response.status).toBe(404)
		})

		it("should return the post found when posts exists with response status code of 200", async () => {
			Post.findByPk = jest.fn(() => Promise.resolve({ toJSON: () => postRequestBody }))

			const response = await supertest(app).get('/api/post/1');

			expect(Post.findByPk.mock.calls).toHaveLength(1)
			expect(Post.findByPk).toHaveBeenCalledWith("1")

			expect(response.body).toEqual({ status: 200, message: "Success", data: postRequestBody })

			expect(response.status).toBe(200)
		})
	})

	describe("GET /post/user/:userId", () => {

		it("Should return bad request when no post is found for the user with given userId", async () => {
			User.findOne = jest.fn(() => Promise.resolve(null))

			const response = await supertest(app).get('/api/post/user/1')

			expect(response.status).toBe(404)
			expect(response.body.data).toBe("No posts found for this user")
			expect(User.findOne.mock.calls).toHaveLength(1)
			expect(User.findOne).toHaveBeenCalledWith({ where: { id: "1" }, include: [Post] })
		})

		it("Should return success when post is found for the user with given userId", async () => {
			User.findOne = jest.fn(() => Promise.resolve({ Posts: Array(5).fill(postRequestBody) }))

			const response = await supertest(app).get('/api/post/user/1')

			expect(response.status).toBe(200)
			expect(response.body.data).toEqual(Array(5).fill(postRequestBody))
			expect(User.findOne.mock.calls).toHaveLength(1)
			expect(User.findOne).toHaveBeenCalledWith({ where: { id: "1" }, include: [Post] })
		})
	})

	describe("POST /post", () => {
		it("should return not found error when user with given id is not found", async () => {
			User.findByPk = jest.fn(() => Promise.resolve(null))

			const response = await supertest(app).post('/api/post').send(postRequestBody)

			expect(response.status).toBe(404)
			expect(response.body.data).toBe("User not found")
		})

		it("should create post for user when user is found", async () => {
			const addPost = jest.fn()

			User.findByPk = jest.fn(() => Promise.resolve({ ...userRequestBody, addPost }))

			Post.create = jest.fn(() => Promise.resolve({
				toJSON: () => postRequestBody,
			}))

			const response = await supertest(app).post('/api/post').send({ ...postRequestBody, userId: 1 })


			expect(User.findByPk.mock.calls).toHaveLength(1)
			expect(User.findByPk).toHaveBeenCalledWith(1)

			expect(Post.create).toHaveBeenCalledWith(postRequestBody)

			expect(Post.create.mock.calls).toHaveLength(1)

			expect(response.status).toBe(201)

			expect(response.body.data).toEqual(postRequestBody)

			const user = await User.findByPk(1)

			expect(user.addPost.mock.calls).toHaveLength(1)
		})
	})

	describe("PUT /post", () => {
		it("Should update a post when called with the right userId", async () => {
			const saveMock = jest.fn(() => Promise.resolve({ toJSON: () => postRequestBody }))

			Post.findByPk = jest.fn(() => Promise.resolve({ toJSON: () => postRequestBody, save: saveMock }))

			const response = await supertest(app).put("/api/post").send({ ...postRequestBody, postId: 1 })

			expect(Post.findByPk.mock.calls).toHaveLength(1)
			expect(Post.findByPk).toHaveBeenCalledWith(1)
			expect(response.statusCode).toBe(200)

			let post = await Post.findByPk(1)
			expect(post.save).toHaveBeenCalled()
			expect(post.save.mock.calls).toHaveLength(1)
			expect(post.toJSON()).toEqual(postRequestBody)
		})

		it("should return a not found error when post to update is not found", async () => {
			Post.findByPk = jest.fn(() => Promise.resolve(null))

			const response = await supertest(app).put('/api/post').send({ ...postRequestBody, postId: 1 })

			expect(response.status).toBe(404)
			expect(response.body.data).toBe("Post not found")
		})
	})

	describe("DELETE /post/:postId", () => {
		it("should return not found error when post to delete is not found", async () => {

			Post.findByPk = jest.fn(() => Promise.resolve(null))

			const response = await supertest(app).delete('/api/post/1')

			expect(Post.findByPk.mock.calls).toHaveLength(1)
			expect(Post.findByPk).toHaveBeenCalledWith("1")
			expect(response.status).toBe(404)
			expect(response.body.data).toBe("Post not found")
		})

		it("should return a success message when post is deleted successfully", async () => {
			const destroyMock = jest.fn()

			Post.findByPk = jest.fn(() => Promise.resolve({ toJSON: () => postRequestBody, destroy: destroyMock }))

			const response = await supertest(app).delete('/api/post/1')

			expect(Post.findByPk.mock.calls).toHaveLength(1)
			expect(Post.findByPk).toHaveBeenCalledWith("1")
			expect(response.status).toBe(200)

			const post = await Post.findByPk(1)

			expect(post.destroy.mock.calls).toHaveLength(1)

			expect(response.body.data).toBe("Post deleted successfully")

		})
	})

})
