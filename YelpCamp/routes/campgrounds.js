var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');

// Index - show all campgrounds
router.get("/", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

// POST: form submit - create new campground
router.post("/", isLoggedIn, function(req, res) {
  // get data from form and add to db
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author: author};
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

// GET: form show route
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// GET: campground show page by id
router.get("/:id", function(req, res) {
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

// EDIT
router.get("/:id/edit", checkCampgroundOwnership, function(req,res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// UPDATE
router.put("/:id", checkCampgroundOwnership, function(req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // redirect to show page
});

// DESTROY
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
// is user logged in?
if(req.isAuthenticated()) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      res.redirect("back");
    } else {
    // does user own a campground
      if(foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    }
  });
} else {
  res.redirect("back");
}
}

module.exports = router;