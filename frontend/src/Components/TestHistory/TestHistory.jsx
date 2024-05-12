import React, { useState } from "react";
import Header from "../Dashboard/Header";
// import { useUserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TestHistory() {
  const testHistory = useSelector((state) => state.testHistory);
  const navigate = useNavigate();
  const aptitudeScore = Math.floor(Math.random() * 6) / 30;
  const logicalScore = (Math.floor(Math.random() * 2) + 1) / 30;
  const technicalScore = 1 / 4;
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <h2 className="text-center mt-4 mb-4 align-middle  justify-center text-2xl font-bold text-fuchsia-500 ">
        Test History
      </h2>
      <div className="mt-2 shadow-lg rounded-lg flex overflow-hidden mx-4 md:mx-10">
        <table
          className="w-full table-fixed border-t-2 
                border-b-2 border-purple-500"
        >
          <thead>
            <tr
              className="bg-whiteBg2 dark:bg-darkBg border-t-2 
                border-b-2 border-purple-500  "
            >
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Test Date
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Aptitude Marks
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Logical Marks
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Technical Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, index) => (
              <tr
                key={index}
                className={`border-t-2 
                border-b-2 border-purple-500  ${
                  index % 2 === 0
                    ? "bg-[#F8F9F5] dark:bg-darkBg"
                    : "bg-whiteBg2 dark:bg-darkBg2"
                }
                dark:text-textW text-textB`}
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(test.test_date).toLocaleString()}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">
                  {test.aptitude_marks}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {test.logical_marks}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {test.technical_marks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
