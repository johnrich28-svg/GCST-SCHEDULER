const express = require("express");
const { loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Route for Super Admin login
router.post("/login", loginAdmin);

// Route to handle redirection after login
router.get("/dashboard", (req, res) => {
  const token = req.query.token; // Get token from query parameters
  if (token) {
    res.cookie("token", token, { httpOnly: true }); // Set token as an HTTP-only cookie
    res.redirect("/api/admin/dashboard"); // Redirect to admin dashboard
  } else {
    res.redirect("/login"); // Redirect to login page if no token
  }
});

module.exports = router;
