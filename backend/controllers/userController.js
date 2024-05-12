const User = require("../models/user");
const bcrypt = require("bcrypt");
const testHistory = require("../models/testHistory");

exports.register = async (req, res) => {
  try {
    const { name, email, password, number, isAdmin } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_ROUNDS)
    );

    const user = new User({
      name,
      email,
      number,
      password: hashedPassword,
      isAdmin: false,
    });

    await user.save();
    res.status(201).json({ user: user, signup: true });
  } catch (error) {
    res.status(500).json({ error: error.message, signup: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", login: false });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", login: false, user });
    }

    const tests = await testHistory.find({ email: email });

    res.status(200).json({ user: user, tests: tests, login: true });
  } catch (error) {
    res.status(500).json({ error: error.message, login: false });
  }
};

exports.adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", login: false });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", login: false });
    }

    // Check if user is admin and isAdmin flag is true
    if (user.isAdmin) {
      // User is admin
      return res.status(200).json({
        user: user,
        login: true,
        dbadmin: user.isAdmin,
      });
    } else {
      // User is not admin
      return res
        .status(401)
        .json({ message: "User not an Admin", login: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, new_email, name, max_marks, number } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.email = new_email || user.email;
    user.name = name || user.name;
    user.max_marks = max_marks || user.max_marks;
    user.number = number || user.number;

    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserMarks = async (req, res) => {
  try {
    const { email, aptitude_marks, logical_marks, technical_marks } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's maximum marks and tests taken
    user.max_apti_marks = Math.max(
      user.max_apti_marks || 0,
      aptitude_marks || 0
    );
    user.max_logi_marks = Math.max(
      user.max_logi_marks || 0,
      logical_marks || 0
    );
    user.max_techni_marks = Math.max(
      user.max_techni_marks || 0,
      technical_marks || 0
    );
    user.testsTaken = (user.testsTaken || 0) + 1;

    // Save the updated user document
    await user.save();

    // Respond with success message
    res
      .status(200)
      .json({ user: user, message: "User marks updated successfully" });
  } catch (error) {
    // Handle database errors or other exceptions
    console.error(error);
    res.status(500).json({ error: "Failed to update user marks" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const userList = await User.find({ isAdmin: false });
    res.status(200).json({ students: userList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get students" });
  }
};
