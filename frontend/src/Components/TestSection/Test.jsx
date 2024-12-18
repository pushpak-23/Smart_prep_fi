import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MCQuestions from "./MCQuestions";
import "codemirror";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showWarningToast } from "../../toast/toastNotifications";

export default function Test() {
  const [allQuestions, setAllQuestions] = useState([]);

  const navigate = useNavigate();

  const coding_questionList = [
    {
      type: "coding",
      text: "Write a function to check if String is Palindrome\n if it is, print 'Palindrome' else 'Not Palindrome'",
      testcases: [
        { input: "racecar", expectedOutput: "Palindrome" },
        { input: "mouse", expectedOutput: "Not Palindrome" },
      ],
    },
    {
      type: "coding",
      text: "Write a program for addition of two numbers",
      testcases: [
        { input: "5 8", expectedOutput: "13" },
        { input: "8 4", expectedOutput: "12" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/questions/getQuestions"
        );
        const data = await res.json();
        setAllQuestions(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();

    const requestFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
    };

    const handleCheating = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      navigate("/nuh-uh");
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleCheating();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleCheating();
      }
    };

    const handleBlur = () => {
      handleCheating();
    };

    // Request to enter fullscreen mode initially
    requestFullscreen();

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    // Set a timeout to navigate user to a different page if they don't switch to fullscreen within 10 seconds
    const timeout = setTimeout(() => {
      if (!document.fullscreenElement) {
        navigate("/nuh-uh");
      }
    }, 10000);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      clearTimeout(timeout);
    };
  }, [navigate]);

  const [images, setImages] = useState([]);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let stream = null;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        intervalRef.current = setInterval(captureImage, 1000);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = { canvas, dataURL: canvas.toDataURL() };

    setImages((prevImages) => [...prevImages, imageData]);
  };

  const requestFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const handleEnterFullscreenClick = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode only if not already in fullscreen
      requestFullscreen();
    }
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={handleEnterFullscreenClick}>Enter Fullscreen</button>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <MCQuestions
        questionList={allQuestions}
        coding_questionList={coding_questionList}
        videoRef={videoRef}
        intervalRef={intervalRef}
        images={images}
      />
    </div>
  );
}
