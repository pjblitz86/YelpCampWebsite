// var cat = require('cat-me');
// console.log(cat());


console.log("From app.js");
var chuck = require('chuck-norris-jokes');

chuck
  .hitme()
  .then(console.log.bind(console));