import request from 'supertest';

import { app } from '../../app';
import { signupHelper } from '../../test/signupHelper';

it('responds with details about the current user', async () => {
  const email = 'test@test.com';
  const password = 'password';
  const signupResponse = await signupHelper(email, password);
  expect(signupResponse.status).toEqual(201);

  const currentUserResponse = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', signupResponse.get('Set-Cookie'))
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual(email);
});
