const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// POST login
router.post("/login", userController.postSignUp);

module.exports = router;
