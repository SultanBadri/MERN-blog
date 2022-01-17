const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getAllPosts);

// GET one post
router.get("/:id", postController.getOnePost);

// POST post
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// POST publish post
router.post(
  "/:id/publish",
  passport.authenticate("jwt", { session: false }),
  postController.publishPost
);

// POST unpublish post
router.post(
  "/:id/unpublish",
  passport.authenticate("jwt", { session: false }),
  postController.unpublishPost
);

// PUT update post
router.put(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

// DELETE delete post
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
