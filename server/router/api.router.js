import express from 'express'

import Posts from '../controllers/posts.controller'

const router = express.Router()

router.get('/posts', Posts.index)
router.get('/posts/:postId', Posts.getById)
router.post('/posts/:postId', Posts.update)
router.post('/posts', Posts.add)

export default router
