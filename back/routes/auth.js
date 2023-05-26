const router = require("express").Router();
const { User } = require("../Model/User");
const { Counter } = require("../Model/Counter");

var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: "counter" }).exec();
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, "imuchgabi").toString(),
      userNum: counter.userNum,
    });

    const savedUser = await newUser.save();
    const updateCounter = await Counter.updateOne(
      { name: "counter" },
      { $inc: { userNum: 1 } }
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body; // destructure data from body
//   const encryptedPassword = CryptoJS.AES.encrypt(
//     password,
//     "imuchgabi"
//   ).toString(); // encrypt password
//   const newUser = new User({ username, email, encryptedPassword }); // create user

//   try {
//     const savedUser = await newUser.save(); // save user
//     res.status(201).json({ success: true }); // respond with status 201
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err); // respond with error status
//   }
// });

//LOGIN

//LOGIN
// router.post("/login", async (req, res) => {
//   console.log(req.body);
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//     });

//     if (!user) {
//       return res.status(401).json("Wrong User Name");
//     }

//     const hashedPassword = CryptoJS.AES.decrypt(user.password, "imuchgabi");

//     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//     const inputPassword = req.body.password;

//     if (originalPassword != inputPassword) {
//       return res.status(401).json("Wrong Password");
//     }

//     // const accessToken = jwt.sign(
//     //   {
//     //     id: user._id,
//     //   },
//     //   "imuchgabi",
//     //   { expiresIn: "3d" }
//     // );

//     console.log(user);
//     const { password, ...others } = user._doc;
//     res.status(200).json({ ...others /*accessToken*/ });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, "imuchgabi");

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      "imuchgabi",
      { expiresIn: "3d" }
    );

    console.log(user);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
