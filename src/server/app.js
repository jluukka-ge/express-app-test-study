require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const Knex = require('knex');
const morgan = require('morgan');
const { getRoutes, getMiddleware } = require('./routes');
const { registerApi } = require('./api');
const { Model } = require('objection');
const { getModels } = require('./models');
const { getStorage } = require('./dataStorage');
const getPromiseRouter = require('express-promise-router');

// Initialize knex the SQL query builder.
const knexConfig = require('../../knexfile');
const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

// Get data models subclassed from this objection Model
const models = getModels(Model);
const storage = getStorage(models);

// Register our REST API.
const routes = getRoutes(storage);
const middleware = getMiddleware(storage);
const router = registerApi({
  router: getPromiseRouter(),
  routes,
  middleware,
});

const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(router)
  .use(routes.finalRoute)
  .set('json spaces', 2);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Todo app listening at port %s', port);
});

module.exports = {
  knex,
};
