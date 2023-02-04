const Schema = require("./../Schema");

module.exports = (req, res) => {
  const { id } = req.params;

  Schema.Post.findById(id)
    .then((data) => {
      if (data != null) {
        const Data = {
          id: data._id,
          creationDate: data.createdAt,
          title: data.title,
          body: data.body,
          category: data.category,
        };
        res.json(Data);
      } else res.status(404).json({ msg: "No post found" });
    })
    .catch((err) => res.status(404).json({ msg: "Error getting post" }));
};
