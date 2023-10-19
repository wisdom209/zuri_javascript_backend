import * as responseHandler from '../utils/responseHandler.js'

export const getStatus = (req, res) => {
	try {
		return responseHandler.success(res, "Server is online")
	} catch (error) {
		return responseHandler.serverError(res, error)
	}
}
