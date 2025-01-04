import { useState } from "react";
import useCompany from "../hooks/useCompany";
import { toast } from "react-toastify";

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

    const { handleAddCompany, loading, error } = useCompany();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedFoundationYear = foundationYear ? `${foundationYear}T00:00:00` : null;
        // const formattedRegistrationYear = registrationYear ? `${registrationYear}T00:00:00` : null;


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
        };

        try {
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="gap-4 p-10">
                <div className="p-8 rounded-xl shadow-lg border-8">

                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                        🏢 Add New Company
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    🏢 Company Name
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    🌍 Location
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    🏢 Company Size
                                </label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                >
                                    <option value="SMALL">Small</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LARGE">Large</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    📞 Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    📧 Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    🏢 Domain
                                </label>
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    🌐 Website
                                </label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                />
                            </div>

                        </div>
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                📝 Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    📅 Founding Year
                                </label>
                                <input
                                    type="date"
                                    value={foundationYear}
                                    onChange={(e) => setFoundationYear(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                    📅 Registration Year
                                </label>
                                <input
                                    type="text"
                                    value={registrationYear}
                                    onChange={(e) => setRegistrationYear(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                className="h-5 w-5"
                            />
                            <label className="text-gray-600 dark:text-gray-300 font-medium font-semibold">
                                Active
                            </label>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="submit"
                                className="py-2 px-6 font-semibold rounded-lg text-black dark:text-white bg-lightTeal dark:bg-darkTeal hover:bg-darkTeal dark:hover:bg-darkGrey shadow-md dark:shadow-lg"
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
