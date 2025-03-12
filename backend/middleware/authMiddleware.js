const jwt = require("jsonwebtoken");

// Middleware function to authenticate requests
exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." }); // If no token, return 401 Unauthorized
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""), // Remove 'Bearer ' prefix from token
      process.env.JWT_SECRET // Verify token using secret key
    );
    req.admin = decoded; // Attach admin info to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" }); // If token is invalid, return 400 Bad Request
  }
};
