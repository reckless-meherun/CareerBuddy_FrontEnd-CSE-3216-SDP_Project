import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    return (
        <header className={`flex justify-between items-center px-8 py-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-teal-100 text-gray-900"} shadow-md`}>
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">CareerBuddy</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6 text-lg font-medium">
                <Link to="/" className={`${isDarkMode ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                    Home
                </Link>
                
            </nav>

            {/* Search and Cart Icons */}
            <div className="flex items-center space-x-4">
            <Link to="/login" className={`${isDarkMode ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                    Login
                </Link>
                <Link to="/signup" className={`${isDarkMode ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                    Sign Up
                </Link>
            </div>
        </header>
    );
}

export default Header;
