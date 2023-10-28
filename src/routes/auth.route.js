import express from 'express'
import authController from '../controllers/auth.controller.js'
import validator from '../middlewares/validator.middleware.js'

const router = express.Router()


/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Create a user
 *     description: Create a user in the database
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: James123
 *               firstname:
 *                 type: string
 *                 example: James
 *               lastname:
 *                 type: string
 *                 example: Bond
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jamesbond@xyz.com
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', validator.signUpValidator, authController.signUp)

/**
 * @swagger
 * /api/v1/signin:
 *   post:
 *     summary: Sign in a user
 *     description: Sign in a user in the database
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: james123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/signin', validator.signInValidator, authController.signIn)

/**
 * @swagger
 * /api/v1/signout:
 *   get:
 *     summary: Sign out a user
 *     description: sign out a user in the database
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/signout', authController.signOut)

export default router
