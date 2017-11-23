const express = require("express");
const app = express();
const port = 3000;
const opn = require('opn');

// Define routes
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  opn(`http://localhost:${port}`);
});
