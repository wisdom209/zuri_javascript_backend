import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan'
import swaggerSpec from './swagger.js';
import cookieParser from 'cookie-parser'
import models from './src/database/model/index.model.js'
import { serve, setup } from 'swagger-ui-express';

import router from './src/routes/index.route.js';

dotenv.config()

export default async function (database) {
	const app = express()

	app.use(cookieParser())
	app.use(cors())
	app.use(morgan('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

	app.use('/api-docs', serve, setup(swaggerSpec, { customCssUrl: CSS_URL }))
	app.use('/api/v1', router)

	await database.authenticate()

	await database.sync({ force: false })

	return app;
}
