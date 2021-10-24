import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { TicketModel } from '../models/ticket';
import { requireAuth, validateRequest } from '@tyro.asap.company/microservice-ticketing-lib';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greate than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = new TicketModel({ title, price, userId: req.currentUser!._id });
    await ticket.save();

    res.send(201).send({ ticket });
  },
);


export { router as createTicketRouter };
