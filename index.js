const express = require("express");
const app = express();
// const dotenv = require("dotenv").config();
const router = require("./modules/routes");
const mongoose = require("mongoose");
// Mongodb connection
// const uri = process.env.URI;
// mongoose
//   .connect(uri)
//   .then((data) => {
//     app.listen(process.env.PORT || 5000, console.log("Server running"));
//   })
//   .catch((err) => {
//     app.listen(process.env.PORT, console.log("Error connecting to database"));
//     console.log(err);
//   });
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(process.env.PORT);
