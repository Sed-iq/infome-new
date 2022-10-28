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
    let { id } = req.params;
    postSchema
      .findById(id)
      .then((d) => {
        if (d) {
          res.render("post", { data: d });
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
    postSchema
      .findByIdAndDelete(id)
      .then((data) => {
        if (data) res.status(200).end();
        else res.status(404).end();
      })
      .catch((err) => {
        console.error(err);
        res.status(404).end();
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
  comment_upload: (req, res) => {
    if (req.body) {
      let { name, comment } = req.body;
      if (name == "" || name == null) {
        let Comment = {
          name: "Anonymous",
          comment,
          time: new Date(),
        };
        postSchema
          .updateOne({ _id: req.params.id }, { $push: { comment: Comment } })
          .then((d) => {
            if (d.acknowledged == true) res.redirect(`/post/${req.params.id}`);
            else res.statusd(404).redirect(`Error`);
          })
          .catch((e) => {
            console.log(e);
            res.redirect(`/post/${req.params.id}`);
          });
      } else {
        let Comment = {
          name,
          comment,
          time: new Date(),
        };
        postSchema
          .updateOne({ _id: req.params.id }, { $push: { comment: Comment } })
          .then((d) => {
            if (d.acknowledged == true) res.redirect(`/post/${req.params.id}`);
            else res.statusd(404).redirect(`Error`);
          })
          .catch((e) => {
            console.log(e);
            res.redirect(`/post/${req.params.id}`);
          });
      }
    }
  },
  dashboard: (req, res) => {
    postSchema
      .find()
      .sort({ time: "descending" })
      .then((data) => {
        res.render("dashboard", {
          data,
        });
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/");
      });
  },
};
module.exports = Controller;
