const express = require("express");
const router = express();
const auth = require("./auth");
const session = require("express-session");
const Controller = require("./controller");
router.use(
  session({
    secret: "WPIYAxQusr05X",
    saveUninitialized: true,
    resave: false,
  })
);
router.use("/public", express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.set("view engine", "ejs");
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
);
router.post("/comment/:id", Controller.comment_upload);
// Delete requests
router.delete("/post/:id", Controller.deletePost);
router.delete("/logout", Controller.logout);
module.exports = router;
