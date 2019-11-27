const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const { getRoutes, getMiddleware } = require('./routes');
const { registerApi } = require('./api');
const getPromiseRouter = require('express-promise-router');

const getApp = getStorage => {
  // Get concrete routes and middleware
  const routes = getRoutes(getStorage);
  const middleware = getMiddleware(getStorage);

  // Register API
  const router = registerApi({
    router: getPromiseRouter(),
    routes,
    middleware,
  });

  // Setup Express app
  const app = express()
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(router)
    .use(routes.finalRoute)
    .set('json spaces', 2);

  return app;
};

module.exports = {
  getApp,
};
