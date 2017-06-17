import express from 'express'

import adminRouter from './admin.router'
import apiRouter from './api.router'

const router = express.Router()

router.get('*', (req, res) => {
  res.render('app', { layout: false })
})

export default function (app, io) {
  app.use('/admin', adminRouter(io))
  app.use('/api', apiRouter)
  app.use('/', router)
};
