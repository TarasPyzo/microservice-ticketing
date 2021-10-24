import express, { Request, Response } from 'express';

import { TicketModel } from '../models/ticket';
import { NotFoundError } from '@tyro.asap.company/microservice-ticketing-lib';

const router = express.Router();

router.get(
  '/api/tickets/:id',
  async (req: Request, res: Response) => {
    const ticket = await TicketModel.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    res.send(200).send({ ticket });
  },
);


export { router as getTicketRouter };
