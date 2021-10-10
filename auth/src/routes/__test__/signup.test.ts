import request from 'supertest';

import { app } from '../../app';
import { signupHelper } from '../../test/signupHelper';

it('returns a 201 on succesfull signup', async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await signupHelper(email, password);

  expect(response.status).toEqual(201);

  // await signupHelper(email, password).expect(201);
});

it('returns a 400 with an invalid email', async () => {
  const email = 'test';
  const password = 'password';
  const response = await signupHelper(email, password);

  expect(response.status).toEqual(400);
});

it('returns a 400 with an invalid password', async () => {
  const email = 'test';
  const password = 'p';
  const response = await signupHelper(email, password);

  expect(response.status).toEqual(400);
});

it('returns a 400 with missing email and password', () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('disallows signup with the same email', async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response1 = await signupHelper(email, password);
  expect(response1.status).toEqual(201);

  const response2 = await signupHelper(email, password);
  expect(response2.status).toEqual(400);
});

it('sets a cookie after successfull signup', async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await signupHelper(email, password);

  expect(response.status).toEqual(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
