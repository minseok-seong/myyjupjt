const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const postRoute = require("./routes/post");
const repleRoute = require("./routes/reple");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const sliderRoute = require("./routes/slider");
const catRoute = require("./routes/cat");

const cors = require("cors");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/post", postRoute);
app.use("/api/reple", repleRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/cat", catRoute);
app.use(express.static("public", { "Content-Type": "application/javascript" }));

app.use("/image", express.static("./image"));

app.use(express.static(path.join(__dirname, "../front/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
  // res.send("gkdl");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
