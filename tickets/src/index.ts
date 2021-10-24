import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

import { app } from './app';

const env = load({
  MONGODB_URI: String,
  JWT_SECRET: String,
});

const runDB = async () => {
  try {
    if (!env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to ticketing-tickets MongoDB');
  } catch (err) {
    console.log(err);
  }
}
runDB();
app.listen(3001, () => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }
  console.log('[Auth Service] Listening on port 3001');
});
