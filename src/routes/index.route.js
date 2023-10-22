import express from 'express'
import statusRouter from './status.route.js'
import userRouter from './user.route.js'
import postRouter from './post.route.js'
import searchRouter from './search.route.js'

const router = express.Router()

router.use(statusRouter);
router.use(userRouter);
router.use(postRouter)
router.use(searchRouter)

export default router;
