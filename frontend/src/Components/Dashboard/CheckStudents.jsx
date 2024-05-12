import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function CheckStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users/getStudents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

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
                Student ID
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Name
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Email
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Number
              </th>
              <th className="w-1/4 py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                Tests Taken
              </th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
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
                  {student._id}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {student.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {student.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {student.number}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {student.testsTaken}
                </td>
                {/* Render additional fields here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
