const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

const User = require('../models/User');

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_KEY;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, msg: 'Invalid token. Try login' });
        }
        if (user) {
          return done(null, user);
        } else {
          return res
            .status(401)
            .json({ success: false, msg: 'Invalid token. Try login' });
        }
      })
        .populate('house')
        .populate('profile');
    })
  );
};
