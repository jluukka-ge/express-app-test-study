require('dotenv').config();

const { getStorageFactory } = require('./dataStorage');
const { getApp } = require('./app');

// Produce persistent storage interface
const getStorage = getStorageFactory();

// Get a concrete app bound to storage implementation
const app = getApp(getStorage);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Todo app listening at port %s', port);
});
