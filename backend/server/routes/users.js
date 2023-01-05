const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getUser
);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  controller.profile
);

module.exports = router;
