const bcrypt = require("bcryptjs");
const admin = require("./schemas/admin");

const Auth = {
  login: (req, res) => {
    if (req.body) {
      admin
        .findOne({ username: req.body.username })
        .then((d) => {
          if (d) {
            bcrypt.compare(req.body.password, d.password).then((r) => {
              if (r == true) {
                (req.session.login = true), (req.user = d);
                res.redirect("/admin");
              } else {
                console.log("ub");
                res.redirect("/login");
              }
            });
          }
        })
        .catch((e) => {
          console.error(e);
          res.redirect("/login");
        });
    } else {
      res.redirect("/");
    }
  },
  isLogin: (req, res, done) => {
    // Checks if user is logged in
    if (req.session.login == true) {
      if (req.url == "/login") res.redirect("/admin");
      else {
        done();
      }
    } else {
      if (req.url == "/login") done();
      else res.redirect("/login");
    }
  },
};
module.exports = Auth;
// $2a$10$.WPIYAxQusr05Xb/seg/IurXcrz.OhpZwah7tedrtckn2CSugZIlC
