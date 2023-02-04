const Schema = require("./../Schema");

module.exports.getEdit = (req, res) => {
  const { id } = req.params;
  Schema.Post.findById(id)
    .then((data) => {
      if (data != "") {
        const _Data = {
          title: data.title,
          body: data.body,
          category: data.category,
        };
        res.json(_Data);
      } else res.status(404).json({ msg: "Post not found" });
    })
    .catch((err) => res.status(404).json({ msg: "Error getting post" }));
};
module.exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;
    const Post = await Schema.Post.findByIdAndUpdate(id, {
      title,
      body,
      category,
    });
    if (Post != null) res.json({ msg: "Post has been edited" });
    else res.status(404).json({ msg: "Error editing post" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error editing post" });
  }
};
