const { Message } = require("../Model/Message");
const { Conversation } = require("../Model/Conversation");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.body.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
