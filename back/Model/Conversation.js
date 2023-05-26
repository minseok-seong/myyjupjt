const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    id: String,
    sellerId: String,
    buyerId: String,
    lastMessage: String,
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
