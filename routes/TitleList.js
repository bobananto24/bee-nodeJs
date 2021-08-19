const express = require("express");
const moment = require("moment");
const router = express.Router();
const Todo = require("../models/Todo");
const Title = require("../models/Title");
const middleware = require("./middleware");

router.post("/addTitle/:userId", middleware.verify, async (req, res) => {
  const newTitle = new Title({
    name: req.body.name,
    time: moment().format("lll"),
    userId: req.params.userId,
    list: [],
  });
  try {
    const title = await newTitle.save();
    res.status(200).json({ data: title });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/listTitle/:userId", middleware.verify, async (req, res) => {
  try {
    const title = await Title.find({ userId: req.params.userId });
    res.status(200).json({ data: title });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/deleteTitle/:titleId", middleware.verify, async (req, res) => {
  try {
    const title = await Title.findByIdAndDelete(req.params.titleId);
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});
router.patch("/updateTitle/:titleId", middleware.verify, async (req, res) => {
  try {
    const title = await Title.findById(req.params.titleId);
    title.completed = req.body.completed;
    const savedTitle = await title.save();
    res.status(200).json({ data: savedTitle });
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
