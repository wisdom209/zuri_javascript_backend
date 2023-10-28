import * as responseHandler from "../utils/responseHandler.js"
import jwt from 'jsonwebtoken'

const authenticate = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) return responseHandler.unauthorized(res, "Invalid credentials")

		const user = jwt.verify(token, 'secret_key')

		if (!user) return responseHandler.unauthorized(res, "Invalid credentials")

		req.userObject = user;

		next()
	} catch (error) {
		return responseHandler.serverError(res, next);
	}
}

export default authenticate
