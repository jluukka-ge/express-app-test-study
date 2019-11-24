const request = require('axios');
const { defineClient } = require('./client');

// Define a client that uses `axios` for HTTP calls
const getClient = defineClient(request);

module.exports = {
  getClient,
};
