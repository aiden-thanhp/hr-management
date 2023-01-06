const express = require("express");
const router = express.Router();
const controller = require("../controllers/emailController");
const regisController = require('../controllers/regisTokenController');
const passport = require("passport");

router.post(
  "/sendToken",
  passport.authenticate("jwt", { session: false }),
  controller.send_token
);
router.get(
  "/regisTokens",
  passport.authenticate("jwt", { session: false }),
  regisController.get_tokens
);

module.exports = router;
