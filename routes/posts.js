const express = require("express");
const router = express.Router();
const verifyToken = require("../config/verifyToken");
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getAllPosts);

// GET one post
router.get("/:post_id", postController.getOnePost);

// POST post
router.post("/create", verifyToken, postController.createPost);

// POST publish post
router.post("/:post_id/publish", verifyToken, postController.publishPost);

// POST unpublish post
router.post("/:post_id/unpublish", verifyToken, postController.unpublishPost);

// PUT update post
router.put("/:post_id/update", verifyToken, postController.updatePost);

// DELETE delete post
router.delete("/:post_id/delete", verifyToken, postController.deletePost);

module.exports = router;
