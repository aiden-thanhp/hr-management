const User = require('../models/User');
const jwt = require('jsonwebtoken');
const path = require('path');
const House = require('../models/House');
const RegistrationToken = require('../models/RegistrationToken');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Get User
exports.getUser = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isHR: user.isHR,
      profile: user.profile,
      house: user.house,
      registerToken: user.regisToken,
    },
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, regisTokenEmail } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
    const houses = await House.find();
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    // const randomHouse = houses[0];
    const userCreated = await User.create({
      username: username,
      email: email,
      password: hash,
      house: randomHouse._id,
    });
    const houseToUpdate = await House.findOne({ _id: randomHouse._id });
    const houseResidents = houseToUpdate.residents
      ? houseToUpdate.residents
      : [];
    houseResidents.push(userCreated);
    await House.findOneAndUpdate(
      { _id: randomHouse.id },
      { residents: houseResidents }
    );
    const updatedRegisToken = await RegistrationToken.findOneAndUpdate(
      { email: regisTokenEmail },
      { user: userCreated },
      { new: true }
    );
    await User.findOneAndUpdate(
      { username: username },
      { regisToken: updatedRegisToken }
    );
    res.status(201).json({ success: true, msg: 'User registered' });
  } catch (e) {
    console.error(e);
    res.json({ success: false, msg: 'Email or username already exist!' });
  }
};

exports.verify_regis_token = async (req, res) => {
  try {
    const email = req.query.email;
    const regisToken = await RegistrationToken.findOne({ email: email });
    if (regisToken) {
      if (regisToken.registrationToken) {
        try {
          const verifyToken = jwt.verify(
            regisToken.registrationToken,
            process.env.JWT_KEY
          );
          if (!verifyToken) {
            res.status(401).json({ message: 'The token is not valid' });
          } else {
            res
              .status(200)
              .json({ message: 'The registration token is verified' });
          }
        } catch (err) {
          res.status(401).json({ message: 'Token expired' });
        }
      } else {
        res.status(404).json({ message: 'Token Not Found' });
      }
    } else {
      res.status(404).json({ message: 'Email Not Found.' });
    }
  } catch (err) {
    console.log(err);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
      .populate('profile')
      .populate('house')
      .populate('regisToken');
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
          username: user.username,
          email: user.email,
          isHR: user.isHR,
          profile: user.profile,
          house: user.house,
          registerToken: user.regisToken,
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

exports.get_allUser = async (req, res) => {
  const users = await User.find()
    .populate('house')
    .populate('profile')
    .populate('regisToken');
  res.status(200).send({ data: users });
};
