// make express available for ./src/index.html and send data to the client
const express = require("express");
const app = express();


// Path: ./src/index.html
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// start the server on port 3000
app.listen(3000, 
  // '172.21.20.30', 
  () => {
  console.log("Server started on port 3000");
});
