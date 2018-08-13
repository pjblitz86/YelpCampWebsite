var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/friends", function(req, res) {
  var friends = ["PJ", "AJ", "NJ"];
  res.render("friends", {friends: friends});
})

// POST REQUEST
app.post("/addfriend", function(req, res) {
  res.send("post route");
});

app.listen(3000, () => 
console.log('Example app listening on port 3000!'));