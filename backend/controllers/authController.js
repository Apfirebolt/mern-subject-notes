import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists with this email' });
    throw new Error('User already exists with this email');
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400).json({ message: 'Username already exists' });
    throw new Error('Username already exists');
  }

  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Get user by ID
// @route   GET /api/auth/profile
// @access  Private/
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user password
// @route   PUT /api/auth/change-password
// @access  Private

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { current_password, new_password } = req.body;

    if (!(await user.matchPassword(current_password))) {
      res.status(400);
      throw new Error('Current password is incorrect');
    }

    user.password = new_password;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});



export {
  authUser,
  registerUser,
  getProfile,
  getUsers,
  updateProfile,
  changePassword,
};
