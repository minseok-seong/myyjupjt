const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userNum: Number,
    username: String,
    email: String,
    password: String,
    userimg: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      // {
      //   productId: mongoose.Schema.Types.ObjectId,
      // },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
