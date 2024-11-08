import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import LoginLeft from '../components/LoginLeft';

function SignUp() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [password1, setPassword1] = useState("");



    useEffect(() => {
        // Check the user's system preference for dark mode
        const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(darkModePreference);

        // Listen for changes in the system preference
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

        // Clean up the event listener on component unmount
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Left Side - Illustration and Text */}
            <LoginLeft/>


            {/* Right Side - Sign Up Form */}
            <div className={`flex flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 md:w-1/2`}>
                <div className="w-full max-w-md">
                    <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Create Your Account
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                            <label className="flex items-center space-x-2 p-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={isPasswordVisible}
                                    onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="text-blue-500 focus:outline-none focus:ring-0"
                                />
                                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>Show Password</span>
                            </label>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Confirm Password
                            </label>
                            <input
                                type={isPasswordVisible1 ? "text" : "password"}
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword1(e.target.value)}
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                            <label className="flex items-center space-x-2 p-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={isPasswordVisible1}
                                    onChange={() => setIsPasswordVisible1(!isPasswordVisible1)}
                                    className="text-blue-500 focus:outline-none focus:ring-0"
                                />
                                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>Show Password</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-3 mt-4 rounded-md ${isDarkMode ? 'bg-darkTeal text-gray-200 hover:bg-darkGrey' : 'bg-lightTeal text-black hover:bg-darkTeal'}`}
                        >
                            Sign up
                        </button>
                        <div className="flex items-center justify-center mt-4">
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</span>
                        </div>
                        <button
                            type="button"
                            className={`w-full p-3 flex items-center justify-center border rounded-md mt-2 ${isDarkMode ? 'bg-lightGrey text-gray-200 hover:bg-darkGrey' : 'border-lightGrey hover:bg-darkGrey'}`}
                        >
                            <FaGoogle className="text-red-500 mr-2" />
                            Sign up with Google
                        </button>
                        <div className="text-center mt-4">
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Already have an account?</span>{' '}
                            <a href="/login" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline`}>
                                Sign in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
