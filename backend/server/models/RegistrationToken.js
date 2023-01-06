const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const path = require("path");
const User = require("./User");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const RegistrationTokenSchema = {
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    registrationLink: {
        type: String,
    },
    registrationToken: {
        type: String,
    },
    timeStamp: {
        type: String,
    },
    user: {
        type: refType,
        ref: User
    },
    

};

const RegistrationToken = (module.exports = mongoose.model(
  "RegistrationToken",
  RegistrationTokenSchema,
  "RegistrationToken"
));

module.exports = RegistrationToken;
