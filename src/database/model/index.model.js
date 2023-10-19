import Post from "./Post.model.js";
import User from "./User.model.js";

User.hasMany(Post)
Post.hasOne(User);
export default {
	Post,
	User
}
