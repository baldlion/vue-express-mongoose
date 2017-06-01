import express from 'express';

import auth from '../controllers/auth';

const authRouter = express.Router();

authRouter.get('/', auth.checkAuthorization, auth.index);
authRouter.get('/logout', auth.logout);
authRouter.post('/authenticate', auth.authenticate);

export default authRouter;