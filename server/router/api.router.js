import express from 'express'

import Posts from '../controllers/posts.controller'

const router = express.Router()

router.get('/posts', Posts.index)

export default router
