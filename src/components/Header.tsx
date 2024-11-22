import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
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
        // Check if the user is logged in and retrieve their name from localStorage
        const token = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("userName");

        if (token && storedUserName) {
            setIsLoggedIn(true);
            setUserName(storedUserName);
        } else {
            setIsLoggedIn(false);
            setUserName("");
        }
    }, [location]);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/login");
    };

    // Function to determine if the link is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className={`flex justify-between items-center px-5 py-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-teal-100 text-gray-900"} shadow-md`}>
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold">...CareerBuddy</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 text-lg font-medium">
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
                            className={`text-xl ${isDarkMode ? "text-gray-200 hover:text-darkTeal" : "text-gray-700 hover:text-black"}`}
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
        </header>
    );
}

export default Header;
