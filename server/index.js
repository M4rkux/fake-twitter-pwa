const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Define routes
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
