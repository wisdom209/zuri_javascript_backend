import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const validateNotEmpty = {
	notEmpty: {
		msg: "Entry cannot be empty"
	}
}

const User = sequelize.define("Users", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			len: {
				args: [5],
				msg: "Entry must be atleast 5 characters long"
			}
		}
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: validateNotEmpty
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: validateNotEmpty
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: {
				msg: "Entry must be an email address"
			}
		}
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: validateNotEmpty
	},
}, { timestamps: false })

export default User;
