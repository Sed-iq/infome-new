const jwt = require("jsonwebtoken");
const Schema = require("./Schema");
const jwtsec = process.env.JWT_SECRET;
const Auth = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(401).json({ message: "You must enter all fields" });
    else
      try {
        const User = await Schema.Admin.findOne();
        if (User) {
          const token = jwt.sign({ id: User._id }, jwtsec, {
            expiresIn: "15hrs",
          });
          res.json({ token });
        } else res.status(401).json({ message: "Login failed" });
      } catch (err) {
        res.status(500).json({ message: "Error" });
      }
  },
  verify: async (req, res, next) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, jwtsec, async (err, decoded) => {
      if (err) {
        if (req.url == "/login") next();
        else
          res.status(401).json({
            message: "Erorr verifying",
            redirect: true,
            url: "/login",
          });
      } else {
        try {
          const admin = await Schema.Admin.findById(decoded.id);
          if (admin)
            if (req.url == "/login")
              res.status(407).json({
                message: "Already logged in",
                redirect: true,
                url: "/dashboard",
              });
            else next();
          else
            res.status(500).json({
              msg: "Error logging you in",
              redirect: true,
              url: "/login",
            });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            msg: "Error logging you in",
            redirect: true,
            url: "/login",
          });
        }
      }
    });
  },
};
module.exports = Auth;
