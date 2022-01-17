const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentController = require("../controllers/commentController");

// GET all comments
router.get("/", commentController.getAllComments);

// GET one comment
router.get(":comment_id", commentController.getOneComment);

// POST create comment
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

// PUT update comment
router.put(
  "/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);

// DELETE delete comment
router.delete(
  "/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

module.exports = router;
