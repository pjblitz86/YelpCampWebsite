var express = require('express');
var app = express();

// simple routing
// "/" => "Hi there"
app.get("/", function(req, res) {
  res.send("Hi there");
});

// "/bye" => "Goodbye"
app.get("/bye", function(req, res) {
  res.send("Goodbye");
});

// "/dog" => "Woof"
app.get("/dog", function(req, res) {
  console.log("request made");
  res.send("Woof");
});

// Tell express to listen for requests (start server)
app.listen(3000, () => 
console.log('Example app listening on port 3000!'))