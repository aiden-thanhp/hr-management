const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, (error) => {
    if (error) console.log("db.js error =", error);
    else console.log("Connected to DB.")
});

module.exports = mongoose.connection; 