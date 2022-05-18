const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getUsers);

// GET user
router.get("/:id", userController.getUser);

// POST login
router.post("/login", userController.postLogin);

// POST signup
router.post("/signup", userController.postSignUp);

module.exports = router;
