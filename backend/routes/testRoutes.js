const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const userController = require("../controllers/userController");

router.post("/addTest", testController.addTest, userController.updateUserMarks);
router.post("/getTests", testController.getAllTests);
router.post("/getStudentTests", testController.getStudentTests);
router.post("/adminKnowledge", testController.adminKnowledge);

module.exports = router;
