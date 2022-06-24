// controller file for thought model
const User = require("../models/Thought");


// GET  api/thoughts
const getThoughts = (req, res) => {
  res.send('Test message get Thoughts')
};


// POST  api/thoughts
const createThought = (req, res) => {
  res.send('Test message create Thought')
};

// PUT  api/thoughts/:id
const updateThought = (req, res) => {
  res.send(`Test message update Thought ${req.params.id}`)
};

// DELETE  api/thoughts/:id
const deleteThought = (req, res) => {
  res.send(`Test message delete Thought ${req.params.id}`)
};



module.exports = {
  getThoughts,
  updateThought,
  createThought,
  deleteThought,
};

