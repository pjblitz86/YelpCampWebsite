var express = require('express');
var app = express();

app.set("view engine", "ejs");


// ROUTES
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg"},
    {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Goat Mountain Rest", image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});


app.listen(3000, () => 
console.log('YelpCamp server started on port 3000!'));