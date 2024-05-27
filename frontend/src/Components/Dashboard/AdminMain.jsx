import React, { useEffect, useState } from "react";
import { CheckSquare2, TrendingUp, User } from "lucide-react";

export default function AdminMain() {
  const [recentTests, setRecentTests] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [adminCount, setAdminCount] = useState([]);
  const [testCount, setTestCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/test/adminKnowledge",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();
        setRecentTests(data.tests);
        setStudentCount(data.studentCount);
        setTestCount(data.testCount);
        setAdminCount(data.adminCount);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-8 lg:p-12">
          <div className="h-36 p-4 rounded-lg flex items-center justify-center border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg drop-shadow-lg hover:drop-shadow-xl">
            <div className="text-center">
              <CheckSquare2 className="w-8 h-8 mx-auto mb-2 text-[#5df948] font-bold" />
              <p className="text-2xl font-semibold dark:text-purple-300 text-purple-600 mt-1">
                Test Taken
              </p>
              <p className="text-3xl font-bold dark:text-textW text-textB">
                {testCount}
              </p>
            </div>
          </div>
          <div className="h-36 p-4 rounded-lg flex items-center justify-center border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg drop-shadow-lg hover:drop-shadow-xl">
            <div className="text-center">
              <User className="w-8 h-8 mx-auto mt-2 text-[#00FFE7]" />
              <p className="text-xl font-semibold dark:text-purple-300 text-purple-600">
                Student Count
              </p>
              <p className="text-3xl font-bold dark:text-textW text-textB">
                {studentCount}
              </p>
            </div>
          </div>
          <div className="h-36 p-4 rounded-lg flex items-center justify-center border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg drop-shadow-lg hover:drop-shadow-xl">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 mt-2 dark:text-[#DCED31] text-[#f9f646]" />
              <p className="text-xl font-semibold dark:text-purple-300 text-purple-600">
                Admin Count
              </p>
              <p className="text-3xl font-bold dark:text-textW text-textB">
                {adminCount}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 shadow-lg rounded-lg mx-4 md:mx-10 overflow-auto">
          <div className="overflow-auto">
            <table className="w-full border-collapse sm:table-fixed border-t-2 border-b-2 border-purple-500">
              <thead>
                <tr className="bg-whiteBg2 dark:bg-darkBg border-t-2 border-b-2 border-purple-500">
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                    Student Name
                  </th>
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase truncate">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                    Aptitude Marks
                  </th>
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                    Logical Marks
                  </th>
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                    Technical Marks
                  </th>
                  <th className="py-4 px-6 text-left dark:text-fuchsia-300 text-fuchsia-700 font-bold uppercase">
                    Test Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((test, index) => (
                  <tr
                    key={index}
                    className={`border-t-2 border-b-2 border-purple-500 ${
                      index % 2 === 0
                        ? "bg-[#F8F9F5] dark:bg-darkBg"
                        : "bg-whiteBg2 dark:bg-darkBg2"
                    } dark:text-textW text-textB`}
                  >
                    <td className="py-4 px-6 border-b border-gray-200">
                      {test.name}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {test.email}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {test.aptitude_marks}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {test.logical_marks}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {test.technical_marks}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {new Date(test.test_date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
