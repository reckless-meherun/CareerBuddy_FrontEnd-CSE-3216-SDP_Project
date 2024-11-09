import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import LoginLeft from '../components/LoginLeft';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const { handleLogin, loading, error } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(darkModePreference);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin({ email, password });
            console.log('Login successful');
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <LoginLeft />
            <div className={`flex flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 md:w-1/2`}>
                <div className="w-full max-w-md">
                    <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Welcome to CareerBuddy
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                                required
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                                required
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
                            <a href="#" className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline mt-2 block text-right`}>
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-3 mt-4 rounded-md ${isDarkMode ? 'bg-teal-600 text-gray-200 hover:bg-teal-700' : 'bg-teal-500 text-black hover:bg-teal-600'}`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        <div className="flex items-center justify-center mt-4">
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</span>
                        </div>
                        <button
                            type="button"
                            className={`w-full p-3 flex items-center justify-center border rounded-md mt-2 ${isDarkMode ? 'bg-lightGrey text-gray-200 hover:bg-darkGrey' : 'border-lightGrey hover:bg-darkGrey'}`}
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
