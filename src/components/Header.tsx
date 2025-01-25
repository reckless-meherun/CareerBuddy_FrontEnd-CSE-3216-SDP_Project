import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UserStorage from "@/utilities/UserStorage";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(darkModePreference);
    const handleChange = (e) => setIsDarkMode(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleChange);
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const user = UserStorage.getUser();
    if (user?.name && user?.id) {
      setIsLoggedIn(true);
      setUserName(user.name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`
      relative z-10 transition-all duration-300
      ${isDarkMode
        ? "bg-gradient-to-r from-gray-500 via-gray-800 to-gray-900"
        : "bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50"
      }
      shadow-lg
    `}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 py-7">
          {/* Logo Section */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link
              to="/"
              className="text-3xl font-bold transform transition-all duration-300 hover:scale-105"
            >
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                ...CareerBuddy
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden text-xl focus:outline-none transition-transform duration-300 hover:scale-110"
            >
              {menuOpen ? <FaTimes className="text-teal-500" /> : <FaBars className="text-teal-500" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`
            flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-8
            transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 md:max-h-96 opacity-0 md:opacity-100"}
          `}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {[
                { to: "/", text: "Home" },
                ...(isLoggedIn
                  ? [
                    { to: "/profile", text: userName },
                    { text: "Logout", onClick: handleLogout }
                  ]
                  : [
                    { to: "/login", text: "Login" },
                    { to: "/signup", text: "Sign Up" }
                  ]
                )
              ].map((item, index) => (
                item.to ? (
                  <Link
                    key={index}
                    to={item.to}
                    className={`
                      relative text-lg font-medium transition-all duration-300
                      ${isActive(item.to)
                        ? "text-teal-500 font-bold"
                        : isDarkMode ? "text-gray-300 hover:text-teal-400" : "text-gray-700 hover:text-teal-600"
                      }
                      after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:bottom-0
                      after:bg-gradient-to-r after:from-teal-500 after:to-blue-500
                      after:transition-all after:duration-300
                      after:scale-x-0 hover:after:scale-x-100
                      ${isActive(item.to) ? "after:scale-x-100" : ""}
                    `}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={` h-[30px]
    relative flex items-center justify-center text-lg font-medium transition-all duration-300 bg-transparent h-auto
                      focus:outline-none focus:ring-0
                      ${isDarkMode
                        ? "text-gray-300 hover:text-teal-400"
                        : "text-gray-700 hover:text-teal-600"}
                      after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:bottom-0
                      after:bg-gradient-to-r after:from-teal-500 after:to-blue-500
                      after:transition-all after:duration-300
                      after:scale-x-0 hover:after:scale-x-100
                    
  `}
                  >
                    {item.text}
                  </button>
                )
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
