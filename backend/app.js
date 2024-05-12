const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const questionController = require("./controllers/questionController"); // assuming your controller file is named questionsController.js
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "SmartPrep",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionController); // use the questionsController for handling routes related to questions
app.use("/api/test", testRoutes);
// Shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
  console.log("Hello World");
});
