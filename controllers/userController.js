require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// get all users
exports.getUsers = (req, res, next) => {
  User.find()
    .sort([["username", "ascending"]])
    .exec((err, users) => {
      if (err) return res.json(err);
      res.json(users);
    });
};

// get a single user
exports.getUser = (req, res, user) => {
  User.findById(req.params._id, (err, user) => {
    if (err) return res.json(err);
    res.json(user);
  });
};

// post sign up
exports.postSignUp = [
  // validate sign up form
  body("username", "Username cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Confirmed password cannot be empty.").custom(
    async (value, { req }) => {
      if (value !== req.body.password) {
        return res.json("Passwords must match!");
      }
      return true;
    }
  ),

  // handle signup
  (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (user) return res.json({ message: "Username already exists." });

      try {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) console.log(err);
          User.create({ username, password: hashedPassword }, (err, user) => {
            const userObject = { _id: user._id, username: user.username };
            if (err) console.log(err);
            jwt.sign(
              userObject,
              process.env.SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) console.log(err);
                res.status(200).json({
                  token,
                  user: userObject,
                  message: "Successfully signed up.",
                });
              }
            );
          });
        });
      } catch (err) {
        return res.json(err);
        res.status(500).send("Server error");
      }
    });
  },
];

exports.postLogin = [
  // validate sign in form
  body("username", "Username cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // handle sign in
  (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: "User not found",
          user,
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(400).json({
            message: "Incorrect password",
            result,
          });
        }
        const userObject = { _id: user._id, username: user.username };
        jwt.sign(
          userObject,
          process.env.SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) console.log(err);
            res.status(200).json({
              token,
              user: userObject,
              message: "Successfully signed in.",
            });
          }
        );
      });
    });
  },
];
