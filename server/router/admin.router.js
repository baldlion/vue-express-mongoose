import express from 'express'

import Admin from '../controllers/admin.controller'
import Auth from '../controllers/auth.controller'

export default function (io) {
  const router = express.Router()
  const authRouter = express.Router()
  const apiRouter = express.Router()

  router.use((req, res, next) => {
    req.io = io
    next()
  })

  authRouter.get('/', Auth.isNotLoggedIn, Auth.index)
  authRouter.get('/logout', Auth.logout)
  authRouter.post('/authenticate', Auth.authenticate)

  apiRouter.get('/newPost', Admin.authenticate, Admin.newPost)
  apiRouter.get('/getPostById/:id', Admin.authenticate, Admin.getPostById)

  router.use('/auth', authRouter)
  router.use('/api', apiRouter)

  router.post('/uploadImage', Admin.authenticate, Admin.upload)
  router.get('*', Admin.authenticate, Admin.index)

  return router
}
