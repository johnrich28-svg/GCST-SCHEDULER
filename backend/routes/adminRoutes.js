const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
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
router.put("/update-admins/:_id", updateAdmin);
router.delete("/delete-admins/:_id", deleteAdmin);
router.patch("/toggle-admin-status/:_id", toggleAdminStatus);

module.exports = router;
