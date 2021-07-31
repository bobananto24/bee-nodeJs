const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rounds = 10;
const tokenSecret = "my-shit-secret";
const middleware = require("./middleware");

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email.toUpperCase() })
    .then((user) => {
      if (!user) res.status(404).json({ message: "user not found" });
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error);
          else if (match)
            res.status(200).json({
              message: "success",
              data: {
                token: generateToken(user),
                userId: user._id,
                name: user.email,
              },
            });
          else res.status(403).json({ message: "password not match" });
        });
      }
    })
    .catch((e) => res.status(500).json(e));
});

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({
        email: req.body.email.toUpperCase(),
        password: hash,
        phone: req.body.phone,
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).json({ message: "User added successfullly" });
        })
        .catch((err) => res.status(500).json(error));
    }
  });
});
router.get("/re-auth", middleware.verify, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "7d" });
}

module.exports = router;
