const { Cat } = require("../Model/Cat");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const cat = await Cat.find();
    res.status(200).send(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
