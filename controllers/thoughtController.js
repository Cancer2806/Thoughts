// controller file for thought model
const { Thought, User } = require("../models");


// Get All Thoughts
// GET api/thoughts
const getThoughts = (req, res) => {
  Thought.find()
    .then((thoughts) => { res.json(thoughts) })
    .catch((err) => { console.error(err); res.status(500).json(err) });
};


// Create a thought
// POST  api/thoughts
const createThought = (req, res) => {
  Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((thoughtData) =>
      !thoughtData ? res.status(404).json({ message: 'Thought created, but user not found' })
        : res.json('Thought saved')
    )
    .catch((err) => { console.error(err); res.status(500).json(err) })
};


// Get single thought
// GET  api/thoughts/:thoughtid
const getSingleThought = (req, res) => {
  Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thoughtData) => {
      !thoughtData ? res.status(404).json({ message: 'Those thoughts do not exist' })
      : res.json(thoughtData);
    })
    .catch((err) => { console.error(err); res.status(500).json(err) })
};


// Delete a thought
// DELETE  api/thoughts/:thoughtId
const deleteThought = (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thoughtData) => {
      !thoughtData ? res.status(404).json({ message: 'That thought does not exist' })
        : res.json({ message: `That thought ${req.params.thoughtId} no longer exists` })
      })
    .catch((err) => { console.error(err); res.status(500).json(err) })
};


// Add a Reaction
// POST /api/thoughts/:thoughtId/reactions
const addReaction = (req, res) => {
  console.log(`adding a reaction ${req.body}`);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thoughtData) =>
      !thoughtData  ? res.status(404).json({ message: `No thought exists with that ${thoughtId}` })
        : res.json(thoughtData)
    )
    .catch((err) => { console.error(err); res.status(500).json(err) })
};


// Delete a Reaction
// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
const deleteReaction = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thoughtData) =>
      !thoughtData ? res.status(404).json({ message: `no thought with id ${req.params.thoughtId} exists` })
        : res.json(thoughtData)
    )
    .catch((err) => { console.error(err); res.status(500).json(err) })
};


module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction
};
