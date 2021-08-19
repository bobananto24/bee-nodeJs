const express = require("express");
const moment = require("moment");
const router = express.Router();
const Todo = require("../models/Todo");
const Title = require("../models/Title");
const middleware = require("./middleware");
const { v4: uuidv4 } = require("uuid");

router.post("/addTodo/:titleId", middleware.verify, async (req, res) => {
  const sub = await Title.findById(req.params.titleId);
  sub.list = [
    ...sub.list,
    {
      _id: uuidv4(),
      name: req.body.name,
      time: moment().format("lll"),
      completed: false,
    },
  ];

  try {
    const todo = await sub.save();
    res.status(200).json({ data: todo });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete(
  "/deleteTodo/:titleId/:listId",
  middleware.verify,
  async (req, res) => {
    try {
      const sub = await Title.findById(req.params.titleId);
      const filteredList = sub.list.filter((i) => i._id != req.params.listId);
      sub.list = filteredList;
      await sub.save();
      res.status(200).json({ message: "Todo Deleted" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
);
router.patch(
  "/updateTodo/:titleId/:listId",
  middleware.verify,
  async (req, res) => {
    try {
      let sub = await Title.findById(req.params.titleId);
      let newList = sub.list.map((i) => {
        if (i._id == req.params.listId) {
          return {
            ...i,
            completed: req.body.completed,
          };
        } else return i;
      });
      sub.list = newList;
      await sub.save();
      res.status(200).json({ data: "success" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

//Delete all list
router.delete("/deleteTodo/:titleId", middleware.verify, async (req, res) => {
  try {
    const sub = await Title.findById(req.params.titleId);
    sub.list = [];
    await sub.save();
    res.status(200).json({ message: "All Todos Deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
