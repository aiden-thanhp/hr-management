const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

app.use(cors());
app.use('/', express.json());

// Define your back-end routes here:
app.use('/profile', routes.ProfileRouter);
app.use('/s3Url', routes.S3Router);
app.use('/users', routes.userRouter);
app.use('/hr', routes.hrRouter);
app.use('/house', routes.houseRouter);

// When a request is sent to an invalid route,
// a 404 status with the message will be sent back
app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Server route is not valid.',
  });
});

module.exports = app;
