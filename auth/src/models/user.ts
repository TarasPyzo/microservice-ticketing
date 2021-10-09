import mongoose from 'mongoose';

import { Password } from '../services/password';

interface User {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  },
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
    done();
  }
});

const UserModel = mongoose.model<User>('User', userSchema);

export { UserModel };
