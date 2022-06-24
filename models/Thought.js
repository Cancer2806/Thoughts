// File to define the Thoughts model

// Import mongoose and sub-document
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { formatDate } = require('../utils/helpers');


const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    
      //getter to format timestamp on query
      get: (createdAt) => formatDate(createdAt),
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
  );
  
//create a virtual called reactionCount that retrieves the length of the thought's reactions array
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Define collection
const Thought = model('thought', thoughtsSchema);
 
module.exports = Thought; 