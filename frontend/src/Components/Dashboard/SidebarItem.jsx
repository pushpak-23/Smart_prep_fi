import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

export function SidebarItem({ to, icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink to={to}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-red-100 text-indigo-800"
            : "hover:bg-red-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-red-100
            text-darkB text-sm invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </NavLink>
  );
}
