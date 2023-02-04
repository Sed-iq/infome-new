const Schema = require("./../Schema");
module.exports = async function home(req, res) {
  // Homepage
  const Posts = await Schema.Post.find();
  if (Posts) {
  } else res.status(204).json({ msg: "No post found" });
};
