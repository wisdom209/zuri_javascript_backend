import * as responseHandler from '../utils/responseHandler.js'
import { Op } from 'sequelize';
import Post from '../database/model/Post.model.js';
import User from '../database/model/User.model.js';

const search = async (req, res) => {
	try {
		const { query } = req.query;

		if (!query) return responseHandler.badRequest(res, "Search parameter is required")

		const results = await User.findAll({
			where: {
				[Op.or]: [
					{ username: { [Op.like]: `%${query}%` } },
					{ firstname: { [Op.like]: `%${query}%` } },
					{ lastname: { [Op.like]: `%${query}%` } },
					{ email: { [Op.like]: `%${query}%` } },
					{ country: { [Op.like]: `%${query}%` } }
				]
			},
			include: { model: Post },
			limit: 10
		});

		return responseHandler.success(res, results);
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

export default { search }
