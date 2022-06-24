// import Express, define database connection and routing
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Define ports
const PORT = process.env.port || 3001;
const app = express();

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// start Server
db.once('open', () => {
  app.listen(PORT, () => {console.log(`API server running on port ${PORT}`);});
});