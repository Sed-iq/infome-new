const Schema = require("./../Schema");
module.exports = ({ params }, res) => {
  const { id } = params;
  Schema.Post.findByIdAndDelete(id)
    .then((data) => {
      if (data != null) res.json({ msg: "Post has been deleted" });
      else res.status(404).json({ msg: "Post not found" });
    })
    .catch((err) => res.status(404).json({ msg: "Error deleting post" }));
};
