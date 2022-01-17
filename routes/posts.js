const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getPosts);

module.exports = router;
