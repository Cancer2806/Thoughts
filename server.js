// import Express, define database connection and routing
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cwd = process.cwd();

// Define ports
const PORT = process.env.port || 3001;
const app = express();

// Define activity to show which application is running in terminal
const activity = cwd.includes('01-Activities')
  ? cwd.split('01-Activities/')[1]
  : cwd;

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// start Server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}`);
  });
});