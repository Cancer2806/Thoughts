// file with routes to use for Thought CRUD operations

// Use express for routers
const router = require('express').Router();

// import controller functions
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
  updateThought
} = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);


// /api/thoughts/:id
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;