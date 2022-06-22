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
      // need to validate as an email
    },


    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },],

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
); 

const User = model('user', userSchema);

module.exports = User;



