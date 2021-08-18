const express = require("express");
const moment = require("moment");
const router = express.Router();
const Todo = require("../models/Todo");
const Title = require("../models/Title");
const middleware = require("./middleware");

router.post("/addTodo/:titleId", middleware.verify, async (req, res) => {
  const b = await Title.findById(req.params.titleId);
  b.list = [
    ...b.list,
    {
      name: req.body.name,
      time: moment().format("lll"),
    },
  ];

  try {
    const todo = await b.save();
    res.status(200).json({ data: todo });
  } catch (e) {
    res.status(500).json(e);
  }
});

// router.delete("/deleteTodo/:todoId", middleware.verify, async (req, res) => {
//   try {
//     const todo = await Todo.findByIdAndDelete(req.params.todoId);
//     res.status(200).json({ message: "Deleted" });
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });
// router.patch("/updateTodo/:todoId", middleware.verify, async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.todoId);
//     todo.completed = req.body.completed;
//     const savedTodo = await todo.save();
//     res.status(200).json({ data: savedTodo });
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

module.exports = router;
