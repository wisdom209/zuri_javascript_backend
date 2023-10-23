import sequelize from "../config.js";
import Post from "../../../src/database/model/Post.model.js";

const PostMock = sequelize.define("Post", Post.rawAttributes, { timestamps: false })

export default PostMock
