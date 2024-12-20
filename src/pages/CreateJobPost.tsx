import React, { useEffect } from "react";
import { useState } from "react";
import useCompany from "../hooks/useCompany";
import { useJobPost } from "../hooks/useJobPost";
import { useNavigate } from "react-router-dom";

function JobPostPage() {
    const { getCompanies, loading: companiesLoading, error: companiesError } = useCompany();
    const { handleJobPost, loading: jobPostLoading, error: jobPostError, success } = useJobPost();
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Define the async function inside useEffect
        const fetchCompanies = async () => {
            try {
                const response = await getCompanies();
                console.log(response);
                setCompanies(response); // assuming the response is an array of companies
                //companiesLoading(false); // set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching companies:", error);
                //companiesLoading(false); // in case of error, still stop loading
            }
        };

        // Call the async function
        fetchCompanies();
    }, []);

    const [formData, setFormData] = useState({
        companyId: "",
        title: "",
        description: "",
        location: "",
        experience: 0,
        jobType: "",
        deadline: "",
        salary: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, companyId, description, location, deadline, jobType, salary, experience } = formData;

        // Ensure the deadline is properly formatted (if it's a simple date like '2024-11-30')
        const formattedDeadline = new Date(deadline).toISOString(); // Formats it as 'yyyy-MM-ddTHH:mm:ss.sssZ'

        // Construct the final job post data with formatted date
        const jobPostData = {
            companyId: companyId,  // Assuming companyName is being used for companyId here, adjust if needed
            title: title,
            description: description,
            location: location,
            jobType,
            salary,
            deadline: formattedDeadline,  // Formatted date here
            experience,
        };

        // Call the function that handles the job post submission (make sure handleJobPost is defined)
        handleJobPost(jobPostData);
        alert("Job post successfully");
        navigate("/")
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="gap-4 p-10">
                <div className="p-8 bg-white rounded-xl shadow-lg border-8">
                    <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">📄 Create Job Post</h1>
                    {success && <p className="text-green-500 text-center">Job post created successfully!</p>}
                    {jobPostError && <p className="text-red-500 text-center">{jobPostError}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {companiesLoading ? (
                            <p>Loading companies...</p>
                        ) : companiesError ? (
                            <p className="text-red-500">{companiesError}</p>
                        ) : (
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">🏢 Company</label>
                                <select
                                    name="companyId"
                                    value={formData.companyId}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a company
                                    </option>
                                    {companies.map((company: { id: string; companyName: string }) => (
                                        <option key={company.id} value={company.id}>
                                            {company.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">📌 Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">🌍 Job Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    required
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium">📝 Job Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">🔢 Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">💼 Job Type</label>
                                <input
                                    type="text"
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">💰 Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-600 dark:text-gray-300 font-medium">📅 Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                    required
                                />
                            </div>
                        </div>


                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="py-2 px-6 font-semibold rounded-lg text-black dark:text-white bg-lightTeal dark:bg-darkTeal hover:bg-darkTeal dark:hover:bg-darkGrey shadow-md dark:shadow-lg"
                                disabled={jobPostLoading}
                            >
                                {jobPostLoading ? "Posting..." : "Post Job"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobPostPage;