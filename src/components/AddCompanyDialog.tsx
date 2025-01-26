import { useState } from "react";
import useCompany from "../hooks/useCompany";
import { toast } from "react-toastify";
import UserStorage from "@/utilities/UserStorage"; // Adjust the path to your UserStorage utility
import { useNavigate, useLocation } from "react-router-dom";

function AddCompanyDialog() {
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [domain, setDomain] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("SMALL");
    const [foundationYear, setFoundationYear] = useState("");
    const [registrationYear, setRegistrationYear] = useState("");
    const [active, setActive] = useState(true);


    const navigate = useNavigate();


    const { handleAddCompany, loading, error } = useCompany();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedFoundationYear = foundationYear ? `${foundationYear}T00:00:00` : null;
        // const formattedRegistrationYear = registrationYear ? `${registrationYear}T00:00:00` : null;
        const user = UserStorage.getUser();
        const userId = user?.id; // Adjust based on your auth implementation



        const companyData = {
            companyName,
            location,
            phoneNumber,
            email,
            website,
            domain,
            description,
            size,
            foundationYear: formattedFoundationYear,
            registrationYear,
            active,
            userId,
        };

        try {
            if (!userId) {
                // Redirect to login if user is not authenticated
                navigate("/login", { state: { from: location.pathname } });
                return;
            }
            await handleAddCompany(companyData);
            toast.success("company added successfully")
            // Clear form after success
            setCompanyName("");
            setLocation("");
            setPhoneNumber("");
            setEmail("");
            setWebsite("");
            setDomain("");
            setDescription("");
            setSize("SMALL");
            setFoundationYear("");
            setRegistrationYear("");
            setActive(true);
        } catch {
            alert("Failed to add the company. Please try again.");
        }

    };

    return (
        <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-300 dark:to-gray-900 mx- min-h-screen text-gray-800 dark:text-gray-100">
            <div className="p-6 md:p-8 lg:p-12 w-full max-w-4xl">
                <div className="border-gray-200 border-8 bg-white dark:bg-gray-800 shadow-xl p-10 border rounded-3xl">

                    <div className="flex justify-center items-center mb-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Add New Company
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Company Name and Location */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    🏢 Company Name
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    🌍 Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter location"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Size, Phone Number, and Email */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    🏢 Company Size
                                </label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                >
                                    <option value="SMALL">Small</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LARGE">Large</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    📞 Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    📧 Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Domain and Website */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    🏢 Domain
                                </label>
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter domain"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                    🌐 Website
                                </label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                    placeholder="Enter website"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-600 text-sm dark:text-gray-300">
                                📝 Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="hover:border-gray-300 bg-gray-100 dark:bg-gray-900 shadow p-4 border border-transparent rounded-xl focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                                rows="4"
                                placeholder="Enter description"
                            ></textarea>
                        </div>

                        {/* Active Checkbox */}
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                className="w-6 h-6 accent-teal-500"
                            />
                            <label className="font-semibold text-gray-600 text-sm dark:text-gray-300">
                                Active
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={
                                    `px-6 py-4 w-[150px] h-[50px] text-white
                                    bg-gradient-to-r from-teal-500 to-blue-500
                                    rounded-lg shadow-md transform transition-all duration-300
                                    hover:scale-105 hover:shadow-lg active:scale-95`
                                }                                
                            >
                                Add Company
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    );
}

export default AddCompanyDialog;
