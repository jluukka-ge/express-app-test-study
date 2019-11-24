/*
 * Define a client for the Todo app, parameterized over an object which does HTTP calls
 */
const defineClient = request => {
  const normalizeHost = host => host.endsWith('/') ? host : `${host}/`;
  const getAuthorizationHeader = token => token ? { Authorization: `Bearer: ${token}` } : {};

  // Get convenience functions for defining HTTP calls
  const getRequestMethods = host => ({
    get: (path, token) => request.get(`${host}${path}`, { headers: getAuthorizationHeader(token) }),
    post: (path, body, token) => request.post(`${host}${path}`, body, { headers: getAuthorizationHeader(token) }),
    put: (path, body, token) => request.put(`${host}${path}`, body, { headers: getAuthorizationHeader(token) }),
    del: (path, token) => request.delete(`${host}${path}`, { headers: getAuthorizationHeader(token) }),
  });

  // Produce a concrete Todo app client, served from `host`
  const getClient = host => {
    const _host = normalizeHost(host);
    const { get, post, put, del } = getRequestMethods(_host);
    return {
      createTodo: (token, data) => post('todos', data, token),
      getTodos: token => get('todos', token),
      getTodoById: (token, id) => get(`todos/${id}`, token),
      updateTodoById: (token, id, data) => put(`todos/${id}`, data, token),
      deleteTodoById: (token, id) => del(`todos/${id}`, token),

      getUsers: token => get('users', token),

      login: (username, password) => post('login', { username, password })
    };
  };

  return {
    getClient,
  };
};
module.exports = {
  defineClient,
};
