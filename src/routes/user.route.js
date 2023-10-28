import express from 'express';
import usersController from '../controllers/users.controller.js';

const router = express.Router()

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all Users
 *     description: Returns a list of all users in the database
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page to retrieve. Retrieves 25 per page.
 *         required: false
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
router.get('/users', usersController.getUsers);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Get a user
 *     description: Returns a list of all users in the database
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: id of user to retrieve
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
router.get('/user/:userId', usersController.getUser)

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update a user
 *     description: Update a user in the database
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Ben22
 *               firstname:
 *                 type: string
 *                 example: Ben
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ben22@xyz.com
 *               country:
 *                 type: string
 *                 example: Nigeria
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal Server Error
 */
router.put('/user/:userId', usersController.updateUser)

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Remove a user
 *     description: Removes a user in the database
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: id of user to retrieve
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
router.delete('/user/:userId', usersController.removeUser)

export default router
