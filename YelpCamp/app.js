var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    localStrategy     = require('passport-local'),
    seedDB            = require("./seeds"),
    User              = require('./models/user');
    
// require routes
var campgroundRoutes  = require('./routes/campgrounds'),
    commentRoutes     = require('./routes/comments'),
    authRoutes        = require('./routes/index');

// SET UP
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// seed the db with starter data
// seedDB();

// PASSPORT CONFIGURATION - FOR AUTH
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
app.use(function(req, res, next) { // passes currentUser to all routes
  res.locals.currentUser = req.user;
  next();
});

// order is important here move this to the back
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));