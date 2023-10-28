import Post from "./Post.model.js";
import User from "./User.model.js";
import Auth from "./Auth.model.js";

User.hasMany(Post)
User.hasOne(Auth)

export default {
	Post,
	User
}
