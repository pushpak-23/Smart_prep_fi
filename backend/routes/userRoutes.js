const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/adminlogin", userController.adminlogin);
router.put("/update", userController.updateUser);
router.post("/getStudents", userController.getStudents);

module.exports = router;
