const User = require("../models/User");
const jwt = require("jsonwebtoken");
const path = require("path");
const RegistrationToken = require("../models/RegistrationToken");

exports.get_tokens = async (req, res) => {
  try {
    const regisTokens = await RegistrationToken.find();
    res.status(202).json(regisTokens);
  } catch (error) {
    res.status(404).json({ message: "Can't find the tokens" });
    console.error(error);
  }
};
