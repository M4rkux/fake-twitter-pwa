var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());

// Define routes
app.use(express.static("public"));

// Start the server
app.listen(port, function() {
  console.log(`http://localhost:${port}`);
});
