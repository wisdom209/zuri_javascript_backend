import express from 'express'
import searchController from '../controllers/search.controller.js';

const router = express.Router()

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for an item
 *     description: Search for an item based on given query param
 *     tags: [Search]
 *     parameters:
 *       - name: query
 *         in: query
 *         description: item to search. You can search by username, email, firstname, lastname or country. Posts related to user are attached to the response.
 *         required: true
 *         schema:
 *           type: string
 *         example: china
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal sever error
 */
router.get('/search', searchController.search);

export default router;
