const testHistory = require("../models/testHistory");
const User = require("../models/user");

exports.addTest = async (req, res, next) => {
  try {
    const { email, aptitude_marks, logical_marks, technical_marks } = req.body;

    const user = await User.findOne({ email: email });
    const name = user.name;
    const test = new testHistory({
      email,
      name,
      aptitude_marks,
      logical_marks,
      technical_marks,
    });

    await test.save();
    next(); // Call next to pass control to the next middleware (userController.updateUserMarks)
  } catch (err) {
    res.status(500).json({ error: err.message, signup: false });
  }
};

exports.getAllTests = async (req, res) => {
  try {
    const tests = await testHistory.find();

    res.status(201).json({ test: tests, test_returned: true });
  } catch (err) {
    res.status(500).json({ error: err.message, signup: false });
  }
};

exports.getStudentTests = async (req, res) => {
  try {
    const email = req.body.email;

    const tests = await testHistory.find({ email: email });

    res.status(201).json({ test: tests, test_returned: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      signup: false,
      message: "Student not found",
    });
  }
};

exports.adminKnowledge = async (req, res) => {
  try {
    // Fetch the top 10 most recent tests in descending order of test_date
    const tests = await testHistory
      .find()
      .sort({ test_date: -1 }) // Sort by test_date in descending order
      .limit(10); // Limit to 10 results

    const students = await User.countDocuments({ isAdmin: false });

    const testCount = await testHistory.countDocuments();

    const admins = await User.countDocuments({ isAdmin: true });

    res.status(200).json({
      tests: tests,
      test_returned: true,
      studentCount: students,
      adminCount: admins,
      testCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, test_returned: false });
  }
};
