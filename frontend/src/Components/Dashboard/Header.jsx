import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";
import { setUserData } from "../../state/reducer";
import ThemeToggler from "../ThemeToggler";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const userData = useSelector((state) => state.userData);
  const avEmail = userData.email;
  const config = {
    email: avEmail,
    ...genConfig(avEmail),
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUserData(null));
    navigate("/login");
  };

  return (
    <header
      className="h-16 w-full flex items-center relative justify-between 
    px-5 space-x-10 dark:bg-darkBg bg-whiteBg border-r shadow-sm mx-1.5 
    rounded-md mt-1.5 scrollbar-none border-b-2 border-purple-600"
    >
      <div
        className="dark:text-transparent bg-clip-text bg-gradient-to-r
       from-purple-400 via-blue-400 to-pink-400 text-3xl font-extrabold 
       flex-grow text-purple-500"
      >
        <Link className="hover:text-purple-200" to="/">
          SMART PREP
        </Link>
      </div>

      <ul className="hidden md:flex">
        <li className="py-3 px-2 ">
          <ThemeToggler />
        </li>
      </ul>

      <div
        className="flex flex-shrink-0 items-start space-x-4 dark:text-textW text-textB relative"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <div className="flex flex-col items-end">
          <div className="text-md font-medium">
            {userData.name
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </div>

          <div className="text-sm font-regular">
            {userData.isAdmin ? "Admin" : "Student"}
          </div>
        </div>

        <div className="h-10 w-10 rounded-full cursor-pointer relative">
          <Avatar
            className="w-10 h-10 border-2 border-purple-700"
            {...config}
          />
          {showLogout && (
            <button
              className="absolute top-0 right-0 bg-white text-textB border-2 border-purple-400  px-2 py-1 rounded my-4 mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
