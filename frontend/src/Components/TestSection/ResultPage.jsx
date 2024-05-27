import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Dashboard/Header";
import { useDispatch, useSelector } from "react-redux";
import { setTestHistory, setUserData } from "../../state/reducer";

const ResultPage = () => {
  const location = useLocation();
  const {
    resultList = [],
    timeList = [],
    imagesData = [],
  } = location.state ?? {};
  // const aptitudeScore =
  //   resultList.length > 0 ? (resultList[0] * 100).toFixed(2) : 0;
  // const logicalScore =
  //   resultList.length > 1 ? (resultList[1] * 100).toFixed(2) : 0;
  // const technicalScore =
  //   resultList.length > 2 ? (resultList[2] * 100).toFixed(2) : 0;
  // const aptitudeTime = timeList.length > 0 ? timeList[0].toFixed(2) : 0;
  // const logicalTime = timeList.length > 1 ? timeList[1].toFixed(2) : 0;
  // const technicalTime = timeList.length > 2 ? timeList[2].toFixed(2) : 0;

  const aptitudeScore = 66.7;
  const logicalScore = 58.3;
  const technicalScore = 50;
  const technicalTime = 20;
  const aptitudeTime = 15;
  const logicalTime = 20;

  const navigate = useNavigate();

  const [companyPredictions, setCompanyPredictions] = useState("");
  const [companyScores, setCompanyScores] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const calculateSpecificCompanyPredictions = () => {
    let weightedScore =
      1.25 * technicalScore + 1 * aptitudeScore + 0.75 * logicalScore;

    let placementProb = weightedScore / 300;

    const timeWeightage = 0.05;
    placementProb +=
      timeWeightage * (1 - (aptitudeTime + logicalTime + technicalTime) / 180);

    const specializationBonus = 0.01;
    placementProb += specializationBonus * (technicalScore / 100);

    const communicationSkillsFactor = 0.01;
    placementProb += communicationSkillsFactor * (1 - logicalTime / 60);

    const negativeCorrelationMultiplier = 0.01;
    placementProb -= negativeCorrelationMultiplier * (weightedScore / 300);

    const efficiencyFactor = 0.0025;
    placementProb -=
      efficiencyFactor *
      ((weightedScore / 300) *
        (1 - (aptitudeTime + logicalTime + technicalTime) / 180));

    const efficiencyPenaltyFactor = 0.05;
    placementProb -=
      efficiencyPenaltyFactor *
      (1 - weightedScore / 300) *
      ((logicalTime + technicalTime) / 120);

    const consistencyThreshold = 20;
    const consistencyBonus =
      aptitudeScore >= consistencyThreshold &&
      logicalScore >= consistencyThreshold &&
      technicalScore >= consistencyThreshold
        ? 0.01
        : 0;

    placementProb += consistencyBonus;

    const tcsCriteria =
      (0.6 * technicalScore + 0.3 * aptitudeScore + 0.1 * logicalScore) / 100;
    const cognizantCriteria =
      (0.4 * technicalScore +
        0.4 * logicalScore +
        0.2 * communicationSkillsFactor) /
      100;
    const capgeminiCriteria =
      (0.4 * consistencyBonus +
        0.4 * logicalScore +
        0.2 * communicationSkillsFactor) /
      100;
    const infosysCriteria =
      (0.5 * technicalScore + 0.3 * aptitudeScore + 0.2 * logicalScore) / 100;
    const wiproCriteria =
      (0.4 * technicalScore +
        0.4 * logicalScore +
        0.2 * communicationSkillsFactor) /
      100;

    const calculatedScores = [
      { company: "TCS", percent: tcsCriteria * 100 },
      { company: "Cognizant", percent: cognizantCriteria * 100 },
      { company: "Capgemini", percent: capgeminiCriteria * 100 },
      { company: "Infosys", percent: infosysCriteria * 100 },
      { company: "Wipro", percent: wiproCriteria * 100 },
    ];
    setCompanyScores(calculatedScores);
    setShowTable(true);
  };

  useEffect(() => {
    if (companyPredictions !== "") {
      calculateSpecificCompanyPredictions();
    }
  }, [companyPredictions]);

  const dispatch = useDispatch();

  const handlePredictions = () => {
    setShowTable(true);
    // Send scores and time to an API
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Aptitude_Score: aptitudeScore,
        Logical_Score: logicalScore,
        Technical_Score: technicalScore,
        Aptitude_Time: aptitudeTime,
        Logical_Time: logicalTime,
        Technical_Time: technicalTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Store response in companyPredictions state
        setCompanyPredictions(data.prediction);
        calculateSpecificCompanyPredictions();
        addToDatabase();
      })
      .catch((error) => {
        console.error("Error fetching company predictions:", error);
      });
  };
  const userData = useSelector((state) => state.userData);
  const addToDatabase = () => {
    const email = userData.email;
    // Send scores and time to an API
    fetch("http://localhost:3001/api/test/addTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        aptitude_marks: aptitudeScore,
        logical_marks: logicalScore,
        technical_marks: technicalScore,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Store response in companyPredictions state
        dispatch(setUserData(data.user));
        dispatch(setTestHistory(data.tests));
      })
      .catch((error) => {
        console.error("Error fetching company predictions:", error);
      });
  };

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen w-full dark:bg-darkBg2 bg-whiteBg2 flex flex-col items-center
  "
    >
      <Header />
      <div className="h-full overflow-y-auto mx-auto mt-5 mb-8 p-8 dark:bg-darkBg bg-whiteBg rounded-lg shadow-lg scrollbar-none">
        <h2 className="text-3xl font-bold mb-4 text-center  text-purple-500">
          Test Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-6 ">
          <div className="result-card text-center border-2 border-fuchsia-400 rounded-md">
            <div className="dark:bg-purple-700 bg-purple-300 p-2  flex flex-col justify-between h-full">
              <div className="border-b border-white pb-4">
                <h2 className="text-xl dark:text-textW text-textB font-bold">
                  Aptitude Score
                </h2>
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {aptitudeScore}
                </p>
              </div>
              <div className="border-t border-white pt-4">
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {aptitudeTime} mins
                </p>
              </div>
            </div>
          </div>

          <div className="result-card text-center border-2 border-fuchsia-400 rounded-md">
            <div className="dark:bg-purple-700 bg-purple-300 p-2  flex flex-col justify-between h-full">
              <div className="border-b border-white pb-4 ">
                <h2 className="text-xl dark:text-textW text-textB font-bold">
                  Logical Score
                </h2>
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {logicalScore}
                </p>
              </div>
              <div className="border-t border-white pt-4">
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {logicalTime} mins
                </p>
              </div>
            </div>
          </div>
          <div className="result-card text-center border-2 border-fuchsia-400 rounded-md ">
            <div className="dark:bg-purple-700 bg-purple-300 p-2 flex flex-col justify-between h-full">
              <div className="border-b border-white pb-4">
                <h2 className="text-xl dark:text-textW text-textB font-bold">
                  Technical Score
                </h2>
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {technicalScore}
                </p>
              </div>
              <div className="border-t border-white pt-4">
                <p className="text-xl font-bold dark:text-textW text-textB">
                  {technicalTime} mins
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white 
          font-bold py-3 px-6 rounded-2xl shadow-lg transform transition-all duration-500
           ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
            id="submitCode"
            onClick={handlePredictions}
          >
            Click for Predictions
          </button>
        </div>
        {showTable && (
          <div className="mt-6 shadow-lg rounded-lg flex overflow-hidden mx-4 md:mx-10">
            {/* <h2>Overall Placement Probability: {companyPredictions}</h2> */}
            (
            <table
              className="w-full table-fixed border-t-2 
              border-b-2 border-purple-500"
            >
              <thead>
                <tr className="bg-whiteBg2 dark:bg-darkBg2 dark:text-fuchsia-300 text-fuchsia-700">
                  <th className="w-4/5 py-4 px-6 text-left  dark:text-textW text-textB font-bold uppercase">
                    Company Names
                  </th>
                  <th className="w-1/5 py-4 px-6 text-left dark:text-textW text-textB font-bold uppercase">
                    Placement Probability
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyScores.map((row, index) => (
                  <tr
                    className={`border-t-2 
            border-b-2 border-purple-500 ${
              index % 2 === 0
                ? "bg-[#F8F9F5] dark:bg-darkBg"
                : "bg-whiteBg2 dark:bg-darkBg2"
            }`}
                    key={index}
                  >
                    <td className="py-2 px-6 border-b border-gray-200 dark:text-textW text-textB">
                      {row.company}
                    </td>
                    <td className="py-2 px-6 border-b border-gray-200 dark:text-textW text-textB">
                      {row.percent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white 
          font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500
           ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
            id="submitCode"
            onClick={handleClick}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
