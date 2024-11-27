const express = require("express");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const user = require("../controllers/user");
const session = require("express-session");
const { registerForm } = require("../controllers/user");

router
  .route("/register")
  .get(user.registerForm)
  .post(catchAsync(user.register));

router
  .route("/login")
  .get(user.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.login
  );
router.get("/logout", user.logout);
module.exports = router;
