// File to define the User Model

// Import Mongoose
const { Schema, model } = require('mongoose');

// Schema for User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //TODO need to validate as an email
    },

// links to thoughts via id
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },],
// self-links to users via id
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    },],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
    // TODO create a virtual called friendCount that retrieves the lenght of the user's friends array
); 

// Create the collection
const User = model('user', userSchema);

module.exports = User;