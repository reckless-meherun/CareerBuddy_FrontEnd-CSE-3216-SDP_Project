import { useState } from "react";

function AddCompanyDialog({ isOpen, onClose, onSubmit }) {
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-700 rounded-lg shadow-xl dark:shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                    🏢 Add New Company
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit({ companyName, industry, location, description });
                    }}
                    className="space-y-4"
                >
                    <div>
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

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                            📊 Industry
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                            required
                        />
                    </div>

                    <div>
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

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">
                            📝 Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-lg"
                            rows="4"
                            placeholder="Brief description about the company"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-6 font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600 shadow-md dark:shadow-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-6 font-semibold rounded-lg text-black dark:text-white bg-lightTeal dark:bg-darkTeal hover:bg-darkTeal dark:hover:bg-darkGrey shadow-md dark:shadow-lg"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCompanyDialog;
