const User = require("../models/user");

module.exports.registerForm = (req, res) => {
  res.render("Users/register");
};
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to HotelAdvisor");
      res.redirect("/hotels");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};
module.exports.loginForm = (req, res) => {
  res.render("users/login");
};
module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/hotels";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return req.flash("error", "user not logged in");
    } else {
      req.flash("success", "Goodbye!");
      res.redirect("/hotels");
    }
  });
};
