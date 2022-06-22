// File to define the reaction sub-document (of Thoughts)

// Import Mongoose
const { Schema, Types } = require('mongoose');

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
      //TODO create getter to format timestamp on query
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