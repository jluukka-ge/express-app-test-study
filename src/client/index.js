const request = require('axios');

const normalizeHost = host => host.endsWith('/') ? host : `${host}/`;

const getAuthorizationHeader = token => token ? { Authorization: `Bearer: ${token}` } : {};

const getClient = host => {
  const _host = normalizeHost(host);
  return {
    getTodoById: (token, id) => request.get(
      `${_host}todos/${id}`,
      { headers: getAuthorizationHeader(token) },
    ),
    getTodos: token => request.get(
      `${_host}todos`,
      { headers: getAuthorizationHeader(token) },
    ),
    getUsers: token => request.get(
      `${_host}users`,
      { headers: getAuthorizationHeader(token) },
    ),
    login: (username, password) => request.post(
      `${_host}login`,
      { username, password },
    ),
  };
};

module.exports = {
  getClient,
};
