import { useEffect, useState } from "react";
import Coding from "./Coding";
import ThemeToggler from "../ThemeToggler";

const MCQuestions = (props) => {
  const [allQuestions, setAllQuestions] = useState(props.questionList);
  useEffect(() => {
    setAllQuestions(props.questionList);
  }, [props.questionList]);

  const [codingQuestions, setCodingQuestions] = useState(
    props.coding_questionList
  );
  useEffect(() => {
    setCodingQuestions(props.coding_questionList);
  }, [props.coding_questionList]);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedList, setSelectedList] = useState([]);
  const [currentSection, setCurrentSection] = useState("aptitude");
  const [resultList, setResultList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  console.log(allQuestions);
  console.log(currentSection);

  const questionList = allQuestions.filter(
    (question) => question.type === currentSection
  );

  const correctOptions = questionList
    .map((question) => question.options.find((option) => option.isCorrect))
    .map((correctOption) => correctOption.label);

  const selectOption = (option) => {
    const newSelectedList = [...selectedList];
    newSelectedList[questionIdx] = option;
    setSelectedList(newSelectedList);
    console.log(newSelectedList);
    console.log(questionList);
  };

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

  const nextQuestion = () => {
    setQuestionIdx(questionIdx + 1);
    if (selectedList[questionIdx]) {
      setAnsweredQuestions([...answeredQuestions, questionIdx]);
    }
  };

  const previousQuestion = () => {
    setQuestionIdx(questionIdx - 1);
  };

  const nextSection = () => {
    const correctCount = correctOptions.filter((correctOption, index) => {
      const selectedOption = selectedList[index];
      return correctOption === selectedOption;
    }).length;

    setResultList([...resultList, correctCount / questionList.length]);
    setTimeList([...timeList, hours * 60 + minutes + seconds / 60]);
    if (currentSection === "aptitude") {
      setQuestionIdx(0);
      setCurrentSection("logical");
      setSelectedList([]);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setAnsweredQuestions([]);
      setReviewedQuestions([]);
    } else if (currentSection === "logical") {
      setCurrentSection("coding");
    } else {
      alert(JSON.stringify(resultList));
      alert(JSON.stringify(timeList));
    }
  };

  const changeQuestion = (index) => {
    setQuestionIdx(index - 1);
  };

  const markReview = (questionIndex) => {
    setReviewedQuestions([...reviewedQuestions, questionIndex]);
    console.log("Reviewed Questions:", reviewedQuestions);
    nextQuestion();
  };

  const confirmAnswer = (questionIndex) => {
    const updatedReviewedQuestions = reviewedQuestions.filter(
      (index) => index !== questionIndex
    );
    setReviewedQuestions(updatedReviewedQuestions);
    console.log("Confirmed Answers:", selectedList[questionIndex]);
    nextQuestion();
  };

  const unmarkReview = (questionIndex) => {
    const updatedReviewedQuestions = reviewedQuestions.filter(
      (index) => index !== questionIndex
    );
    setReviewedQuestions(updatedReviewedQuestions);
    console.log("Unmarked Review:", reviewedQuestions);
  };

  if (currentSection !== "coding") {
    return (
      <div className="flex flex-col min-h-screen dark:bg-darkBg2 bg-whiteBg2">
        <div className="dark:bg-darkBg bg-whiteBg rounded-lg border-b-2 border-purple-500 py-3 mb-4 flex justify-between items-center">
          <div></div>
          <div className="bg-purple-500 rounded-md p-2 text-lg text-white cursor-no-drop">
            {`${hours < 10 ? "0" + hours : hours}:${
              minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`}
          </div>
          <ThemeToggler />
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 overflow-y-auto">
          <div className="col-span-12 sm:col-span-8 md:col-span-9 lg:col-span-8 dark:bg-darkBg bg-whiteBg rounded-lg border-2 border-purple-500 p-3">
            <p className="text-center dark:text-textW text-textB text-xl border-b-2 border-purple-600 dark:bg-darkBg2 bg-whiteBg2 rounded-lg p-2">
              Question Number: {questionIdx + 1}
            </p>
            <div className="rounded-lg dark:bg-darkBg2 bg-whiteBg2 p-4 m-3 overflow-auto border-l-2 border-b-2 border-purple-500">
              <p className="text-xl dark:text-textW text-textB cursor-no-drop">
                {questionList[questionIdx]?.text}
              </p>
              <ul className="options-list dark:text-textW text-textB">
                {questionList[questionIdx]?.options.map((option) => (
                  <li
                    key={option.id}
                    className="option-item dark:bg-purple-700 bg-purple-300 rounded-xl p-2 "
                    style={{ marginTop: "30px" }}
                  >
                    <label
                      htmlFor={option.id}
                      className="label cursor-pointer flex items-center"
                    >
                      <input
                        type="radio"
                        id={option.label}
                        name={`question-${questionList[questionIdx]?.label}`}
                        checked={selectedList[questionIdx] === option.label}
                        onChange={() => selectOption(option.label)}
                        className={`radio checked:bg-${option.color}-500 mr-2 `}
                      />
                      <span className="label-text font-medium">
                        {option.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 
          justify-center align-middle dark:bg-darkBg bg-whiteBg rounded-lg border-2
           border-purple-400 p-3"
          >
            <p className="text-xl dark:text-textW text-textB text-center border-b-2 border-purple-500 dark:bg-darkBg2 bg-whiteBg2  rounded-lg p-2">
              Quick Navigation
            </p>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {questionList.map((question, index) => (
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-full font-medium cursor-pointer hover:scale-110 hover:brightness-110 hover:animate-pulse ${
                    reviewedQuestions.includes(index)
                      ? "bg-yellow-500 dark:bg-yellow-400 text-textB dark:text-textW"
                      : answeredQuestions.includes(index)
                      ? "bg-green-500 dark:bg-green-400 text-textB dark:text-textW"
                      : "bg-purple-200 dark:bg-purple-800 text-textB dark:text-textW"
                  }`}
                  key={index}
                  onClick={() => changeQuestion(index + 1)}
                >
                  Q{index + 1}
                </div>
              ))}
            </div>
            <div className="text-center justify-center align-middle mt-5">
              <div className="px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border mt-3 text-xl text-textW cursor-pointer">
                <button onClick={nextSection}>
                  <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                    {questionList[questionIdx]?.type === "aptitude"
                      ? "Go to Logical"
                      : questionList[questionIdx]?.type === "logical"
                      ? "Go to Technical"
                      : questionList[questionIdx]?.type === "coding"
                      ? "Go to Coding"
                      : "Submit"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent text-lg font-semibold rounded-lg p-3 mb-0 fixed bottom-0 left-0 w-full z-10">
          <div className="flex justify-center space-x-4">
            <button
              className="rounded-full px-4 py-2 mb-0 border-2 border-blue-700 bg-blue-500 hover:bg-blue-400 dark:text-textW text-textB transition-colors duration-300"
              onClick={previousQuestion}
              disabled={questionIdx === 0}
            >
              Previous
            </button>
            <button
              className={`rounded-full px-4 py-2 mb-0 ${
                reviewedQuestions.includes(questionIdx)
                  ? "bg-orange-500 hover:bg-orange-400 border-2"
                  : "bg-fuchsia-500 hover:bg-fuchsia-400"
              } dark:text-textW text-textB transition-colors duration-300`}
              onClick={() =>
                reviewedQuestions.includes(questionIdx)
                  ? unmarkReview(questionIdx)
                  : markReview(questionIdx)
              }
            >
              {reviewedQuestions.includes(questionIdx)
                ? "Unmark"
                : "Review Later"}
            </button>
            <button
              className="rounded-full px-4 py-2 mb-0 bg-green-500 border-2 border-green-800 hover:bg-green-400 dark:text-textW text-textB transition-colors duration-300"
              onClick={() => confirmAnswer(questionIdx)}
              disabled={!selectedList[questionIdx]}
            >
              Confirm Answer
            </button>
            <button
              className="rounded-full px-4 py-2 mb-0 bg-gray-500 hover:bg-gray-400 border-2 border-gray-700 dark:text-textW text-textB transition-colors duration-300"
              onClick={() => unmarkReview(questionIdx)}
              disabled={!reviewedQuestions.includes(questionIdx)}
            >
              Unmark
            </button>
            <button
              className="rounded-full px-4 py-2 mb-0 bg-purple-700 border-2 border-purple-800 hover:bg-purple-400 dark:text-textW text-textB hover:text-fuchsia-500 transition-colors duration-300"
              onClick={nextQuestion}
              disabled={questionIdx === questionList.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Coding
        coding_questionList={codingQuestions}
        resultList={resultList}
        timeList={timeList}
        videoRef={props.videoRef}
        intervalRef={props.intervalRef}
        images={props.images}
      />
    );
  }
};

export default MCQuestions;
