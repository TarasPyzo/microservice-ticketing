import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { load } from 'ts-dotenv';

import { Password } from '../services/password';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';
import { UserModel } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must not be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const userJwt = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      load({ JWT_SECRET: String }).JWT_SECRET,
    );
    req.session = { jwt: userJwt };

    res.status(200).send({ user: existingUser });
  }
);

export { router as signinRouter };
