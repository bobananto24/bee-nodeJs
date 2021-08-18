var mongoose = require("mongoose");
const TitleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
  },
});

module.exports = new mongoose.model("Title", TitleSchema);
