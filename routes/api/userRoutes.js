// file with routes to use for User CRUD operations

// Use express for routers
const router = require('express').Router();

// import controller functions
const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:id').put(updateUser).delete(deleteUser);




module.exports = router;