import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tyro.asap.company/microservice-ticketing-lib';

import { createTicketRouter } from './routes/new-ticket';
import { getTicketRouter } from './routes/get-ticket';
import { getTicketsRouter } from './routes/get-tickets';
import { updateTicketRouter } from './routes/update-ticket';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false }));
app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
