import React, { useState } from "react";
import Header from "./Header";

const AddQuestionForm = () => {
  const [questionData, setQuestionData] = useState({
    id: "",
    img: "",
    type: "",
    subtype: "",
    text: "",
    options: [],
    testcases: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, e) => {
    const { name, value, type } = e.target;
    const updatedOptions = [...questionData.options];
    // For radio button, the value should be boolean
    updatedOptions[index][name] = type === "radio" ? true : value;
    setQuestionData((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  const handleAddOption = () => {
    if (questionData.options.length < 4) {
      setQuestionData((prevState) => ({
        ...prevState,
        options: [
          ...prevState.options,
          {
            id: prevState.options.length + 1,
            label: String.fromCharCode(65 + prevState.options.length),
            text: "",
            isCorrect: false,
          },
        ],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  return (
    <div className="w-full flex flex-col overflow-y-auto scrollbar-none">
      <Header />
      <div className="px-10 py-5">
        <form
          onSubmit={handleSubmit}
          className="bg-whiteBg dark:bg-darkBg shadow-md rounded px-5 py-3 "
        >
          <div className="mb-4">
            <label
              className="block text-purple-600 text-sm font-bold mb-2"
              htmlFor="questionID"
            >
              Question ID:
            </label>
            <input
              className="shadow appearance-none placeholder:text-darkBg2 dark:placeholder:text-whiteBg2  border rounded w-full py-2 px-3 bg-whiteBg2 dark:bg-darkBg2 text-textB dark:text-textW leading-tight focus:outline-none focus:shadow-outline"
              id="questionID"
              type="text"
              name="id"
              value={questionData.id}
              onChange={handleChange}
              placeholder="Enter Question ID"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-600 text-sm font-bold mb-2"
              htmlFor="imageURL"
            >
              Image URL:
            </label>
            <input
              className="shadow appearance-none border placeholder:text-darkBg2 dark:placeholder:text-whiteBg2  bg-whiteBg2 dark:bg-darkBg2 rounded w-full py-2 px-3 text-textB dark:text-textW leading-tight focus:outline-none focus:shadow-outline"
              id="imageURL"
              type="text"
              name="img"
              value={questionData.img}
              onChange={handleChange}
              placeholder="Enter Image URL"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-600 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type:
            </label>
            <input
              className="shadow appearance-none border placeholder:text-darkBg2 dark:placeholder:text-whiteBg2  dark:bg-darkBg2 rounded w-full py-2 px-3 text-textB dark:text-textW leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              type="text"
              name="type"
              value={questionData.type}
              onChange={handleChange}
              placeholder="Enter Type"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-600 text-sm font-bold mb-2"
              htmlFor="subtype"
            >
              Subtype:
            </label>
            <input
              className="shadow appearance-none placeholder:text-darkBg2 dark:placeholder:text-whiteBg2  
              border rounded bg-whiteBg2 dark:bg-darkBg2 w-full py-2 px-3 text-textB dark:text-textW 
              leading-tight focus:outline-none focus:shadow-outline"
              id="subtype"
              type="text"
              name="subtype"
              value={questionData.subtype}
              onChange={handleChange}
              placeholder="Enter Subtype"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-purple-600text-sm font-bold mb-2 text-purple-500"
              htmlFor="text"
            >
              Text:
            </label>
            <input
              className="shadow appearance-none placeholder:text-darkBg2 dark:placeholder:text-whiteBg2 border rounded
               bg-whiteBg2 dark:bg-darkBg2 w-full py-2 px-3 text-textB dark:text-textW
               leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              name="text"
              value={questionData.text}
              onChange={handleChange}
              placeholder="Enter Text"
            />
          </div>
          <div className="grid place-items-center">
            <button
              className="bg-gradient-to-r from-purple-200 to-purple-800 hover:from-purple-800 hover:to-purple-200
               text-textW font-bold py-2 px-4 rounded focus:outline-none mb-2 focus:shadow-outline"
              type="button"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>

          {questionData.options.map((option, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-textB dark:text-textW  text-sm font-bold mb-2 "
                htmlFor={`optionLabel${index}`}
              >
                Option {option.label} Label:
              </label>
              <input
                className="shadow appearance-none bg-whiteBg2 dark:bg-darkBg2 border placeholder:text-darkBg2
                 dark:placeholder:text-whiteBg2 rounded w-full py-2 px-3 text-textB
                  dark:text-textW leading-tight focus:outline-none focus:shadow-outline"
                id={`optionLabel${index}`}
                type="text"
                name="label"
                value={option.label}
                readOnly
              />
              <label
                className="block text-purple-500 text-sm font-bold mt-2 mb-2"
                htmlFor={`optionText${index}`}
              >
                Option {option.label} Text:
              </label>
              <input
                className="shadow appearance-none  bg-whiteBg2 dark:bg-darkBg2 border placeholder:text-darkBg2
                dark:placeholder:text-whiteBg2 rounded w-full py-2 px-3 text-textB dark:text-textW leading-tight 
                focus:outline-none focus:shadow-outline"
                id={`optionText${index}`}
                type="text"
                name="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e)}
                placeholder={`Enter Option ${option.label} Text`}
              />
              <label className="flex items-center mt-2 text-fuchsia-600">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  name="isCorrect"
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionChange(index, e)}
                />
                <span className="text-sm">Option {option.label} Correct</span>
              </label>
            </div>
          ))}
          <div className="grid place-items-center">
            <button
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-purple-600
               hover:to-fuchsia-600 text-white font-bold py-2 px-4 rounded focus:outline-none 
               focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionForm;
