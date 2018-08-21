var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var User        = require('../models/user');

// Route route
router.get("/", function(req, res) {
  res.render("landing");
});

// REGISTER get and post
router.get('/register', function(req, res) {
  res.render("register");
});

// Sign up logic
router.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

// LOGIN get and post
router.get("/login", function(req, res) {
  res.render("login");
});

// post login with middleware
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
  req.logout(); // passport implemented method
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;