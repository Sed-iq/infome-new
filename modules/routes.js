const express = require("express");
const router = express();
const session = require("express-session");
const Controller = require("./controller");
const auth = require("./auth");
const path = require("path");
router.use(
  session({
    secret: "WPIYAxQusr05X",
    saveUninitialized: true,
    resave: false,
  })
);

router.use(express.urlencoded({ extended: true }));
router.get("/", Controller.homepage);
router.get("/login", auth.isLogin, (req, res) => {
  res.render("login");
});
router.get("/post/:id", Controller.showPost); // Getting one post
router.get("/admin", auth.isLogin, Controller.dashboard);
// Post requests
router.post("/login", auth.login);
router.post(
  "/post",
  auth.isLogin,
  Controller.imageUpload.single("image"),
  Controller.post
); // Posting a blog
router.post("/comment/:id", Controller.comment_upload);
// Delete requests
router.delete("/post/:id", auth.isLogin, Controller.deletePost);
router.delete("/logout", auth.isLogin, Controller.logout);
router.use((req, res) => {
  res.render("404");
});
module.exports = router;
