const express = require("express");
const app = express();
// const dotenv = require("dotenv");
const router = require("./modules/routes");
const mongoose = require("mongoose");
app.use(router);
// Mongodb connection
const uri = "mongodb+srv://ikki:08126074692@blog.hrxwj.mongodb.net/blog";
mongoose
  .connect(uri)
  .then((data) => {
    app.listen(5000, console.log("Server running"));
  })
  .catch((err) => {
    throw err;
  });
