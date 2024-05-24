const express = require("express");
const router = express.Router();
const Question = require("../models/questions.js");
const compilex = require("compilex");
const options = { stats: true };
compilex.init(options);

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

// router.post("/execute", async (req, res) => {
//   const envData = { OS: "windows" };
//   const { code, language } = req.body;

//   compilex.compilePython(envData, code, function (data) {
//     res.send(data.output);
//   });
//   compilex.flush(function () {});
// });

const compileAndExecuteCpp = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    const envData = { OS: "windows", cmd: "g++" }; // or use "linux" for Linux environments
    if (input) {
      compilex.compileCPPWithInput(envData, code, input, (data) => {
        const actualOutput = data
          ? typeof data === "string"
            ? data.trim()
            : data.output?.trim() || ""
          : "";
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    } else {
      compilex.compileCPP(envData, code, (data) => {
        const actualOutput = data
          ? typeof data === "string" && data.trim() !== ""
            ? data.trim()
            : "No output"
          : "No output";
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    }
  });
};

const compileAndExecuteJava = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    const envData = { OS: "windows" }; // or add support for Linux environments
    if (input) {
      compilex.compileJavaWithInput(envData, code, input, (data) => {
        const actualOutput = data
          ? typeof data === "string"
            ? data.trim()
            : data.output?.trim() || ""
          : "";
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    } else {
      compilex.compileJava(envData, code, (data) => {
        const actualOutput = data
          ? typeof data === "string"
            ? data.trim()
            : data.output?.trim() || ""
          : "";
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    }
  });
};

const compileAndExecutePython = (code, input, expectedOutput) => {
  return new Promise((resolve) => {
    const envData = { OS: "windows" }; // or add support for Linux environments
    if (input) {
      console.log("Executing Python code with input:", code, input);
      compilex.compilePythonWithInput(envData, code, input, (data) => {
        console.log("Received data from compilePythonWithInput:", data);
        const actualOutput =
          typeof data === "string" ? data.trim() : data.output.trim();
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    } else {
      console.log("Executing Python code without input:", code);
      compilex.compilePython(envData, code, (data) => {
        console.log("Received data from compilePython:", data);
        const actualOutput =
          typeof data === "string" ? data.trim() : data.output.trim();
        resolve({
          passed: actualOutput === expectedOutput,
          actualOutput,
          expectedOutput,
        });
      });
    }
  });
};

router.post("/execute", async (req, res) => {
  console.log("Received request body:", req.body);
  const { code, language, testCases } = req.body;
  const results = [];
  const executeCode = async (lang, code, input, expectedOutput) => {
    console.log("Executing code:", code, "for language:", lang);
    switch (lang) {
      case "cpp":
        return await compileAndExecuteCpp(code, input, expectedOutput);
      case "java":
        return await compileAndExecuteJava(code, input, expectedOutput);
      case "python":
        return await compileAndExecutePython(code, input, expectedOutput);
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
    console.error(`Error executing code: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    compilex.flush(function () {});
  }
});

router.get("/hello", async (req, res) => {
  res.status(200).json({ message: "Hi there!" });
});

module.exports = router;
