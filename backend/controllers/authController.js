const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Super Admin Login
 */
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirect to dashboard with token
    res.json({
      token,
      message: "Login successful",
      redirect: `/api/auth/dashboard?token=${token}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
