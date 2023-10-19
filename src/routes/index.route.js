import express from 'express'
import statusRouter from './status.route.js'

const router = express.Router()

router.use(statusRouter);

export default router;
