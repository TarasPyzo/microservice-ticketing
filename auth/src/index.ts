import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/no-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const runDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ticketing-auth');
    console.log('Connected to ticketing-auth MongoDB');
  } catch (err) {
    console.log(err);
  }
}
runDB();
app.listen(3000, () => console.log('[Auth Service] Listening on port 3000'));
