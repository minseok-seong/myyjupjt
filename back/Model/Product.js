const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    img: String,
    categories: String,
    price: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Product", ProductSchema);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
