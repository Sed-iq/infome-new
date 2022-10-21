const postSchema = require("./schemas/post"),
  multer = require("multer");
const Controller = {
  imageUpload: (req, res) => {
    const storage = multer.diskStorage({
      filename: (req, cb, file) => {
        console.log(file);
      },
      destination: (req, cb, file) => {
        console.log(file);
      },
    });
    multer({
      storage: storage,
    });
  },
  post: (req, res) => {
    let { title, snippet, image, author, body } = req.body;
    let newPost = new postSchema({
      title,
      snippet,
      image,
      author,
      body,
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
    let { id } = req.params;
    postSchema
      .findById(id)
      .then((d) => {
        if (d) {
          res.send("A brand new post");
        } else {
          res.redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
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
