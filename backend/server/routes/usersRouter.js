const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const passport = require("passport");
// const { auth_regis_token } = require("../middleware/regisTokenVerify");

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

module.exports = router;
