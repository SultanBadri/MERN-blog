const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort([["date", "descending"]])
      .populate("author");
    res.json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.createPost = [
  // validate create post forms
  body("title", "No title").trim().isLength({ min: 1 }).escape(),
  body("content", "No content").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      const { title, content, published, imageUrl } = req.body;
      const newPost = {
        title,
        content,
        author: req.user._id,
        date: Date.now(),
        published,
        imageUrl,
      };
      Post.create(newPost, (err, post) => {
        if (err) return next(err);
        post.populate("author", (err, newPost) => {
          if (err) return next(err);
          res.json(newPost);
        });
      });
    } catch (err) {
      return next(err);
    }
  },
];

exports.publishPosts = async (req, res, next) => {};
