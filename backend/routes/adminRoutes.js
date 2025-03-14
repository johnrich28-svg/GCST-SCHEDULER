const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Super Admin Dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the Super Admin Dashboard!",
    admin: req.admin,
  });
});

module.exports = router;
