const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// Protected Super Admin Dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the Super Admin Dashboard!",
    admin: req.admin,
  });
});

// Super Admin CRUD
router.post("/create-admins", createAdmin);
router.get("/retrieve-admins", getAdmins);
router.put("/update-admins/:id", updateAdmin);
router.delete("/delete-admins/:id", deleteAdmin);

module.exports = router;
