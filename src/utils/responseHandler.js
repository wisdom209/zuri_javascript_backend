export const success = (res, data) => {
	const status = 200;
	return res.status(status).json({
		status: status,
		message: "Success",
		data
	})
}

export const created = (res, data) => {
	const status = 201;
	return res.status(status).json({
		status: status,
		message: "Resource created",
		data
	})
}

export const badRequest = (res, data) => {
	const status = 400;
	return res.status(status).json({
		status: status,
		error: "Bad Request",
		data
	})
}

export const notFound = (res, data) => {
	const status = 404;
	return res.status(status).json({
		status: status,
		message: "Not found",
		data
	})
}

export const serverError = (res, data) => {
	const status = 500;
	return res.status(status).json({
		status: status,
		message: "Internal server error",
		data
	})
}




