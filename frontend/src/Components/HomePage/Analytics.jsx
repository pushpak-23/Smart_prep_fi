import React from "react";
import { useNavigate } from "react-router-dom";
import analytics from "../../assets/analytics.svg";
const Analytics = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-purple-200 to-purple-800 py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[500px] mx-auto my-4 rounded-xl"
          src={analytics}
          alt="/"
        />

        <div className="flex flex-col justify-center">
          <p className=" text-textB font-extrabold text-lg">
            DATA ANALYTICS DASHBOARD
          </p>
          <h1 className="md:text-4xl dark:text-white text-[#333333] sm:text-3xl text-2xl font-bold py-2">
            Manage Data Analytics Centrally
          </h1>
          <p className="text-textW dark:text-textB text-lg">
            Uncover your strengths and weaknesses with our comprehensive
            dashboard. It provides insightful metrics that go beyond just a
            score, allowing you to pinpoint areas for improvement and tailor
            your preparation strategy. This personalized data becomes your
            roadmap to success, maximizing your chances of landing your dream
            job.
          </p>
          <button
            onClick={handleClick}
            className="bg-whiteBg  dark:bg-darkBg w-[200px] rounded-md font-medium my-6 mx-auto py-3 shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] dark:hover:bg-[#9748FF] transition duration-300 ease-in-out"
          >
            <span className="font-medium dark:text-textW text-[#333] group-hover:text-white">
              Get Started
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
