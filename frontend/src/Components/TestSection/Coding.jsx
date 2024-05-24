import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { Dropdown } from "flowbite-react";
import Timer from "../Timer";
import ThemeToggler from "../ThemeToggler";
export default function Coding({
  coding_questionList,
  resultList,
  timeList,
  videoRef,
  intervalRef,
  images,
}) {
  const navigate = useNavigate();

  const [output, setOutput] = useState([]);
  const [res, setRes] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [myCode, setMyCode] = useState("print('Hello world')");
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    setMyCode(getDefaultCode(language));
  }, [language]);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            } else {
              return prevMinutes + 1;
            }
          });
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Updated resultList: ", resultList);
  }, [resultList]);

  useEffect(() => {
    console.log("Updated timeList: ", timeList);
  }, [timeList]);

  const nextQuestioncoding = () => {
    if (questionIdx < coding_questionList.length - 1) {
      setQuestionIdx((prevIdx) => prevIdx + 1);
    } else {
      console.log("Already on the last question.");
    }
  };

  const previousQuestionCoding = () => {
    if (questionIdx > 0) {
      setQuestionIdx((prevIdx) => prevIdx - 1);
    } else {
      console.log("Already on the first question.");
    }
  };

  const runCode = async () => {
    try {
      const testCases = coding_questionList[questionIdx]?.testcases;
      const response = await fetch(
        "http://localhost:3001/api/questions/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: myCode,
            language,
            testCases,
          }),
        }
      );

      if (!response.ok) {
        alert("Code execution failed");
      }

      const result = await response.json();

      setOutput(result.results.map((result) => result.passed));
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Code execution failed: " + error.message);
    }
  };

  const getDefaultCode = (lang) => {
    switch (lang) {
      case "cpp":
        return "#include <iostream>\nint main() {\n\treturn 0;\n}";
      case "python":
        return "print('Hello world')";
      case "java":
        return "import java.util.*;\npublic class Main{\npublic static void main(String[] args){\n\n\tScanner sc = new Scanner(System.in);\n\t}\n}";
      default:
        return "";
    }
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const submitIt = async () => {
    try {
      const testCases = coding_questionList[questionIdx]?.testcases;
      const response = await fetch(
        "http://localhost:3001/api/questions/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: myCode,
            language,
            testCases,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Code execution failed");
      }

      const result = await response.json();
      const allPassed = result.results.every(
        (testCaseResult) => testCaseResult.passed
      );

      if (allPassed) {
        setRes((prevRes) => prevRes + 1);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Code execution failed: " + error.message);
    }

    setSubmittedQuestions((prevSubmittedQuestions) => [
      ...prevSubmittedQuestions,
      questionIdx,
    ]);
  };

  const stopRecording = () => {
  // Pause the video
  videoRef.current.pause();

  // Stop the webcam capture
  const stream = videoRef.current.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  // Convert images to data URLs
  const imagesData = images.map((image) => image.canvas.toDataURL());
  console.log(imagesData);

  // Clear the interval
  clearInterval(intervalRef.current);

  // Return imagesData
  return imagesData;
};

const testSubmit = () => {
  const totalTime = hours * 60 + minutes + seconds / 60;
  const updatedResultList = [...resultList, res / coding_questionList.length];
  const updatedTimeList = [...timeList, totalTime];

  console.log("resultList ", updatedResultList);
  console.log("timeList ", updatedTimeList);
  
  // Stop recording and get imagesData
  const imagesData = stopRecording();

  const moveon = window.confirm("Submit Test?");
  if (moveon) {
    navigate("/result", {
      state: { resultList: updatedResultList, timeList: updatedTimeList, imagesData: imagesData },
    });
  }
};


  return (
    <>
      <div className="flex flex-col h-screen dark:bg-darkBg2 bg-whiteBg2">
        {/* Header */}

        <div
          className="dark:bg-darkBg bg-whiteBg rounded-lg border-b-2 border-purple-500 py-3 mb-4
         flex justify-between items-center"
        >
          <div></div> {/* Empty div to push the timer to the center */}
          <div className="mx-3 bg-purple-500">
            <Dropdown
              label={language}
              dismissOnClick={false}
              className="dark:bg-darkBg2 bg-whiteBg2 text-fuchsia-500 border-2 border-purple-500"
            >
              <p className=" dark:text-textW text-textB text-center text-lg">
                Language
              </p>
              <Dropdown.Item
                onClick={() => handleLanguageChange("cpp")}
                data-language="C++"
                className=" dark:text-textW text-textB"
              >
                C++
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleLanguageChange("python")}
                data-language="Python"
                className=" dark:text-textW text-textB"
              >
                Python
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleLanguageChange("java")}
                data-language="Java"
                className=" dark:text-textW text-textB"
              >
                Java
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex-1 flex justify-center">
            <Timer />
          </div>
          <div>
            <ThemeToggler />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 overflow-y-auto">
          {/* left container */}
          <div className="col-span-12 sm:col-span-4 dark:bg-darkBg bg-whiteBg rounded-lg border-2 border-purple-500 p-3 ml-3">
            <p
              className="text-xl text-center dark:bg-darkBg2 bg-whiteBg2 border-b-2 border-purple-500
             dark:text-textW text-textB rounded-lg p-2"
            >
              Question:
            </p>
            <br />
            <div className="rounded-lg dark:bg-darkBg2 bg-whiteBg2 border-l-2 border-r-2 border-purple-500 p-4 m-3 overflow-auto">
              <p className="text-xl dark:text-textW text-textB">
                {coding_questionList[questionIdx]?.text}
              </p>
            </div>
            <div className="mx-5 p-3 ">
              <button
                className="rounded-full mt-5 px-4 py-2 mb-0 mr-5 font-normal border-2 border-blue-700 bg-blue-500 hover:bg-blue-400 dark:text-textW text-textB transition-colors duration-300"
                id="runCode"
                onClick={previousQuestionCoding}
              >
                Previous
              </button>
              <button
                className="rounded-full px-4 py-2 mb-0 font-normal mt-5 bg-purple-700 border-2 border-purple-800 hover:bg-purple-400 dark:text-textW text-textB hover:text-fuchsia-500 transition-colors duration-300"
                id="runTestScenario"
                onClick={nextQuestioncoding}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 dark:bg-darkBg2 bg-whiteBg2 rounded-lg border-2 ml-3 border-purple-500 p-3">
            <div className="rounded-md">
              <CodeMirror
                value={myCode}
                onChange={(newValue) => setMyCode(newValue)}
                style={{ fontSize: "16px" }}
                theme={okaidia}
                height="300px"
                extensions={[
                  language === "cpp"
                    ? cpp()
                    : language === "python"
                    ? python()
                    : language === "java"
                    ? java()
                    : null,
                ]}
              />
            </div>

            <div className="mx-5 p-3 ">
              <button
                className="bg-gradient-to-r from-yellow-200 to-green-500 hover:from-green-500 hover:to-yellow-200 text-white 
                font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500
                 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                id="runCode"
                onClick={runCode}
                style={{
                  backgroundColor: submittedQuestions.includes(questionIdx)
                    ? "#e5e5e5"
                    : "",
                  color: submittedQuestions.includes(questionIdx)
                    ? "#999999"
                    : "",
                }}
                disabled={submittedQuestions.includes(questionIdx)}
              >
                Run
              </button>
              <button
                className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-blue-500 hover:to-sky-400 text-white 
                font-bold ml-3 mr-3 py-3 px-6 rounded-full shadow-lg transform transition-all duration-500
                 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                id="runTestScenario"
                onClick={submitIt}
                style={{
                  backgroundColor: submittedQuestions.includes(questionIdx)
                    ? "#e5e5e5"
                    : "",
                  color: submittedQuestions.includes(questionIdx)
                    ? "#999999"
                    : "",
                }}
                disabled={submittedQuestions.includes(questionIdx)}
              >
                Submit Code
              </button>
              <button
                className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white 
                font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500
                 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                id="submitCode"
                onClick={testSubmit}
              >
                Submit Test
              </button>
            </div>

            <div className="output ">
              <h2>Output:</h2>
              <div id="outputResult">
                {output.map((passed, index) => (
                  <div key={index}>
                    <p>
                      Testcase {index + 1}: {passed ? "✔" : "❌"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
