var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// Campground.create(
//   { 
//     name: "Goat Mountain Rest", 
//     image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg",
//     description: "There are many screaming goats here... MEEEEEEE... AAAAAAAHHH!"
//   }, function(err, campground) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   });

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
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

// GET: form show route
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
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
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      // render show template with that id campground
      res.render("show", {campground: foundCampground});
    }
  });
}); 

app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));