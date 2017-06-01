import express from 'express';

import admin from '../controllers/admin';

const adminRouter = express.Router();

adminRouter.get('*', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/auth')
  } else {
    next();
  }
}, admin.index);

export default adminRouter;