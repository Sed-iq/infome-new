const express = require("express");
const router = express();
const auth = require("./auth");
const session = require("express-session");
const Controller = require("./controller");
const postSchema = require("./schemas/post");
router.use(
  session({
    secret: "WPIYAxQusr05X",
    saveUninitialized: true,
    resave: false,
  })
);
router.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
  res.send("home page");
});
router.get("/login", (req, res) => {
  res.send("Login page");
});
router.get("/post/:id", Controller.showPost); // Getting one post
router.get("/admin", auth.isLogin, (req, res) => {
  res.send("Admin");
});
// Post requests
router.post("/login", auth.login);
router.post("/post", auth.isLogin, Controller.post);
module.exports = router;
