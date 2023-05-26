const mongoose = require("mongoose");

//각 포스트마다 가지고 있는 오브젝트아이디가 매우 복잡해서
//따로 만든 갯수 모델

const counterSchema = new mongoose.Schema({
  name: String,
  postNum: Number,
  userNum: Number,
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };
