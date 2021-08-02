const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const middleware = require("./middleware");

router.post("/addTodo/:userId", middleware.verify, async (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    userId: req.params.userId,
    time: new Date(),
  });
  try {
    const todo = await newTodo.save();
    res.status(200).json({ data: todo });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/listTodo/:userId", middleware.verify, async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.params.userId });
    res.status(200).json({ data: todo });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/deleteTodo/:todoId", middleware.verify, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});
router.patch("/updateTodo/:todoId", middleware.verify, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    todo.completed = req.body.completed;
    const savedTodo = await todo.save();
    res.status(200).json({ data: savedTodo });
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
