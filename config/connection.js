
// Import Mongoose as ODM
const { connect, connection } = require('mongoose');

// Set connection parameters
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.01:27017/thoughtsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
