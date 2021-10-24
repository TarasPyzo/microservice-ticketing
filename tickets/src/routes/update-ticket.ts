import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { TicketModel } from '../models/ticket';
import { requireAuth, validateRequest, NotFoundError, NotAuthError } from '@tyro.asap.company/microservice-ticketing-lib';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and greate than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await TicketModel.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!._id) {
      throw new NotAuthError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.send({ ticket });
  },
);


export { router as updateTicketRouter };
