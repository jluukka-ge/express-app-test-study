require('dotenv').config();

const Knex = require('knex');
const { Model } = require('objection');
const { getModels } = require('./models');
const { defineStorage } = require('./dataStorage');
const { defineApp } = require('./app');

// Initialize knex the SQL query builder.
const knexConfig = require('../../knexfile');
const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

// Get data models subclassed from this objection Model
const models = getModels(Model);

// Produce persistent storage interface
const getStorage = defineStorage(models);

// Get a concrete app bound to storage implementation
const app = defineApp(getStorage);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Todo app listening at port %s', port);
});
