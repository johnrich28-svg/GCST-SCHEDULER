const express = require("express");
const { loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Route for Super Admin login
router.post("/login", loginAdmin);

module.exports = router;
