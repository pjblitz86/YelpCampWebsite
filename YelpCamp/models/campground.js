var mongoose = require('mongoose');

// Set the db schema and model
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Campground", campgroundSchema);