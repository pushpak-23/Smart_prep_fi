import React from "react";
import logo from "../assets/nuhuh.jpeg"; // Replace with the path to your image file
import { useNavigate } from "react-router-dom";

export default function NuhUh() {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/dashboard");
  };

  return (
    <div className="dark:bg-darkBg2 bg-whiteBg2 min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md max-w-md">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="h-32 w-72 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#4169E1]">
            Welcome to NuhUh!
          </h1>
          <p className="text-gray-600">
            The land of busted cheaters and shattered dreams.
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg text-[#4169E1]">
            Thought you'd get away with cheating? Think again!
          </p>
          <p className="text-lg text-[#4169E1]">Ready to face the music?</p>
          <button
            onClick={handleClick}
            className="mt-6 px-4 py-2 bg-purple-700 text-white rounded hover:bg-[#4169E1] focus:outline-none focus:bg-[#4169E1]"
          >
            Go to Dashboard and think about what you've done.
          </button>
        </div>
      </div>
    </div>
  );
}
