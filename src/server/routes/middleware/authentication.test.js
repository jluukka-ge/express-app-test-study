const request = require('supertest');
const express = require('express');

const { getMiddleware } = require('./authentication');
const { issueToken } = require('../../accounts/jwt');

const getUserByUsername = username => username === 'pentti' ? { id: 1, username: 'pentti' } : null;
const getStorage = () => ({ getUserByUsername });
const authMiddleware = getMiddleware(getStorage);

const app = express()
  .get('/test', authMiddleware, (req, res) => {
    res.send('');
  });

describe('Authentication middleware', () => {
  it('responds with unauthorized error for requests with no auth token', () => {
    return request(app)
      .get('/test')
      .expect(401);
  });

  it('responds with OK error for requests with valid auth token', () => {
    const token = issueToken({ username: 'pentti' });
    return request(app)
      .get('/test')
      .set('Authorization', `Bearer: ${token}`)
      .expect(200);
  });
});
