require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.postSignUp = [
  // validate sign up form
  body("username", "Username cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be at least 5 characters long.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body(
    "confirmPassword",
    "Password must be at least 5 characters long."
  ).custom(async (value, { req }) => {
    if (value !== req.body.password) {
      return next("Passwords must match!");
    }
    return true;
  }),

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
              { expiresIn: "60m" },
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
        return next(err);
        res.status(500).send("Server error");
      }
    });
  },
];

exports.getLogin = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Incorrect Username or Password",
        user,
      });
    }

    jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: "60m" },
      (err, token) => {
        if (err) return res.status(400).json(err);
        res.json({
          token: token,
          user: { _id: user._id, username: user.username },
        });
      }
    );
  })(req, res);
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.getUser = async (req, res, user) => {
  await User.findOne({ _id: req.params._id }, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};
