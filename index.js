const express = require("express");
const mongoose = require("mongoose");
const app = express();
const DBuri =
  "mongodb+srv://boban24:bobananto24@boban.pmao6.mongodb.net/TODO?retryWrites=true&w=majority";
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/TodoList");
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api", todoRoute);
mongoose.connect(DBuri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database is connected...");
});
db.on("error", () => {
  console.log("Database error");
});
app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.listen(process.env.PORT || 3000);
