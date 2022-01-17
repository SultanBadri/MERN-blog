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
      const post = await new Post({
        title,
        content,
        author: req.user._id,
        date: Date.now(),
        published,
        imageUrl,
      });
      res.json(post);
    } catch (err) {
      return next(err);
      res.status(500).send("Server error");
    }
  },
];

exports.publishPosts = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, {
      published: true,
    });

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.unpublishPosts = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, {
      published: false,
    });

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};
