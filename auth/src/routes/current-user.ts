import express from 'express';

import { currentUser, requireAuth } from '@tyro.asap.company/microservice-ticketing-lib';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || {} });
});

export { router as currentUserRouter };
