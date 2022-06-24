// file with routes to use for Thought CRUD operations

// Use express for routers
const router = require('express').Router();

// import controller functions
const {
  getThoughts,
  updateThought,
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:userId
router.route('/:userId').put(updateThought).delete(deleteThought);


module.exports = router;