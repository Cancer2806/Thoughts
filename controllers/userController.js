// controller file for user routes

const { Thought, User } = require('../models');

// get all users
// GET /api/users
const getUsers = (req, res) => {
  User.find()
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    .then((users) => { res.json(users) })
    .catch((err) => { console.error(err); res.status(500).json(err) });
};

// Get single user
// GET /api/users/:userId
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'no user' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);;
    })
};

// create a user
// route POST /api/users
const createUser = (req, res) => {
 const {username, email} = req.body
  if (!username || !email) {
    res.status(400).json({ message: 'Please include all user fields' })
  }
  // TODO Check to see if user is already in database - this should work!!!
  // const checkUser = User.exists({ email: req.body.email });
  // console.log(`checkUser is ${checkUser}`)
  // if (checkUser) {
  //   res.status(400).json({ message: `User ${req.body.email} and ${checkUser} already exists` });
  //   return;
  // }
  
  User.create(req.body) 
      .then((userData) => {
      res.json(userData)
    })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })
};




// TODO Update a user
// PUT /api/users/:userId
const updateUser = (req, res) => {
  User.findOneAndUpdate(
    {_id:req.params.userId},
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
  // TODO check if id entered
  // const userId = req.params.id;
  // if (!userId) {
  //   return res.status(400).json({message: `Please enter a valid User id`})
  // }
  // TODO check if user exists in database
  // const checkUser = User.findOne({ _id: userId });
  // if (!checkUser) {
  //   res.status(400).json({ message: `no user with ${userId}` });
  // }
  // res.send(`Test message update User ${req.params.id}`)

    // TODO update any thoughts and friends connected to this user
  .then((userData) => {
    if (!userData) {
      return res.status(404).json({ message: `Cannot find user with id of ${req.params.userId}`});
    }
    res.json(userData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
};

// delete a user
// DELETE /api/users/:userId
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId})
  .then((dbUserData) => {
    if (!dbUserData) {
      return res.status(404).json({ message: `No user with id of ${req.params.userId} exists`});
    }
   return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
  })
  .then(() => {
    res.json({ message: `User ${req.params.userId} deleted along with all of their thoughts`})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
}

// add a Friend
// POST /api/users/:username/friends/:friendId
const addFriend = (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ message: `Cannot find username ${req.params.username}` });
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}


// Remove a Friend
// DELETE /api/users/:username/friends/:friendId
const removeFriend = (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ message: `Cannot find username ${req.params.username}` });
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

// export Controller functions
module.exports = {
  getUsers,
  getSingleUser,
  updateUser,
  createUser, 
  deleteUser,
  addFriend,
  removeFriend
};
