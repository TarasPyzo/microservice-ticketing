import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { load } from 'ts-dotenv';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { UserModel } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const newUser = new UserModel({ email, password });
    await newUser.save();

    const userJwt = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      load({ JWT_SECRET: String }).JWT_SECRET,
    );
    req.session = { jwt: userJwt };

    res.status(201).send({ user: newUser });
  }
);

export { router as signupRouter };
