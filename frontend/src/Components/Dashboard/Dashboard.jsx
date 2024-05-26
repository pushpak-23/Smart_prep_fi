// Dashboard.jsx
import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  LayoutDashboard,
  LibraryBig,
  UserCheck,
  FilePlus2,
  FileClock,
  FilePenLine,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";

import HomePage from "./HomePage";
import Test from "../TestSection/Test";
import TestHistory from "../TestHistory/TestHistory";
import StudyMaterial from "../StudyMaterial/StudyMaterial";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddQuestionForm from "./AddQuestions";
import CheckStudents from "./CheckStudents";

function Dashboard() {
  const userData = useSelector((state) => state.userData);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) navigate("/login");
  }, [userData, navigate]);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const [activeTab, setActiveTab] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return userData ? (
    <div className="h-screen w-full dark:bg-darkBg2 overflow-hidden  bg-whiteBg2 relative flex scrollbar-none">
      <Sidebar toggleSidebar={toggleSidebar}>
        <SidebarItem
          className="dark:text-textW text-textB"
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeTab === "Dashboard"}
          setActiveTab={setActiveTab}
        />
        {!userData.isAdmin ? (
          <SidebarItem
            className="dark:text-textW text-textB"
            icon={<FileClock size={20} />}
            text="Test History"
            active={activeTab === "Test History"}
            setActiveTab={setActiveTab}
          />
        ) : (
          <SidebarItem
            className="dark:text-textW text-textB"
            icon={<UserCheck size={20} />}
            text="Student Data"
            active={activeTab === "Student Data"}
            setActiveTab={setActiveTab}
          />
        )}
        <SidebarItem
          className="dark:text-textW text-textB"
          icon={<LibraryBig size={20} />}
          text="Study Material"
          active={activeTab === "Study Material"}
          setActiveTab={setActiveTab}
        />
        {!userData.isAdmin ? (
          <SidebarItem
            className="dark:text-textW text-textB"
            icon={<FilePenLine size={20} />}
            text="Take Test"
            active={activeTab === "Take Test"}
            setActiveTab={setActiveTab}
          />
        ) : (
          <SidebarItem
            className="dark:text-textW text-textB"
            icon={<FilePlus2 size={20} />}
            text="Add Questions"
            active={activeTab === "Add Questions"}
            setActiveTab={setActiveTab}
          />
        )}
        <hr className="my-3 text-[#87CEEB] border-white" />
        {/* <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
      </Sidebar>
      <div className="w-full flex flex-col overflow-y-auto">
        {activeTab === "Dashboard" && <HomePage />}
        {activeTab === "Add Questions" && <AddQuestionForm />}
        {activeTab === "Test History" && <TestHistory />}
        {activeTab === "Student Data" && <CheckStudents />}
        {activeTab === "Study Material" && <StudyMaterial />}
      </div>
    </div>
  ) : null;
}

export default Dashboard;
