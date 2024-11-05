import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

function Login() {
    const [isDarkMode, setIsDarkMode] = useState(false);

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
            <div className={`hidden md:flex md:w-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-green-200'} items-center justify-center p-10`}>
                <div className="text-center">
                    <img
                        src="/image.png" // replace this with the path to your illustration
                        alt="Illustration"
                        className="mx-auto w-2/3"
                    />
                    <h2 className={`text-2xl font-semibold mt-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Maecenas mattis egestas
                    </h2>
                    <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Erudum et malesuada fames ac ante ipsum primis in faucibus suspendisse porta.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className={`flex flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 md:w-1/2`}>
                <div className="w-full max-w-md">
                    <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Welcome to CareerBuddy
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Username or Email
                            </label>
                            <input
                                type="text"
                                placeholder="David Brooks"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                            <a href="#" className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline mt-2 block text-right`}>
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-3 mt-4 rounded-md ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                        >
                            Sign in
                        </button>
                        <div className="flex items-center justify-center mt-4">
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</span>
                        </div>
                        <button
                            type="button"
                            className={`w-full p-3 flex items-center justify-center border rounded-md mt-2 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600' : 'border-gray-300 hover:bg-gray-100'}`}
                        >
                            <FaGoogle className="text-red-500 mr-2" />
                            Sign in with Google
                        </button>
                        <div className="text-center mt-4">
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>New to CareerBuddy?</span>{' '}
                            <a href="/signup" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline`}>
                                Create Account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
