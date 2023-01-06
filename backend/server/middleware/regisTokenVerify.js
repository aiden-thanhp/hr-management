const jwt = require("jsonwebtoken");
const path = require("path");
const RegistrationToken = require("../models/RegistrationToken");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const JWT_KEY = process.env.JWT_KEY;

exports.auth_regis_token = async (req, res, next) => {
  try {
    const email = req.query.email;
    const regisToken = await RegistrationToken.findOne({email: email});
    if (regisToken.registrationToken) {
        const verifyToken = jwt.verify(regisToken.registrationToken, JWT_KEY);
        if (verifyToken) {
          return next();
        }
    }
    return new Error('JWT not verified')
  } catch (error) {
    res.status(401).json({ message: "Please log in to access page!" });
  }
};
