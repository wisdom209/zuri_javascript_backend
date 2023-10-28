import User from '../database/model/User.model.js';
import * as responseHandler from '../utils/responseHandler.js';

const getUsers = async (req, res) => {
	try {
		let { page } = req.query

		page = Number(page);

		const users = await User.findAll({
			limit: 25,
			offset: isNaN(page) || page <= 1 ? 0 : (page - 1) * 25
		})

		return responseHandler.success(res, { page: isNaN(page) || page <= 1 ? 1 : page, users });
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}


const getUser = async (req, res) => {
	try {
		const { userId } = req.params;

		const user = await User.findOne({ where: { id: userId } })

		if (!user) return responseHandler.notFound(res, "User not found");

		return responseHandler.success(res, user.toJSON())
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}


const removeUser = async (req, res) => {
	try {
		const { userId } = req.params;

		await User.destroy({ where: { id: userId } })

		return responseHandler.success(res);
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const { username, firstname, lastname, email, country } = req.body;

		if (!username || !firstname || !lastname || !email || !country) {
			return responseHandler.badRequest(res, "Missing required field")
		}

		let user = await User.findByPk(userId)

		if (!user) return responseHandler.notFound(res, "invalid user id")

		user.username = username.toLowerCase()
		user.firstname = firstname.toLowerCase()
		user.lastname = lastname.toLowerCase()
		user.email = email.toLowerCase()
		user.country = country.toLowerCase()

		user = await user.save()

		return responseHandler.success(res, user.toJSON());
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}


export default { getUsers, removeUser, updateUser, getUser }
