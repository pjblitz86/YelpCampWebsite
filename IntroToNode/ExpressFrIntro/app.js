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

// route params pattern
app.get("/r/:subredditName/:title", function(req, res) {
  console.log(req.params);
  var subreddit = req.params.subredditName;
  res.send(`welcome to ${subreddit}`);
});

//exercise1
app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal.toLowerCase();
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof"
  }
  var sound = sounds[animal];
  res.send(`The ${animal} says ${sound}`);
});

// exercise2
app.get("/repeat/:message/:times", function(req, res) {
  var message = req.params.message;
  var times = Number(req.params.times);
  var result = "";

  for(var i=0; i<times; i++) {
    result += message + " ";
  }

  res.send(result);
});

// all routes - order important: must be last
app.get("*", function(req, res) {
  res.send("all not defined routes");
});

// Tell express to listen for requests (start server)
app.listen(3000, () => 
console.log('Example app listening on port 3000!'));