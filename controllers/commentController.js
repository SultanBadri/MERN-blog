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
      const comment = await new Comment({
        user,
        text,
        postId: req.params.postId,
      });
      res.json(comment);
    } catch (err) {
      return next(err);
      res.status(500).send("Server error");
    }
  },
];

exports.getOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        errors: [{ message: `Comment ${req.params.commentId} was not found` }],
      });
    }

    res.json(comment);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const allComments = await Comment.find().sort([["date", "descending"]]);
    const commentsUnderPost = allComments.filter(
      (comment) => comment.postId === req.params.postId
    );

    if (!commentsUnderPost) {
      return res
        .status(404)
        .json({ errors: [{ message: `Comments not found` }] });
    }

    res.json(commentsUnderPost);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { user, text } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
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
      message: `Updated comment ${req.params.commentId} successfully!`,
    });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ errors: [{ message: "Comment not found" }] });
    }

    res.json({
      message: `Comment ${req.params.commentId} was successfully deleted.`,
    });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};
