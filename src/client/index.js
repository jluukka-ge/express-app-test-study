const request = require('axios');
const { defineClient } = require('./client');

// Mapping of simple API call functions to concrete implementations
const requestMethods = {
  get: ({ path, headers }) => request.get(path, { headers }),
  post: ({ path, data, headers }) => request.post(path, data, { headers }),
  put: ({ path, data, headers }) => request.put(path, data, { headers }),
  delete: ({ path, headers }) => request.delete(path, { headers }),
};

// Define a client that uses `axios` for HTTP calls
const getClient = defineClient(requestMethods);

module.exports = {
  getClient,
};
