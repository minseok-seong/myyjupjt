const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  cat: String,
  url: String,
});

const Cat = mongoose.model("Cat", CatSchema);

module.exports = { Cat };
