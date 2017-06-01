import express from 'express';

import adminRouter from './admin-router';
import apiRouter from './api-router';
import authRouter from './auth-router';

const router = express.Router();

router.get('*', (req, res) => {
  res.render('app', { layout: false });
});

export default function (app) {

  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
  app.use('/', router);

};