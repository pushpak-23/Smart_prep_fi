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
          Assessment Rules and Instructions
        </h1>
        <p className="mb-6 text-purple-500 text-xl">
          Welcome to the assessment! Please read the rules and instructions
          carefully before commencing the test.
        </p>

        <div className="mb-8">
          <h2 className="text-xl mb-2">Test Structure:</h2>
          <ul className="mb-4 list-disc list-inside">
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
          <ul className="mb-4 list-disc list-inside">
            <li>
              Ensure a stable and fast internet connection to avoid delays or
              disruptions.
            </li>
            <li>Once started, the test cannot be paused or resumed.</li>
            <li>
              For coding questions, you will have access to a designated text
              editor.
            </li>
            <li>
              The test has a limited duration; manage your time wisely to
              complete all sections.
            </li>
            <li>
              You are under surveillance throughout the test; any form of
              cheating will be recorded and reported.
            </li>
            <li>
              Use a desktop or laptop computer with a modern web browser
              (Chrome, Firefox, Safari, or Edge). Other browsers are not
              supported.
            </li>
            <li>Ensure that JavaScript is enabled in your browser settings.</li>
            <li>
              Webcam access is required for proctoring purposes. Make sure your
              webcam is functioning properly.
            </li>
            <li>Make sure you are in a quiet and well-lit environment.</li>
            <li>
              Close all other applications and browser tabs to prevent
              distractions and technical issues.
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
          <label htmlFor="readEverything">
            I have read and understood all the rules and instructions, and I am
            ready to proceed.
          </label>
        </div>

        <div className=" justify-center ">
          {/* Conditionally render the link to proceed to the test */}
          {isChecked && (
            <Link
              to="/test"
              className="bg-green-500 hover:bg-green-700
              text-white px-4 py-2 rounded w-full text-center"
            >
              Start Test
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
