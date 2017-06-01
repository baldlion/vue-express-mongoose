import express from 'express';

import posts from '../controllers/posts';

const apiRouter = express.Router();

apiRouter.get('/posts', posts.index);
apiRouter.post('/posts', posts.add);

export default apiRouter;