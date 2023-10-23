import { DataTypes } from "sequelize";
import sequelize from "../config.js";

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

