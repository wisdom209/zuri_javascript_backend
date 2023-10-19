import User from '../database/model/User.model.js';
import * as responseHandler from '../utils/responseHandler.js'

const getUsers = async (req, res) => {
	try {
		let { page } = req.query

		page = Number(page);

		if (isNaN(page) || page <= 1)
			page = 0
		else
			page = (page - 1) * 25

		const users = await User.findAll({
			limit: 25,
			offset: page
		})

		return responseHandler.success(res, { page: page + 1, users });
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}

}

export default { getUsers }
