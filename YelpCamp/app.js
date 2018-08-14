var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// hardcode arr for now later will make persistant to db
var campgrounds = [
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "Goat Mountain Rest", image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg"},
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "Goat Mountain Rest", image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg"}
];

// ROUTES
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

// form route
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds arr
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds"); // as a get req
});


app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));