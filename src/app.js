require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const Knex = require('knex');
const morgan = require('morgan');
const { registerApi } = require('./api');
const { Model } = require('objection');
const { HttpError } = require('./Errors');

// Initialize knex the SQL query builder.
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

// Unfortunately the express-promise-router types are borked. Just require():
const router = require('express-promise-router')();
const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(router)
  .set('json spaces', 2);

// Register our REST API.
registerApi(router);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).send({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred!',
      });
    }
  } else {
    next();
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Todo app listening at port %s', port);
});

module.exports = {
  knex,
};
