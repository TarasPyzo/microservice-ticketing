import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

import { app } from './app';

const runDB = async () => {
  try {
    const MONGODB_URI = load({ MONGODB_URI: String }).MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }
    await mongoose.connect(MONGODB_URI);
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
