const express = require("express");
const router = express.Router();
const verifyToken = require("../config/verifyToken");
const commentController = require("../controllers/commentController");

// GET all comments
router.get("/", commentController.getAllComments);

// GET one comment
router.get("/:comment_id", commentController.getOneComment);

// POST create comment
router.post("/create", verifyToken, commentController.createComment);

// PUT update comment
router.put("/:comment_id/update", verifyToken, commentController.updateComment);

// DELETE delete comment
router.delete(
  "/:comment_id/delete",
  verifyToken,
  commentController.deleteComment
);

module.exports = router;
