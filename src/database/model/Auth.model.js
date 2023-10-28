import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Auth = sequelize.define("Auth", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false })

export default Auth
