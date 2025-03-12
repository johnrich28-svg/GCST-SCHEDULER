// controllers/adminController.js
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Sequence = require("../models/Sequence");

// // Function to get the next sequence value
// const getNextSequenceValue = async (sequenceName) => {
//   const sequence = await Sequence.findOneAndUpdate(
//     { name: sequenceName },
//     { $inc: { value: 1 } },
//     { new: true, upsert: true }
//   );
//   return sequence.value;
// };

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password, name, email, status, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
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
  const adminId = req.params._id; // Use _id instead of admin_id
  console.log(`Updating admin with ID: ${adminId}`);

  try {
    const admin = await Admin.findById(adminId); // Find by MongoDB _id
    if (!admin) {
      console.log(`Admin with ID: ${adminId} not found`);
      return res.status(404).json({ message: "Admin not found" });
    }

    let updatedData = req.body;

    // Check if password is being updated
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Find and update by MongoDB _id
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId, // Match by MongoDB _id
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log(`Admin with ID: ${adminId} updated successfully`);
    res.json({ message: "Admin updated successfully", updatedAdmin });
  } catch (err) {
    console.error(`Error updating admin with ID: ${adminId}`, err);
    res.status(500).json({ error: err.message });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { _id } = req.params; // Use _id instead of admin_id

    // Find and delete by MongoDB _id
    const deletedAdmin = await Admin.findByIdAndDelete(_id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
