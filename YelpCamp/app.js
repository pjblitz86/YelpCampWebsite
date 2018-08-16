var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Set the db schema and model
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//   { 
//     name: "Goat Mountain Rest", 
//     image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg"
//   }, function(err, campground) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   });

// ROUTES
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

// form route
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to db
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));