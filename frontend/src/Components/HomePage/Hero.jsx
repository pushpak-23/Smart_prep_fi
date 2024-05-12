import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { useSelector } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const darkTheme = useSelector((state) => state.darkTheme);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto dark:bg-darkBg  bg-whiteBg text-center flex flex-col justify-center">
        <p className="text-[#65f26a] font-bold p-2">
          UNCERTAIN ABOUT YOUR CAREER PATH?
        </p>
        <h1
          className={
            "md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent sm:text-6xl text-4xl  font-bold md:py-6"
          }
        >
          Predict Your Placement Chances
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-4xl text-[#393838] dark:text-[#e7e7e7] sm:text-4xl text-xl font-bold py-4">
            Get Prepped for
          </p>
          <ReactTyped
            className="md:text-4xl bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["TCS", "Capgemini", "Accenture", "etc..."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Track your progress and refine your skills with our personalized
          dashboard.
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
  );
};

export default Hero;
