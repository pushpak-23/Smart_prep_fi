import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ThemeToggler from "../ThemeToggler";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <div
      className={`flex justify-between items-center border-b-2 border-purple-500 h-24 max-w-[1240px] mx-auto px-4 dark:bg-darkBg bg-whiteBg 
      `}
    >
      <h1
        className={`w-full text-3xl font-bold 
        bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent`}
      >
        SmartPrep
      </h1>
      <ul className="hidden md:flex">
        <li className="p-4">
          <ThemeToggler />
        </li>
      </ul>
      <div onClick={handleNavbar} className="block md:hidden">
        {navbar ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          navbar
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-purple-400 dark:bg-darkBg bg-whiteBg ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <li className="p-4 border-b border-gray-600 dark:text-textW text-textB hover:text-purple-500">
          Home
        </li>
        <li className="p-4 border-b border-gray-600 dark:text-textW text-textB hover:text-purple-500">
          Resources
        </li>
        <li className="p-4 border-b border-gray-600 dark:text-textW text-textB hover:text-purple-500">
          About
        </li>
        <li className="p-4">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
