import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0); // Starting from 0 seconds

  const updateTimer = () => {
    setTimer((prevTimer) => prevTimer + 1000); // Increment timer by 1 second
  };

  useEffect(() => {
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const resetTimer = () => {
    setTimer(0); // Reset timer to 0 seconds
  };

  return (
    <div className="bg-purple-500 rounded-md p-2 text-lg mx-3 text-white">
      {formatTime(timer)}
    </div>
  );
};

export default Timer;
