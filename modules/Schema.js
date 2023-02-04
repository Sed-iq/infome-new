const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = {
  Admin: mongoose.model(
    "admin",
    Schema({
      email: {
        require: true,
        type: String,
      },
      password: {
        require: true,
        type: String,
      },
    })
  ),
  Post: mongoose.model(
    "post",
    Schema(
      {
        title: {
          type: String,
          require: true,
        },
        snippet: {
          type: String,
          require: true,
        },
        body: {
          type: String,
          require: true,
        },
        image: {
          type: String,
        },
      },
      { timestamps: true }
    )
  ),
  Subs: mongoose.model(
    "sub",
    Schema(
      {
        email: { type: String, required: true },
        category: { type: String, required: true },
      },
      { timestamps: true }
    )
  ),
};
module.exports = _;
