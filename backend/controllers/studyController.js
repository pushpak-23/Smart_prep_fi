const studyMaterial = require("../models/studymaterial");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { text, url } = req.body;

    const studyMat = new studyMaterial({ text, url });

    await studyMat.save();

    const allMaterials = await studyMaterial.find();
    const totalStudyMaterials = await studyMaterial.countDocuments();
    res.status(201).json({
      message: "StudyMaterial added " + totalStudyMaterials,
      studyMaterial: allMaterials,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, login: false });
  }
});

router.post("/getStudyMaterial", async (req, res) => {
  try {
    const allStudyMaterial = await studyMaterial.find();
    res
      .status(200)
      .json({
        studyMaterial: allStudyMaterial,
        message: "Study Material found",
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;