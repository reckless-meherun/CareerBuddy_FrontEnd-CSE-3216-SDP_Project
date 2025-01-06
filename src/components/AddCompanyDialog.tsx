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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
            <div className="p-8 max-w-7xl mx-auto">
                <div className="p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                        🏢 Add New Company
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Name and Location */}
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    🏢 Company Name
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    🌍 Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company Size, Phone Number, and Email */}
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    🏢 Company Size
                                </label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                >
                                    <option value="SMALL">Small</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LARGE">Large</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    📞 Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    📧 Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Domain and Website */}
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    🏢 Domain
                                </label>
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    🌐 Website
                                </label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                📝 Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                rows="4"
                            ></textarea>
                        </div>

                        {/* Founding and Registration Years */}
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    📅 Founding Year
                                </label>
                                <input
                                    type="date"
                                    value={foundationYear}
                                    onChange={(e) => setFoundationYear(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                    📅 Registration Year
                                </label>
                                <input
                                    type="text"
                                    value={registrationYear}
                                    onChange={(e) => setRegistrationYear(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Active Checkbox */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                className="h-5 w-5 accent-teal-500"
                            />
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Active
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-300"
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
