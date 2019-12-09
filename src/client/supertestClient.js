const mockRequest = require('supertest');
const { defineClient } = require('./client');

const get = request => ({ path, headers = {} }) => {
  const req = Object.entries(headers).reduce(
    (req, [key, value]) => req.set(key, value),
    request.get(path)
  );
  return req;
};

const post = request => ({ path, data, headers = {} }) => {
  const req = Object.entries(headers).reduce(
    (req, [key, value]) => req.set(key, value),
    request.post(path)
  );
  return req.send(data);
};

const put = request => ({ path, data, headers = {} }) => {
  const req = Object.entries(headers).reduce(
    (req, [key, value]) => req.set(key, value),
    request.put(path)
  );
  return req.send(data);
};

const del = request => ({ path, data, headers = {} }) => {
  const req = Object.entries(headers).reduce(
    (req, [key, value]) => req.set(key, value),
    request.delete(path)
  );
  return req;
};

// Mapping of simple API call functions to concrete implementations
const getRequestMethods = request => ({
  get: get(request),
  post: post(request),
  put: put(request),
  delete: del(request),
});

// Define a client that uses `supertest` for HTTP calls
const getClient = app => {
  const request = mockRequest(app);
  const requestMethods = getRequestMethods(request);
  return defineClient(requestMethods)('/');
};

module.exports = {
  getClient,
};
