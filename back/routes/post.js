const router = require("express").Router();
const { Post } = require("../Model/Post");
const { User } = require("../Model/User");
const { Counter } = require("../Model/Counter.js"); //각 포스트의 고유 넘버를 부여하기위해

const multer = require("multer");

router.post("/submit", async (req, res) => {
  try {
    const postNumber = await Counter.find({ name: "counter" }).exec();
    const user = await User.findOne({ userNum: req.body.uNum });
    console.log(user);
    const NewPost = new Post({
      title: req.body.title,
      content: req.body.desc,
      pNum: postNumber[0].postNum, //findOne을 쓰면 배열안해보 됨
      image: req.body.image,
      author: user._id,
    });
    const savedPost = await NewPost.save();
    const updateCounter = await Counter.updateOne(
      { name: "counter" },
      { $inc: { postNum: 1 } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/list", async (req, res) => {
  try {
    let sort = {};

    if (req.body.sort === "최신순") {
      sort.createdAt = -1;
    } else {
      sort.repleNum = -1;
    }
    const postList = await Post.find({
      $or: [
        {
          title: { $regex: req.body.search },
        },
        { content: { $regex: req.body.search } },
      ],
    })
      .populate("author")
      .sort(sort)
      // .skip(req.body.more)
      // .limit(5)
      .exec();
    res.status(200).json({ success: true, postList });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const post = await Post.findOne({ pNum: Number(req.body.id) })
      .populate("author")
      .exec();
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/delete", async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.deleteOne({ pNum: req.body.id }).exec();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/edit", async (req, res) => {
  try {
    console.log(req.body);
    const post = await Post.updateOne(
      { pNum: req.body.postNumber.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.desc,
          image: req.body.image,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({ success: true, filePath: res.req.file.path });
  });
});

module.exports = router;
