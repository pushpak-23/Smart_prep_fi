const mongoose = require("mongoose");

require("dotenv").config();

const studyMaterialSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  url: {
    type: String,
  },
});

const studyMaterial = mongoose.model("Study Material", studyMaterialSchema);

module.exports = studyMaterial;