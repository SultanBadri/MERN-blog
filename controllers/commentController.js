const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.createComment = [
  body("user", "Empty user").trim().isLength({ min: 1 }).escape(),
  body("text", "Empty text").trim().isLength({ min: 1 }).escape,

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const { user, text } = req.body;
      const postId = req.params.postId;
      const comment = await new Comment({ user, text, postId });
      res.json(comment);
    } catch (err) {
      return next(err);
      res.status(500).send("Server error");
    }
  },
];

exports.updateComment = async (req, res, next) => {};

exports.deleteComment = async (req, res, next) => {};

exports.getOneComment = async (req, res, next) => {};

exports.getAllComments = async (req, res, next) => {};
