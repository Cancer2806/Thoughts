// File to define the Thoughts model

// Import mongoose and sub-document
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // TODO getter to format timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
  // TODO create a virtual called reactionCount that retrieves the length of the thought's reactions array
);

// Define collection
const Thought = model('thought', thoughtsSchema);
 
module.exports = Thought; 