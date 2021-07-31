var mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
});

module.exports = new mongoose.model("User", UserSchema);
