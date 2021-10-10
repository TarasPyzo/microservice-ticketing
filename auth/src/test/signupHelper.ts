import request from 'supertest';
import { app } from '../app';

export const signupHelper = async (email: String, password: String) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })

  return response;
};

/* export const signupHelper = (email: String, password: String) => {
  return request(app)
    .post('/api/users/signup')
    .send({ email, password })
}; */
