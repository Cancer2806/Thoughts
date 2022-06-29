// File to define the User Model

// Import Mongoose
const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/validators.js')


// Schema for User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      //validate the email
      validate: [validateEmail, "Please provide a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email invalid",
      ],
    },

// links to thoughts via id
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
// self-links to users via id
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
  ); 
  
  //create a virtual called friendCount that retrieves the length of the user's friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the collection
const User = model('user', userSchema);

module.exports = User;