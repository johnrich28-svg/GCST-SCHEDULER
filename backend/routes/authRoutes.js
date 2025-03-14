const express = require("express");
const { loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Route for Super Admin login
router.post("/login", loginAdmin);

// Route to handle redirection after login
router.get("/dashboard", (req, res) => {
  const token = req.query.token;
  if (token) {
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/api/admin/dashboard");
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
