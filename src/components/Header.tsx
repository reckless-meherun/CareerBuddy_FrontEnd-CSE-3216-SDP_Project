import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
    // Detect user's dark mode preference
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(darkModePreference);

    // Listen for changes in the preference
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleChange);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    // Check if the user is logged in and retrieve their name
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

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`flex flex-col md:flex-row justify-between items-center px-5 py-2 ${isDarkMode ? "bg-primary text-white" : "bg-teal-100 text-gray-900"}`}>
      {/* Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="text-3xl font-bold dark:text-slate-300 text-gray-900 ">
          ...CareerBuddy
        </Link>
        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-xl focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`flex flex-col mr-6 md:flex-row items-center w-full md:w-auto ${menuOpen ? "block" : "hidden"} md:block md:mt-0`}>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-lg font-medium">
          <Link
            to="/"
            className={`text-xl ${isActive("/") ? "underline font-bold" : ""} ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className={`text-xl ${isActive("/profile") ? "underline font-bold" : ""} ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
              >
                {userName}
              </Link>
              <button
                onClick={handleLogout}
                className={`text-md ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-xl ${isActive("/login") ? "underline font-bold" : ""} ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-xl ${isActive("/signup") ? "underline font-bold" : ""} ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
