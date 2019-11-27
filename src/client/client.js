/*
 * Define a client for the Todo app, parameterized over an object which does HTTP calls
 */
const defineClient = requestMethods => {
  const normalizeHost = host => host.endsWith('/') ? host : `${host}/`;
  const getAuthHeader = token => token ? { Authorization: `Bearer: ${token}` } : {};

  const getPathWithHost = host => {
    const _host = normalizeHost(host);
    return path => `${_host}${path}`;
  };

  // Produce a concrete Todo app client, served from `host`
  const getClient = host => {
    const getFullPath = getPathWithHost(host);
    const {
      get: _get,
      post: _post,
      put: _put,
      delete: _delete
    } = requestMethods;
    return {
      createTodo: (token, data) => _post({
        path: getFullPath('todos'),
        data,
        headers: getAuthHeader(token),
      }),
      getTodos: token => _get({
        path: getFullPath('todos'),
        headers: getAuthHeader(token),
      }),
      getTodoById: (token, id) => _get({
        path: getFullPath(`todos/${id}`),
        headers: getAuthHeader(token),
      }),
      updateTodoById: (token, id, data) => _put({
        path: getFullPath(`todos/${id}`),
        data,
        headers: getAuthHeader(token),
      }),
      deleteTodoById: (token, id) => _delete({
        path: getFullPath(`todos/${id}`),
        headers: getAuthHeader(token),
      }),

      getUsers: token => _get({
        path: getFullPath('users'),
        headers: getAuthHeader(token),
      }),

      login: (username, password) => _post({
        path: getFullPath('login'),
        data: { username, password }
      }),
    };
  };

  return getClient;
};
module.exports = {
  defineClient,
};
