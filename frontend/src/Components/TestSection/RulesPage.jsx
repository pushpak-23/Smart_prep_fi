import React, { useState } from "react";
import { Link } from "react-router-dom";
const RulesPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#fff] dark:bg-[#000] dark:text-[#fff] text-[#101010]">
      <div className="max-w-5xl mx-auto mt-12 p-8 border rounded-lg shadow-lg bg-[#fff] dark:bg-[#303030] dark:text-[#fff] text-[#101010]">
        <h1 className="text-3xl mb-4 text-center justify-center dark:text-[#fff] text-[#101010]">
          Assessment Rules
        </h1>
        <p className="mb-6 text-purple-500">
          Welcome to the assessment! Please read the rules and instructions
          carefully before starting the test.
        </p>

        <div className="mb-8">
          <h2 className="text-xl mb-2">Test Structure:</h2>
          <ul className="mb-4">
            <li>Aptitude Section: 30 questions (60 minutes)</li>
            <li>Logical Section: 30 questions (60 minutes)</li>
            <li>
              Coding Section: 2 questions (Choose from Java, Python, C++) - 60
              minutes total
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-2">Instructions:</h2>
          <ul className="mb-4 list-disc">
            <li>
              Ensure fast access to Internet or you won't get questions and will
              waste time.
            </li>
            <li>Once started, the test cannot be paused or resumed.</li>
            <li>
              For coding questions, you will have a designated text editor for
              typing your code.
            </li>
            <li>
              You have unlimited time, but it still counts to your final
              prediction, so Hurry Up!
            </li>
            <li>
              Remember, You are being recorded, so don't even try to cheat.
            </li>
            <li>
              A desktop or laptop computer with a modern web browser (Chrome,
              Firefox, Safari, Edge, We dont wanna add support for other
              browsers).
            </li>
            <li>Ensure that JavaScript is enabled in your browser settings.</li>
            <li>
              Webcam access is required for proctoring purposes, so give us a
              smile.
            </li>
          </ul>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="form-checkbox mr-2"
            id="readEverything"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="readEverything">Ya Ya, I've Got It</label>
        </div>
        {/* Conditionally render the link to proceed to the test */}
        {isChecked && (
          <Link
            to="/test"
            className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 text-white px-4 py-2 rounded w-full"
          >
            Proceed to Test
          </Link>
        )}
      </div>
    </div>
  );
};

export default RulesPage;
