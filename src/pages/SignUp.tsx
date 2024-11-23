import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import LoginLeft from '../components/LoginLeft';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const { handleSignup, loading, error } = useAuth();

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

  const evaluatePasswordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return "Weak";
    if (hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar) return "Strong";
    if ((hasUpperCase || hasLowerCase) && hasDigit) return "Medium";
    return "Weak";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === password);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordStrength === "Strong" && isPasswordMatch) {
      try {
        const result = await handleSignup({ name, email, password });
        if (result) {
          console.log("Registration successful!", result);
          toast.success("Registration successful!");
          
          //localStorage.setItem("token", result.token);
          navigate("/");
          localStorage.setItem("id", result.id);
          localStorage.setItem("email", result.email);

        }
      } catch (error) {
        toast.error("Error during registration:");
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Password does not meet strength criteria or passwords do not match.");
    }
  };
    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <LoginLeft />
            <div className={`flex flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 md:w-1/2`}>
                <div className="w-full max-w-md">
                    <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Create Your Account
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
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
                                onChange={handlePasswordChange}
                                className={`mt-1 w-full p-3 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:border-blue-500`}
                            />
                            <small className={`${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                Password Strength: {passwordStrength}
                            </small>
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
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
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
                            {!isPasswordMatch && (
                                <small className="text-red-500">Passwords do not match</small>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-3 mt-4 rounded-md ${isDarkMode ? 'bg-teal-600 text-gray-200 hover:bg-teal-700' : 'bg-teal-500 text-black hover:bg-teal-600'}`}
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
