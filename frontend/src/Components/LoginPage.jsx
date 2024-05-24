import { useEffect, useState } from "react";
import "../Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTestHistory, setUserData } from "../state/reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "../toast/toastNotifications.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [loginAttr, setLoginAttr] = useState(true);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);

  const validateFields = () => {
    if (!email || !password) {
      showErrorToast("Email and Password are required.");
      return false;
    }
    if (!loginAttr && (!name || !number || !confirmPassword)) {
      showErrorToast("All fields are required for sign up.");
      return false;
    }
    if (!loginAttr && password !== confirmPassword) {
      showErrorToast("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email + "sent request");
    if (!validateFields()) return;
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isAdmin }),
      });
      const data = await response.json();
      if (data.login) {
        dispatch(setUserData(data.user));
        dispatch(setTestHistory(data.tests));
        showSuccessToast("Logged in successfully!");
        navigate("/dashboard");
      } else {
        showErrorToast("Login failed, Incorrect credentials");
      }
    } catch (error) {
      showErrorToast("Login failed. Please try again.");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsAdmin(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/users/adminlogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, isAdmin }),
        }
      );
      const data = await response.json();
      if (data.login) {
        dispatch(setUserData(data.user));
        showSuccessToast("Admin logged in successfully!");
        navigate("/dashboard");
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      showErrorToast("Admin login failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    // Signup logic
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          number,
          confirmPassword,
        }),
      });
      const data = await response.json();
      showSuccessToast("Signup successful!");
      toggleLoginSignup();
    } catch (error) {
      showErrorToast("Signup failed. Please try again.");
    }
  };

  const toggleLoginSignup = () => {
    setLoginAttr(!loginAttr);
    setError(null);
    setName("");
    setEmail("");
    setNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <ToastContainer />
      {loginAttr ? (
        <div className="loginBox border-2 border-purple-600 px-8 py-4">
          <img
            className="user border-2 border-fuchsia-400 rounded-full"
            src="https://i.ibb.co/yVGxFPR/2.png"
            height="100px"
            width="100px"
            alt="User"
          />
          <h3 className="text-purple-400">Sign in here</h3>
          <form>
            <div className="inputBox">
              <input
                id="email"
                type="email"
                name="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="pass"
                type="password"
                name="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white 
                font-bold py-3 px-5 rounded-full shadow-lg transform transition-all duration-500
                 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              type="submit"
              value="Login"
              onClick={handleLogin}
            />
            <input
              className="bg-gradient-to-r from-yellow-200 to-green-500 hover:from-green-500 hover:to-yellow-200 text-white 
            font-bold py-3 px-5 rounded-full shadow-lg transform transition-all duration-500
             ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              type="submit"
              value="Login as Admin"
              onClick={handleAdminLogin}
            />
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <a
            className="text-purple-600 hover:text-purple-300  align-middle text-center justify-between ml-20"
            href="#"
          >
            Forget Password
          </a>
          <br />
          <div className="text-center">
            <a
              className="text-purple-600 hover:text-purple-300 ml-3 "
              href="#"
              onClick={toggleLoginSignup}
            >
              Sign-Up
            </a>
          </div>
        </div>
      ) : (
        <div className="loginBox border-2 border-purple-600 px-4 py-8">
          <img
            className="user border-2 rounded-full border-fuchsia-400"
            src="https://i.ibb.co/yVGxFPR/2.png"
            height="100px"
            width="100px"
            alt="User"
          />
          <h3 className="text-purple-500">Login here</h3>
          <form>
            <div className="inputBox">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                name="number"
                placeholder="Contact Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
              className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white 
              font-bold py-3 px-5 rounded-full shadow-lg transform transition-all duration-500
               ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              type="submit"
              value="Sign Up"
              onClick={handleSignup}
            />
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="text-center">
            <p className="text-textW">
              Already have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-300  text-lg"
                onClick={toggleLoginSignup}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
