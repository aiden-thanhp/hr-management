const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersContorller");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getUser
);
router.post("/register", controller.register);
router.get('/verifyRegisToken', controller.verify_regis_token);
router.post("/login", controller.login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  controller.profile
);
router.get('/allUsers', controller.get_allUser)

module.exports = router;