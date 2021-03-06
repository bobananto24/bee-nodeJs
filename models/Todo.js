var mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  titleId: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Todo", TodoSchema);
