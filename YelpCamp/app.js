var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    localStrategy = require('passport-local'),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    User        = require('./models/user');

// SET UP
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// seed the db with starter data
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "PJ secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// RESTFUL ROUTES

// GET: Index route
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// GET: form show route
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// POST: form submit - create new campground
app.post("/campgrounds", function(req, res) {
  // get data from form and add to db
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Create a new camground and save to db
  Campground.create(newCampground, function(err, newlyCreared) {
    if(err) {
      console.log(err); // later will implement validation errors
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds"); // as a get req
    }
  });
});

// GET: campground show page by id
app.get("/campgrounds/:id", function(req, res) {
  // find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      // render show template with that id campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// =========================
// COMMENTS ROUTES
// =========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });  
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
  // lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect to campground show page
          res.redirect("/campgrounds/"+campground._id);
        }
      });
    }
  });
});

//==============
// AUTH ROUTES
//==============

// REGISTER get and post
app.get('/register', function(req, res) {
  res.render("register");
});

app.post('/register', function(req, res) {
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
app.get("/login", function(req, res) {
  res.render("login");
});

// post login with middleware
app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});

// LOGOUT ROUTE
app.get("/logout", function(req, res) {
  req.logout(); // passport implemented method
  res.redirect("/campgrounds");
});


// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));