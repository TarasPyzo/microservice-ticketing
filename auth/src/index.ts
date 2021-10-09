import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

import { app } from './app';

const runDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ticketing-auth');
    console.log('Connected to ticketing-auth MongoDB');
  } catch (err) {
    console.log(err);
  }
}
runDB();
app.listen(3000, () => {
  if (!load({ JWT_SECRET: String }).JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }
  console.log('[Auth Service] Listening on port 3000');
});
