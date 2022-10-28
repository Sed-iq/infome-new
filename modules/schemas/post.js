const mongoose = require("mongoose");
const pObj = {
  snippet: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  comment:{
    type: Array
  }
};
const schema = mongoose.Schema(pObj);
module.exports = mongoose.model("post", schema);
