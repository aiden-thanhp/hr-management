const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const routes = require('./routes');

require('dotenv').config({ path: path.join(__dirname, '../.env')});

app.use(cors())
app.use('/', express.json());

// Define your back-end routes here:
app.use('/profile', routes.ProfileRouter);
app.use('/s3Url', routes.S3Router);

// When a request is sent to an invalid route,
// a 404 status with the message will be sent back
app.all('*', (req, res) => {
    res.status(404).send({
        message: 'Server route is not valid.'
    })
});

module.exports = app;