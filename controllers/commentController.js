const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

// create comment
exports.createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const comment = new Comment({
      username: req.body.username,
      text: req.body.text,
      postId: req.body.postId,
    });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({
        errors: [{ message: `Comment ${req.params.comment_id} was not found` }],
      });
    }

    res.json(comment);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

// get all comments
exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { user, text } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.comment_id, {
      title,
      text,
      date,
    });

    if (!comment) {
      return res
        .status(404)
        .json({ errors: [{ message: "Comment not found" }] });
    }

    res.json({
      message: `Updated comment ${req.params.comment_id} successfully!`,
    });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.comment_id);

    if (!comment) {
      return res
        .status(404)
        .json({ errors: [{ message: "Comment not found" }] });
    }

    res.json({
      message: `Comment ${req.params.comment_id} was successfully deleted.`,
    });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};
