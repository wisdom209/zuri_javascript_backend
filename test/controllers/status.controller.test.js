const request = require('supertest');
import makeApp from '../../app.js';
import sequelize from '../database/config.js';

describe("GET /api/status",() => {
	let response;
	beforeAll(async () => {
		const app = await makeApp(sequelize)
		response = await request(app).get('/api/status');
	})

	it("Should return a status of 200", () => expect(response.status).toBe(200))
	it("Should return a type of application/json", () => expect(response.type).toBe("application/json"))
	it("Should return an object that contains message: Success", () => expect(response.body.message).toBe("Success"))
	it("Should return an object that has status as 200", () => expect(response.body.status).toBe(200))
	it("Should return an object that has data say `Server is online`", () => expect(response.body.data).toBe("Server is online"))
});
