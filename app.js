const express = require("express");
const app = express();
const router = require("./modules/routes");
const mongoose = require("mongoose");
app.use(router);
// Mongodb connection
const uri = "mongodb://127.0.0.1/blog";
mongoose
  .connect(uri)
  .then((data) => {
    app.listen(5000, console.log("Server running"));
  })
  .catch((err) => {
    throw err;
  });
