const { Conversation } = require("../Model/Conversation");

const router = require("express").Router();

router.get("/sell/:id", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      sellerId: req.params.id.toString(),
    }).sort({ updatedAt: -1 });
    // req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    // ).sort({ updatedAt: -1 });

    res.status(200).send(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/buy/:id", async (req, res) => {
  try {
    const conversations = await Conversation.find(
      { buyerId: req.params.id }
      // req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    // id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    id: req.body.sellerId + req.body.buyerId, //판 + 구
    // sellerId: req.isSeller ? req.userId : req.body.to,
    sellerId: req.body.sellerId,
    // buyerId: req.isSeller ? req.body.to : req.userId,
    buyerId: req.body.buyerId,
    // readBySeller: req.isSeller,
    // readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const conversation = await Conversation.findOne({ id: req.params.id });

    console.log("하이");
    console.log(conversation);
    if (!conversation) {
      console.log("하이2");
      return res.status(404).json({ success: false });
      console.log("하이3");
    }
    res.status(200).send(conversation);
    console.log("하이4");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
