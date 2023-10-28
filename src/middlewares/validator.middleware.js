import { body, validationResult } from "express-validator"
import * as responseHandler from "../utils/responseHandler.js"

const signUpValidator = async (req, res, next) => {
	try {
		await Promise.all(
			[
				body('username').isLength({ min: 3 }).withMessage("Username must have a minimum of 3 letters").run(req),
				body('firstname').isLength({ min: 2 }).withMessage("firstname must have a minimum of 2 letters").run(req),
				body('lastname').isLength({ min: 2 }).withMessage("lastname must have a minimum of 2 letters").run(req),
				body('country').isLength({ min: 3 }).withMessage("country must have a minimum of 3 letters").run(req),
				body('password').isLength({ min: 6 }).withMessage("password must have a minimum of 6 characters").run(req),
				body('email').isEmail().withMessage("Entry must be a valid email").run(req),
			]
		)

		const { errors } = validationResult(req)

		if (errors.length < 1) next()
		else {
			return responseHandler.badRequest(res, errors.map(v => v.msg))
		}

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const signInValidator = async (req, res, next) => {
	try {
		await Promise.all(
			[
				body('username').isLength({ min: 3 }).withMessage("Username must have a minimum of 3 letters").run(req),
				body('password').isLength({ min: 6 }).withMessage("password must have a minimum of 6 characters").run(req),
			]
		)

		const { errors } = validationResult(req)

		if (errors.length < 1) {
			next()
		} else {
			return responseHandler.badRequest(res, errors.map(v => v.msg))
		}

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const createPostValidator = async (req, res, next) => {
	try {
		await Promise.all([
			body('body').isLength({ min: 1 }).withMessage("Body must have a minimum of one character").run(req),
			body('title').isLength({ min: 1 }).withMessage("title must have a minimum of one character").run(req),
		])

		const { errors } = validationResult(req)

		if (errors.length < 1) next()
		else {
			return responseHandler.badRequest(res, errors.map(v => v.msg))
		}
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const updatePostValidator = async (req, res, next) => {
	try {
		await Promise.all([
			body('body').isLength({ min: 1 }).withMessage("Body must have a minimum of one character").run(req),
			body('title').isLength({ min: 1 }).withMessage("title must have a minimum of one character").run(req),
			body('postId').isNumeric().withMessage("PostId must be a number").run(req),
		])

		const { errors } = validationResult(req)

		if (errors.length < 1) next()
		else {
			return responseHandler.badRequest(res, errors.map(v => v.msg))
		}
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

export default { signUpValidator, signInValidator, createPostValidator, updatePostValidator }

