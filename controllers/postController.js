const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

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

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);

    if (!post) {
      return res.status(404).json({
        errors: [{ message: `Post ${req.params._id} was not found` }],
      });
    }

    res.json(post);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort([["date", "descending"]])
      .populate("author");

    if (!posts) {
      return res.status(404).json({ errors: [{ message: `Posts not found` }] });
    }

    res.json(posts);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.publishPost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, {
      published: true,
    });

    if (!post) {
      return res.status(404).json({ errors: [{ message: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.unpublishPost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, {
      published: false,
    });

    if (!post) {
      return res.status(404).json({ errors: [{ message: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, date, imageUrl } = req.body;
    const post = await Post.findByIdAndUpdate(req.params._id, {
      title,
      content,
      date,
      imageUrl,
    });

    if (!post) {
      return res.status(404).json({ errors: [{ message: "Post not found" }] });
    }

    res.json({ message: `Updated post ${req.params._id} successfully!` });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);

    if (!post) {
      return res.status(404).json({ errors: [{ message: "Post not found" }] });
    }

    res.json({ message: `Post ${req.params._id} was successfully deleted.` });
  } catch (err) {
    return next(err);
    res.status(500).send("Server error");
  }
};
