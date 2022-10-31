const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const router = require("./modules/routes");
const mongoose = require("mongoose");
app.use(router);
// Mongodb connection
const uri = process.env.URI;
mongoose
  .connect(uri)
  .then((data) => {
    app.listen(process.env.PORT || 5000, console.log("Server running"));
  })
  .catch((err) => {
    throw err;
  });
