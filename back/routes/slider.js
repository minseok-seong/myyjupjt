const { Slider } = require("../Model/Slider");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(200).send(slider);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
