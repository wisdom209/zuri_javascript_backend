import sequelize from "../config.js";
import { DataTypes } from "sequelize";
import User from "./User.model.js";

const validateNotEmpty = {
	notEmpty: {
		msg: "Entry cannot be empty"
	}
}
const Post = sequelize.define("Posts", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: validateNotEmpty
	},
	body: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: validateNotEmpty
	}
}, { timestamps: false })
export default Post;
