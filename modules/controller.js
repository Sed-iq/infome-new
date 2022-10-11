const postSchema = require("./schemas/post");
const Controller = {
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
};
module.exports = Controller;
