var passport = require("passport");
const router = require("express").Router();
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

module.exports = function(app) {
  app.use(
    cookieSession({
      name: "session",
      keys: ["123"]
    })
  );
  app.use(cookieParser());

  router.route(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }),
    console.log("im here")
    );

  router.get("/auth/logout", function(req, res) {
    //handle with passport
    req.logout();
    req.session = null;
    res.redirect("/");
  });

  router.get("/auth/google/callback", passport.authenticate("google"), function(
    req,
    res
  ) {
    var loggedInUser = req.user.profile;
    console.log("Name: " + loggedInUser.displayName);
    console.log("Email: " + loggedInUser._json.email);
    console.log("Photo: " + loggedInUser._json.picture);
    console.log("GoogleId: " + loggedInUser.id);
    // set a cookie
    app.use(function(req, res, next) {
      // check if client sent cookie
      var cookie = req.cookies.cookieName;
      if (cookie === undefined) {
        // no: set a new cookie
        res.cookie("User Cookie", loggedInUser.id, {
          maxAge: 900000,
          httpOnly: true
        });
        console.log("cookie created successfully");
      } else {
        // yes, cookie was already present
        console.log("cookie exists", cookie);
      }
      next(); // <-- important!
    });
    req.session.token = req.user.token;
    res.redirect("/");
  });
};
