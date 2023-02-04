const Schema = require("./../Schema");
module.exports = async function home(req, res) {
  // Homepage
  const Posts = await Schema.Post.find().sort({ createdAt: "desc" });
  if (Posts != null) {
    const posts = {
      // Categories
      sports: PostParser(Posts, "sports"),
      technology: PostParser(Posts, "technology"),
      politics: PostParser(Posts, "politics"),
      entertainment: PostParser(Posts, "entertainment"),
      crime: PostParser(Posts, "crime"),
      other: PostParser(Posts, "other"),
    };
    res.json(posts);
  } else res.status(204).json({ msg: "No post found" });
};

function PostParser(post, category) {
  const r = post.filter((c) => c.category == category);
  return r.slice(0, 10);
}
