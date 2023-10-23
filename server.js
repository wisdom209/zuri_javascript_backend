import makeApp from "./app.js";
import dotenv from 'dotenv'
import sequelize from "./src/database/config.js";
import { Post, User } from './src/database/model/index.model.js'
dotenv.config()

const app = await makeApp(sequelize)
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Server is listening on port", port)
})
export default app;
