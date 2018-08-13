var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var friends = ["PJ", "AJ", "NJ"];

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/friends", function(req, res) {
  
  res.render("friends", {friends: friends});
})

// POST REQUEST
app.post("/addfriend", function(req, res) {
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("friends");
});

app.listen(3000, () => 
console.log('Example app listening on port 3000!'));