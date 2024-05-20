import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";
import { useSelector } from "react-redux";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const userData = useSelector((state) => state.userData);
  const avEmail = userData.email;
  const config = {
    email: avEmail,
    ...genConfig(avEmail),
  };

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col dark:bg-darkBg bg-whiteBg border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 dark:text-textB text-textW"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <Avatar
              className="w-10 h-10 border-2 border-purple-500"
              {...config}
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-xl text-textB dark:text-textW">
                  {userData.name
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </h4>
                <span className="text-textB text-sm dark:text-textW ">
                  {userData.email}
                </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, setActiveTab }) {
  const navigate = useNavigate();

  const navigationClick = (text) => {
    if (text === "Take Test") navigate("/rules");
    else setActiveTab(text);
  };

  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1  mt-3 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 dark:text-textW text-textB"
          : "hover:hover:bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:scale-110 dark:text-textW text-textB"
      }`}
      onClick={() => navigationClick(text)}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3 mt-2" : "w-0 "
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100
           text-white text-sm invisible opacity-20 -translate-x-3 transition-all 
           group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
