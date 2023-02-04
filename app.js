const express = require("express");
const mogoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

mogoose.connect(process.env.URI, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  } else
    app.listen(
      process.env.PORT || 5000,
      console.log("Server running at port 5000")
    );
});
