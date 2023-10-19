import express from 'express'
import statusRouter from './status.route.js'
import userRouter from './user.route.js'

const router = express.Router()

router.use(statusRouter);
router.use(userRouter);

export default router;
