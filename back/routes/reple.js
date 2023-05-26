const router = require("express").Router();
const { Post } = require("../Model/Post");
const { Reple } = require("../Model/Reple");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.body.postId,
      },
      { $inc: { repleNum: 1 } }
    );
    const NewReple = new Reple({
      reple: req.body.reple,
      postId: req.body.postId,
      author: req.body.uId,
    });
    const reple = await NewReple.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/getReple", async (req, res) => {
  try {
    const reple = await Reple.find({ postId: req.body.id }).populate("author");
    res.status(200).json({ success: true, reple });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
module.exports = router;
