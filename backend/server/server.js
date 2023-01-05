const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

app.use(cors());
app.use('/', express.json());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

// Define your back-end routes here:
app.use('/users', userRoutes);

// When a request is sent to an invalid route,
// a 404 status with the message will be sent back
app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Server route is not valid.',
  });
});

module.exports = app;
