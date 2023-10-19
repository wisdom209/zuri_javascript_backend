import express from 'express'
import * as statusController from '../controllers/status.controller.js'
const router = express.Router()


/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get server status
 *     description: Returns success if server is up and running
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/status', statusController.getStatus);

export default router


