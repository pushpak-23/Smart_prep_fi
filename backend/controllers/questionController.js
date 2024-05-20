const express = require("express");
const router = express.Router();
const Question = require("../models/questions.js");
const { exec } = require("child_process");

router.post("/add", async (req, res) => {
  try {
    const questionData = req.body;

    const question = new Question(questionData);

    await question.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addList", async (req, res) => {
  try {
    const questionsData = req.body;
    const questionsToInsert = questionsData.map((question) => {
      question.type = question.type || "aptitude";
      return question;
    });
    await Question.insertMany(questionsToInsert);

    res.status(201).json({ message: "Questions added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getQuestions", async (req, res) => {
  try {
    const aptitude = await Question.aggregate([
      { $match: { type: "aptitude" } },
      { $sample: { size: 30 } },
    ]);
    const verbal = await Question.aggregate([
      { $match: { type: "logical" } },
      { $sample: { size: 30 } },
    ]);
    const technical = await Question.aggregate([
      { $match: { type: "aptitude" } },
      { $sample: { size: 0 } },
    ]);

    const questions = [...aptitude, ...technical, ...verbal];

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/aptiNumber", async function (req, res) {
  try {
    await Question.updateMany(
      { type: "geometry" },
      { $set: { type: "aptitude" } }
    );

    const apti = await Question.aggregate([{ $match: { type: "aptitude" } }]);
    res.json(apti.length);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const executePython = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    const fs = require("fs");
    fs.writeFileSync("script.py", code); // Write the Python code to a temporary file

    const { exec } = require("child_process");
    // Execute the Python code
    if (input) {
      const process = exec("python script.py", (execErr, stdout, stderr) => {
        if (execErr) {
          resolve({
            passed: false,
            actualOutput: "Execution Error: " + execErr,
            expectedOutput,
          });
        } else {
          const actualOutput = stdout.trim();
          resolve({
            passed: actualOutput === expectedOutput,
            actualOutput,
            expectedOutput,
          });
        }
      });
      process.stdin.write(input);
      process.stdin.end();
    } else {
      const process = exec("python script.py", (execErr, stdout, stderr) => {
        if (execErr) {
          resolve({
            passed: false,
            actualOutput: "Execution Error: " + execErr,
            expectedOutput,
          });
        } else {
          const actualOutput = stdout.trim();
          resolve({
            passed: actualOutput === expectedOutput,
            actualOutput,
            expectedOutput,
          });
        }
      });
    }
  });
};

const executeCpp = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    // Write the C++ code to a temporary file
    const fs = require("fs");
    fs.writeFileSync("main.cpp", code);

    // Compile the C++ code
    const { exec } = require("child_process");
    exec("g++ main.cpp -o main", (compileErr, compileStdout, compileStderr) => {
      if (compileErr) {
        resolve({
          passed: false,
          actualOutput: "Compilation Error: " + compileStderr,
          expectedOutput,
        });
      } else {
        // Execute the compiled C++ code
        if (input) {
          const process = exec("./main", (execErr, stdout, stderr) => {
            if (execErr) {
              resolve({
                passed: false,
                actualOutput: "Execution Error: " + stderr,
                expectedOutput,
              });
            } else {
              const actualOutput = stdout.trim();
              resolve({
                passed: actualOutput === expectedOutput,
                actualOutput,
                expectedOutput,
              });
            }
          });
          process.stdin.write(input);
          process.stdin.end();
        } else {
          const process = exec("./main", (execErr, stdout, stderr) => {
            if (execErr) {
              resolve({
                passed: false,
                actualOutput: "Execution Error: " + stderr,
                expectedOutput,
              });
            } else {
              const actualOutput = stdout.trim();
              resolve({
                passed: actualOutput === expectedOutput,
                actualOutput,
                expectedOutput,
              });
            }
          });
        }
      }
    });
  });
};

const executeJava = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    // Write the Java code to a temporary file
    const fs = require("fs");
    fs.writeFileSync("Main.java", code);

    // Compile the Java code
    const { exec } = require("child_process");
    exec("javac Main.java", (compileErr, compileStdout, compileStderr) => {
      if (compileErr) {
        resolve({
          passed: false,
          actualOutput: "Compilation Error: " + compileErr,
          expectedOutput,
        });
      } else {
        // Execute the compiled Java code
        if (input) {
          const process = exec("java Main", (execErr, stdout, stderr) => {
            if (execErr) {
              resolve({
                passed: false,
                actualOutput: "Execution Error: " + execErr,
                expectedOutput,
              });
            } else {
              const actualOutput = stdout.trim();
              resolve({
                passed: actualOutput === expectedOutput,
                actualOutput,
                expectedOutput,
              });
            }
          });
          process.stdin.write(input);
          process.stdin.end();
        } else {
          const process = exec("java Main", (execErr, stdout, stderr) => {
            if (execErr) {
              resolve({
                passed: false,
                actualOutput: "Execution Error: " + execErr,
                expectedOutput,
              });
            } else {
              const actualOutput = stdout.trim();
              resolve({
                passed: actualOutput === expectedOutput,
                actualOutput,
                expectedOutput,
              });
            }
          });
        }
      }
    });
  });
};

router.post("/execute", async (req, res) => {
  console.log("Received request body:", req.body);
  const { code, language, testCases } = req.body;
  const results = [];
  const executeCode = async (lang, code, input, expectedOutput) => {
    console.log("Executing code:", code, "for language:", lang);
    switch (lang) {
      case "java":
        return await executeJava(code, input, expectedOutput);
      case "python":
        return await executePython(code, input, expectedOutput);
      case "cpp":
        return await executeCpp(code, input, expectedOutput);
      default:
        throw new Error(`Unsupported language: ${lang}`);
    }
  };

  try {
    await Promise.all(
      testCases.map(async (testCase, index) => {
        const { input, expectedOutput } = testCase;
        console.log(
          "Executing test case",
          index + 1,
          "with input:",
          input,
          "and expected output:",
          expectedOutput
        );
        const actualOutput = await executeCode(
          language,
          code,
          input,
          expectedOutput
        );
        console.log("Test case result:", actualOutput);
        const passed = actualOutput.passed;

        results.push({
          input,
          expectedOutput,
          actualOutput,
          passed,
        });
      })
    );

    console.log("All test cases executed. Results:", results);
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

router.get("/hello", async (req, res) => {
  res.status(200).json({ message: "Hi there!" });
});

module.exports = router;
