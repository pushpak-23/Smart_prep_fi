import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../state/reducer";

export default function ThemeToggler() {
  const darkTheme = useSelector((state) => state.darkTheme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    console.log("Theme changed: " + darkTheme);
    dispatch(setTheme(!darkTheme));
  };

  useEffect(() => {
    darkTheme
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkTheme]);
  return (
    <div className="item-start">
      <label
        id="theme-toggle-button"
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle"
          className="sr-only peer"
          checked={darkTheme}
          onChange={handleThemeChange}
        />

        <div
          className="w-10 h-10 rounded-full ring-0 peer duration-500 outline-none
         bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center
          after:flex after:items-center after:justify-center before:content-['☀️']
           before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white
            before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all 
            before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90
             peer-checked:before:-translate-y-full shadow-lg shadow-gray-400
              peer-checked:shadow-lg peer-checked:darkBg peer-checked:bg-darkBg 
               after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full 
               after:top-[4px] after:right-1px after:translate-y-full after:w-10 after:h-10 
               after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100
                peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
        ></div>
      </label>
    </div>
  );
}
