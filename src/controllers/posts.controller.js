import * as responseHandler from "../utils/responseHandler.js"
import Post from "../database/model/Post.model.js"
import User from "../database/model/User.model.js";

const getPosts = async (req, res) => {
	try {
		let { page } = req.query

		page = Number(page);

		const posts = await Post.findAll({
			limit: 25,
			offset: isNaN(page) || page <= 1 ? 0 : (page - 1) * 25
		})

		return responseHandler.success(res, { page: isNaN(page) || page <= 1 ? 1 : page, posts });
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const getPost = async (req, res) => {
	try {
		const { postId } = req.params;

		const post = await Post.findByPk(postId);

		if (!post) return responseHandler.notFound(res, "Post not found")

		return responseHandler.success(res, post);
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;

		const userPosts = await User.findOne({ where: { id: userId }, include: [Post] })

		if (!userPosts) return responseHandler.notFound(res, "No posts found for this user");

		return responseHandler.success(res, userPosts.Posts)
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const createPost = async (req, res) => {
	try {
		const { title, body, userId } = req.body;

		const user = await User.findByPk(userId);

		if (!user) return responseHandler.notFound(res, "User not found");

		const post = await Post.create({ title, body });

		await user.addPost(post);

		return responseHandler.created(res, post.toJSON())
	} catch (error) {
		return responseHandler.serverError(res, error.message);
	}
}

const updatePost = async (req, res) => {
	try {
		const { title, body, postId } = req.body;

		let post = await Post.findByPk(postId);

		if (!post) return responseHandler.badRequest(res, "Post not found");

		post.title = title;
		post.body = body;

		post = await post.save()

		return responseHandler.success(res, post.toJSON())
	} catch (error) {
		return responseHandler.serverError(res, error.message);
	}
}


const deletePost = async (req, res) => {
	try {
		const { postId } = req.params;

		const post = await Post.findByPk(postId)

		if (!post) return responseHandler.notFound(res, "Post not found");

		await post.destroy()

		return responseHandler.success(res, "Post deleted successfully")
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

export default { createPost, getPost, getPosts, getUserPosts, updatePost, deletePost }
