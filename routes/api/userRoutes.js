// file with routes for User CRUD operations

// Use express for routers
const router = require('express').Router();

// import controller functions

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);


// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


// /api/users/:username/friends/:friendId
router.route('/:username/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;