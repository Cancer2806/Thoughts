// Database connection file.  Provides environment variable for future deployment

// Import Mongoose as ODM
const { connect, connection } = require('mongoose');

// Set connection parameters
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
