var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// Index - show all campgrounds
router.get("/", function(req, res) {
  // search feature conditional
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get searched campgrounds from DB
    Campground.find({name: regex}, function(err, searchedCampgrounds){
        if(err){
            console.log(err);
        } else {
          if(searchedCampgrounds.length < 1) {
            req.flash("error", "Campground not found");
            return res.redirect("back");
          }
          res.render("campgrounds/index",{campgrounds:searchedCampgrounds});
        }
    });
  } else {
    // Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
      if(err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds'});
      }
    });
  }
});

// POST: form submit - create new campground
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form and add to db
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, price: price, image: image, description: desc, author: author};
  // Create a new camground and save to db
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// GET: form show route
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// GET: individual campground show page by id
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
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      req.flash("error", "This campground doesn't exist!");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// reg ex for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;