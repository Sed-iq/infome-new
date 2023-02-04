const Schema = require("./../Schema");
const multer = require("multer");
const Controller = {
  Post: async (req, res) => {
    // Makes a new post
    const { title, category, body } = req.body;
    if (!title || !category || !body)
      res.status(501).json({ msg: "Please complete all fields" });
    else {
      try {
        const _post = new Schema.Post({
          title: title,
          category: category,
          body: body,
        });
        const saved = await _post.save();
        if (saved) res.json({ msg: "Posted" });
        else res.status(500).json({ msg: "Error creating new post" });
      } catch (err) {
        res.status(500).json({ msg: "Error creating new post" });
        console.log(err);
      }
    }
  },
  ImageParse: () => {},
  Subscription: async (req, res) => {
    const { email, category } = req.body;
    if (!email || !category)
      res.status(501).json({ msg: "Please complete all fields" });
    else {
      try {
        const Sub = await Schema.Subs.findOne({ email });
        if (Sub) res.status(400).json({ msg: "Email already exists" });
        else {
          // Create new subscriber
          const _sub = new Schema.Subs({
            email: email,
            category: category,
          });
          const saved = await _sub.save();
          if (saved) res.json({ msg: "Subscribed" });
          else res.status(500).json({ msg: "Erorr subscribing" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erorr subscribing" });
      }
    }
  },
};
module.exports = Controller;
