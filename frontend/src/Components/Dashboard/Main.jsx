import { Braces, CheckSquare2, Puzzle, Sigma } from "lucide-react";
// import { useUserContext } from "../../UserContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useSelector } from "react-redux";
import AdminMain from "./AdminMain";

function Main() {
  const userData = useSelector((state) => state.userData);
  const testHistory = useSelector((state) => state.testHistory);

  console.log(testHistory);

  // Function to transform testHistory data into a format suitable for the charts
  const transformDataForCharts = () => {
    if (!testHistory || !testHistory) return []; // Return empty array if no test history
    return testHistory.map((test, index) => ({
      name: `Test ${index + 1}`, // Assuming index starts from 0
      aptitude_marks: test.aptitude_marks,
      logical_marks: test.logical_marks,
      technical_marks: test.technical_marks,
    }));
  };

  // Get transformed data suitable for the charts
  const data = transformDataForCharts();

  if (!userData.isAdmin) {
    return (
      <main
        className="max-w-full h-full flex relative overflow-y-scroll"
        style={{ scrollbarWidth: "none", overflow: "-moz-scrollbars-none" }}
      >
        <div className="h-full w-full m-2 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-auto">
          <div className="w-full h-2 justify-center items-center align-middle flex-shrink-0 flex-grow"></div>

          <div className="flex justify-center lg:justify-start gap-4 w-full">
            <div
              className="w-full sm:w-1/2 lg:w-1/4 h-36 p-4 rounded-lg flex items-center justify-center
             border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg 
             drop-shadow-lg hover:drop-shadow-xl"
            >
              <div className="text-center">
                <CheckSquare2 className="w-8 h-8 mx-auto mb-2  text-[#5df948] font-bold" />
                <p className="text-2xl font-semibold dark:text-purple-300 text-purple-600 mt-1">
                  Test Taken
                </p>
                <p className="text-3xl font-bold dark:text-textW text-textB">
                  {userData.testsTaken}
                </p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 lg:w-1/4 h-36 p-4 rounded-lg flex items-center justify-center 
             border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg
              drop-shadow-lg hover:drop-shadow-xl "
            >
              <div className="text-center">
                <Sigma className="w-8 h-8 mx-auto mt-2 text-[#00FFE7]" />
                <p className="text-xl font-semibold dark:text-purple-300 text-purple-600">
                  Highest Aptitude Score
                </p>
                <p className="text-3xl font-bold dark:text-textW text-textB">
                  {userData.max_apti_marks}
                </p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 lg:w-1/4 h-36 p-4 rounded-lg flex items-center
             justify-center  border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg
              drop-shadow-lg hover:drop-shadow-xl"
            >
              <div className="text-center">
                <Puzzle className="w-8 h-8 mx-auto mb-2 mt-2 dark:text-[#DCED31] text-[#f9f646]" />
                <p className="text-xl font-semibold dark:text-purple-300 text-purple-600">
                  Highest Logical Score
                </p>
                <p className="text-3xl font-bold dark:text-textW text-textB">
                  {userData.max_logi_marks}
                </p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/2 lg:w-1/4 h-36 p-4 rounded-lg flex items-center
             justify-center  border-t-2 border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg
              drop-shadow-lg hover:drop-shadow-xl"
            >
              <div className="text-center  text-[#87CEEB]">
                <Braces className="w-8 h-8 mx-auto  mt-2 text-cerise-600" />
                <p className="text-xl font-semibold dark:text-purple-300 text-purple-600 ">
                  Highest Technical Score
                </p>
                <p className="text-3xl font-bold dark:text-textW text-textB ">
                  {userData.max_techni_marks}
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-[48%] h-80 rounded-lg flex-shrink-0 flex-grow border-t-2
           border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg p-3 drop-shadow-lg
            hover:drop-shadow-xl"
          >
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="aptitude_marks"
                  fill="#6495ED"
                  name="Aptitude Marks"
                />
                <Bar
                  dataKey="logical_marks"
                  fill="#1E90FF"
                  name="Logical Marks"
                />
                <Bar
                  dataKey="technical_marks"
                  fill="#4682B4"
                  name="Technical Marks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            className="w-[48%] h-80 rounded-lg flex-shrink-0 flex-grow border-t-2 
          border-b-2 border-purple-500 bg-whiteBg dark:bg-darkBg p-3 drop-shadow-lg 
          hover:drop-shadow-xl"
          >
            <ResponsiveContainer>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="aptitude_marks"
                  stroke="#6495ED"
                  name="Aptitude Marks"
                />
                <Line
                  type="monotone"
                  dataKey="logical_marks"
                  stroke="#1E90FF"
                  name="Logical Marks"
                />
                <Line
                  type="monotone"
                  dataKey="technical_marks"
                  stroke="#4682B4"
                  name="Technical Marks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <div>
        <AdminMain />
      </div>
    );
  }
}

export default Main;
