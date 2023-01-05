const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const House = require('../models/House');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Get User
exports.getUser = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.name,
      email: user.username,
      isHR: user.isHR,
      profile: user.profile,
      house: user.house,
    },
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
    const houses = await House.find();
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    await User.create({
      username: username,
      email: email,
      password: hash,
      house: randomHouse._id,
    });
    res.status(201).json({ success: true, msg: 'User registered' });
  } catch (e) {
    console.error(e);
    res.json({ success: false, msg: 'Email or username already exist!' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
      .populate('profile')
      .populate('house');
    if (!user) {
      return res.json({ success: false, msg: 'User not found', status: 401 });
    }

    const hasedPassword = user.password;
    const match = await bcrypt.compare(password, hasedPassword);
    if (!match) {
      return res.json({ success: false, msg: 'Wrong password' });
    } else {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_KEY,
        {
          expiresIn: 604800,
        }
      );

      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          username: user.name,
          email: user.username,
          isHR: user.isHR,
          profile: user.profile,
          house: user.house,
        },
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: 'Login failed: Try again' });
  }
};

// Profile
exports.profile = async (req, res) => {
  res.json({ user: req.user });
};
