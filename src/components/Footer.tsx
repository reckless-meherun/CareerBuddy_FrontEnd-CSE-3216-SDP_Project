import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UserStorage from "@/utilities/UserStorage";

function Footer() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Detect initial dark mode preference
        const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(darkModePreference);

        // Listen for changes in the preference
        const handleChange = (e) => setIsDarkMode(e.matches);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleChange);

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleChange);
        };
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`
        relative transition-all duration-300
        ${isDarkMode
                ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50"
            }
        shadow-lg
      `}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold transform transition-all duration-300 hover:scale-105"
                    >
                        <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                            ...CareerBuddy
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-6 text-lg">
                        {["Privacy Policy", "Terms", "Contact"].map((item, index) => (
                            <Link
                                key={index}
                                to={`/${item.toLowerCase().replace(" ", "-")}`}
                                className={`
                    relative transition-all duration-300
                    ${isDarkMode ? "text-gray-300 hover:text-teal-400" : "text-gray-700 hover:text-teal-600"}
                    after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:bottom-0
                    after:bg-gradient-to-r after:from-teal-500 after:to-blue-500
                    after:transition-all after:duration-300
                    after:scale-x-0 hover:after:scale-x-100
                  `}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className={`
              text-sm
              ${isDarkMode ? "text-gray-400" : "text-gray-600"}
            `}>
                        © {currentYear} CareerBuddy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;