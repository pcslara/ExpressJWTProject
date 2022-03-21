const mongoose = require("mongoose");

var uri = "mongodb://localhost:27017/base";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection
