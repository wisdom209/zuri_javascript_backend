import express from 'express'
import usersController from '../controllers/users.controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/getUsers:
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
router.get('/getUsers', usersController.getUsers);

export default router
