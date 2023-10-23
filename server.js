import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './src/database/config.js'
import models from './src/database/model/index.model.js'
import morgan from 'morgan'
import swaggerSpec from './swagger.js';
import { serve, setup } from 'swagger-ui-express';

import router from './src/routes/index.route.js';

dotenv.config()
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use('/api-docs', serve, setup(swaggerSpec, { customCssUrl: CSS_URL }))
app.use('/api', router)

const PORT = process.env.PORT || 4000

sequelize.authenticate().then(async () => {
	console.log("Connected to the db")
	app.listen(PORT, () => {
		console.log("Server is listening on port", PORT);
	})
})

export default app
