import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

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
                    className={`text-xl ${isDarkMode ? "text-gray-200 hover:text-blue-300" : "text-gray-700 hover:text-black"}`}
                >
                    Home
                </Link>
                <Link
                    to="/profile"
                    className={`text-xl ${isActive("/profile") ? "underline" : ""} ${isDarkMode ? "text-gray-200 hover:text-blue-300" : "text-gray-700 hover:text-black"}`}
                >
                    My Profile
                </Link>

                <Link
                    to="/login"
                    className={`text-xl ${isActive("/login") ? "underline" : ""} ${isDarkMode ? "text-gray-200 hover:text-blue-300" : "text-gray-700 hover:text-black"}`}
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className={`text-xl ${isActive("/signup") ? "underline" : ""} ${isDarkMode ? "text-gray-200 hover:text-blue-300" : "text-gray-700 hover:text-black"}`}
                >
                    Sign Up
                </Link>
            </div>
        </header>
    );
}

export default Header;
