var express = require('express');
var app = express();

app.get("/yo/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("home.ejs", {thingVar:thing});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post1", author: "PJ"},
    {title: "Post2", author: "AJ"},
    {title: "Post3", author: "MJ"}
  ];
  res.render("posts.ejs", {posts:posts});
});

app.listen(3000, () => 
console.log('Example app listening on port 3000!'));
