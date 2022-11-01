const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const router = require("./modules/routes");
const mongoose = require("mongoose");
const path = require("path");
// Mongodb connection
const uri = process.env.URI;
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname + `/views`));
app.set("view engine", "ejs");
mongoose
  .connect(uri)
  .then((data) => {
    app.listen(process.env.PORT || 5000, console.log("Server running"));
  })
  .catch((err) => {
    app.listen(process.env.PORT, console.log("Error connecting to database"));
    console.log(err);
  });
app.use(router);
