import express from 'express'
import postsController from '../controllers/posts.controller.js';

const router = express.Router()

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts, 25 per page
 *     description: Gets all posts
 *     tags: [Posts]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page number to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.get('/posts', postsController.getPosts)

/**
 * @swagger
 * /api/post/user/{userId}:
 *   get:
 *     summary: Get all user's posts
 *     description: Gets all user's posts
 *     tags: [Posts]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: user's id in db
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.get('/post/user/:userId', postsController.getUserPosts)

/**
 * @swagger
 * /api/post/{postId}:
 *   get:
 *     summary: Get a Post
 *     description: Gets a post by Id
 *     tags: [Posts]
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: post's id in db
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.get('/post/:postId', postsController.getPost)

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: create a post
 *     description: create a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Hello
 *               body:
 *                 type: string
 *                 example: lorem ipsum dolor sit amet
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.post('/post', postsController.createPost)

/**
 * @swagger
 * /api/post:
 *   put:
 *     summary: update a post
 *     description: update a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Hello
 *               body:
 *                 type: string
 *                 example: lorem ipsum dolor sit amet
 *               postId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.put('/post', postsController.updatePost);

/**
 * @swagger
 * /api/post/{postId}:
 *   delete:
 *     summary: delete a post
 *     description: Removes a post in the database
 *     tags: [Posts]
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: id of post to remove
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         example: 1
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.delete('/post/:postId', postsController.deletePost)

export default router;
