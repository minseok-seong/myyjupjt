const { Product } = require("../Model/Product");
const { User } = require("../Model/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const multer = require("multer");
//CREATE

router.post("/submit", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ userNum: req.body.userNum });

    const newProduct = new Product({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      categories: req.body.categories,
      price: Number(req.body.price),
      author: user._id,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("author");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get like products
// router.post("/liked", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     console.log(user.likes);
//     let products = [];
//     user.likes.map((likes) =>  await Product.find({ _id: likes }));
//   } catch (err) {}
// });
router.post("/liked", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user.likes);

    const products = await Promise.all(
      user.likes.map(async (like) => {
        return await Product.find({ _id: like });
      })
    );
    const newproduct = products.flat(); // 플랫신 복습하자 이걸왜 몰랐을까!!
    res.status(200).json(newproduct);
  } catch (err) {}
});

//get myProducts
router.post("/myProducts", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const products = await Product.find({ author: user._id });
    res.status(200).json({ products });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: false });
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: qCategory,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
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
