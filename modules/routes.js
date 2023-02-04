const express = require("express");
const app = express();
const Auth = require("./auth");
const Post = require("./controllers/post");
const home = require("./controllers/homepage");
const viewPost = require("./controllers/viewPost");
const category = require("./controllers/category");
const deletePost = require("./controllers/deletePost");
const edit = require("./controllers/editpost");
app.use(express.urlencoded({ extended: true }));
app.get("/", home);
app.get("/article/:id", viewPost);
app.get("/category/:category", category);
app.post("/sub", Post.Subscription);
app.use(Auth.verify);
app.post("/login", Auth.login);
app.post("/post", Post.Post);
app.get("/edit/:id", edit.getEdit); // Get the post to edit
app.put("/edit/:id", edit.edit); // Send edits to database
app.delete("/article/:id", deletePost);
module.exports = app;
