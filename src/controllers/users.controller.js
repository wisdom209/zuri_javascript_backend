import User from '../database/model/User.model.js';
import * as responseHandler from '../utils/responseHandler.js'

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

export default { getUsers }
