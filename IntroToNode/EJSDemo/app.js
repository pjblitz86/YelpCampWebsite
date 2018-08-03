var express = require('express');
var app = express();

app.get("/yo/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("home.ejs", {thingVar:thing});
});

app.listen(3000, () => 
console.log('Example app listening on port 3000!'));
