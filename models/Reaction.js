// File to define the reaction sub-document (of Thoughts)

// Import Mongoose and date format function
const { Schema, Types } = require('mongoose');
const { formatDate } = require('../utils/dates');


// Define model Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      
      //getter to format timestamp on query
      get: (createdAt) => formatDate(createdAt),
    },
  },
  {
    toJSON: {
      getters: true,
  },
    id: false,
  }
);

module.exports = reactionSchema;