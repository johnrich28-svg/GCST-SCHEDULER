// controllers/adminController.js
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Sequence = require("../models/Sequence");

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
  const sequence = await Sequence.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return sequence.value;
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password, name, email, status, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminId = await getNextSequenceValue("admin_id");

    const newAdmin = await Admin.create({
      admin_id: adminId,
      username,
      password: hashedPassword,
      name,
      email,
      status,
      role,
    });

    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all admins (with search & pagination)
exports.getAdmins = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};

    const admins = await Admin.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json({ message: "Admin updated successfully", updatedAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
