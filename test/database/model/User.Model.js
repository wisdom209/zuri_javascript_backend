import sequelize from "../config.js";
import User from "../../../src/database/model/User.model.js";

const UserMock = sequelize.define('Post', User.rawAttributes, { timestamps: false })

export default UserMock
