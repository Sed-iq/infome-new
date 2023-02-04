// Returns all categories paginated
const Schema = require("./../Schema");
module.exports = async (req, res) => {
  try {
    var page = req.query.page || 1;
    const limit = 10;
    if (page <= 0) page = 1;
    const { category } = req.params;
    const Posts = await Schema.Post.find({ category: category })
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip((page - 1) * limit);
    if (Posts != null) res.json(postParse(Posts));
    else res.status(404).json({ msg: "Nothing was found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error page could not be loaded" });
  }
};
function postParse(arr) {
  var _ = [];
  arr.map((post) => {
    _.push({
      id: post._id,
      title: post.title,
      body: post.body,
      category: post.category,
      creationDate: post.createdAt,
    });
  });
  return _;
}
