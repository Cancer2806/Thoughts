// controller file for user routes

const User = require("../models/User");

// create a user
// route POST /api/users
const createUser = (req, res) => {
  if (!req.body.username || !req.body.email) {
    res.status(400).json({ message: 'Please include all user fields' })
  }
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};


// get all users
// GET /api/users
const getUsers = (req, res) => {
  User.find()
    .then((users) => { res.json(users) })
    .catch((err) => res.status(500).json(err));
};

// Update a user
// PUT /api/users/:id
const updateUser = (req, res) => {
  res.send(`Test message update User ${req.params.id}`)
};

// delete a user
// DELETE /api/users/:userId
const deleteUser = (req, res) => {
  res.send(`delete user ${req.params.id}`)
}

// export Controller functions
module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
};
