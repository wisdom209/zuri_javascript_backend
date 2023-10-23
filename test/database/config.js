import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: './dblite',
	logging: true
})

export default sequelize;
