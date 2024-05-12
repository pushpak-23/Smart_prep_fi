import { useSelector } from "react-redux";
import Header from "../Dashboard/Header";
import RedirectButton from "./RedirectButton";
import { useEffect, useState } from "react";

const StudyMaterial = () => {
  const userData = useSelector((state) => state.userData);
  const [studyMaterialData, setStudyMaterialData] = useState([]);
  const [newText, setNewText] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/study/getStudyMaterial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudyMaterialData(data.studyMaterial);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/study/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newText,
          url: newUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudyMaterialData(data.studyMaterial);
      // Clear input fields after successful submission
      setNewText("");
      setNewUrl("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col scrollbar">
        <Header />
        <main className="max-w-full h-full flex relative overflow-y-auto scrollbar-none">
          <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-auto">
            <div className="w-full h-2 justify-center items-center align-middle flex-shrink-0 flex-grow">
              <p className="flex text-fuchsia-500 justify-center align-middle font-bold text-2xl">
                STUDY MATERIAL
              </p>
            </div>
            {userData.isAdmin && (
              <div className="flex justify-center align-middle mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Enter text"
                    className="p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-fuchsia-500"
                  />
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-fuchsia-500"
                  />
                  <button
                    type="submit"
                    className="bg-fuchsia-500 text-white p-2 rounded-md hover:fuchsia-500 focus:outline-none focus:bg-fuchsia-300"
                  >
                    Add Study Material
                  </button>
                </form>
              </div>
            )}
            <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex flex-wrap justify-center sm:justify-start w-full lg:w-full">
                {studyMaterialData.map((button, index) => (
                  <RedirectButton
                    key={index}
                    url={button.url}
                    text={button.text}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudyMaterial;
