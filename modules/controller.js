const postSchema = require("./schemas/post"),
  multer = require("multer"),
  path = require("path");
const Controller = {
  imageUpload: multer({
    storage: multer.diskStorage({
      destination: (res, file, cb) => {
        cb(null, path.join(__dirname + "/uploads"));
      },
      filename: (res, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }),
  homepage: (req, res) => {
    postSchema
      .find()
      .sort({ time: "descending" })
      .then((data) => {
        // first left
        let left = data.splice(0, 2);
        let right = data.splice(0, 1);
        let second = data.splice(0, 3);
        res.render("index", {
          right,
          left,
          second,
          data,
        });
        console.log(second);
      })
      .catch((e) => console.log(e));
  },
  post: (req, res) => {
    let { title, snippet, keywords, body } = req.body;
    let image = req.file.filename;
    let newPost = new postSchema({
      title,
      snippet,
      image,
      keywords,
      body,
      time: new Date(),
    });
    newPost
      .save()
      .then((d) => {
        res.redirect("/admin");
      })
      .catch((e) => {
        console.error(e);
        res.redirect("/admin");
      });
  },
  showPost: (req, res) => {
    res.render("post");
    // let { id } = req.params;
    // postSchema
    //   .findById(id)
    //   .then((d) => {
    //     if (d) {
    //     } else {
    //       res.redirect("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.redirect("/");
    //   });
  },
  deletePost: (req, res) => {
    let { id } = req.params;
    postSchema.deleteOne({ _id: id }, (err, s) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: err });
      } else {
        console.log(s);
        res.status(200).end();
      }
    });
  },
  logout: (req, res) => {
    let { session } = req;
    session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: err });
      } else res.status(200).end();
    });
  },
};
module.exports = Controller;
