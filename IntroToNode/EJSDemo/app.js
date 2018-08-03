var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/yo/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("home", {thingVar:thing});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post1", author: "PJ"},
    {title: "Post2", author: "AJ"},
    {title: "Post3", author: "MJ"}
  ];
  res.render("posts", {posts:posts});
});

app.listen(3000, () => 
console.log('Example app listening on port 3000!'));
