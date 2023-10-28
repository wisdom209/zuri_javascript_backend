import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Auth from '../database/model/Auth.model.js'
import User from '../database/model/User.model.js'
import * as responseHandler from '../utils/responseHandler.js'

const signUp = async (req, res) => {
	try {
		const { username, firstname, lastname, email, country, password } = req.body;

		if (!username || !firstname || !lastname || !email || !country || !password) {
			return responseHandler.badRequest(res, "Missing required field")
		}

		const hashedPassword = bcrypt.hashSync(password);

		const user = await User.create({
			username: username.toLowerCase(), firstname: firstname.toLowerCase(),

			lastname: lastname.toLowerCase(), email: email.toLowerCase(), country: country.toLowerCase()
		});

		const auth = await Auth.create({
			password: hashedPassword
		})

		await user.setAuth(auth);

		return responseHandler.created(res, { ...user.toJSON(), Auth: "" });
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}


const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) return responseHandler.badRequest(res, "Missing required fields")

		const user = await User.findOne({ where: { username: username.toLowerCase() }, include: { model: Auth } })

		if (!user) return responseHandler.notFound(res, "Username does not exist")

		const isUser = bcrypt.compareSync(password, user.Auth.password)

		if (!isUser) return responseHandler.unauthorized(res, "Invalid credentials")

		const token = jwt.sign({ user }, "secret_key")

		res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 }) // 2 days in milliseconds

		return responseHandler.success(res, { ...user.toJSON(), Auth: "" })

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const signOut = async (req, res) => {
	try {
		res.cookie('token', "")
		return responseHandler.success(res, "Logged out successfully")
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

export default { signIn, signUp, signOut }
