import React, { useEffect } from "react";
import { useState } from "react";
import useCompany from "../hooks/useCompany";
import { useJobPost } from "../hooks/useJobPost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProfile } from '@/hooks/profile';

type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string; };

function JobPostPage() {
    const { getCompanies, loading: companiesLoading, error: companiesError } = useCompany();
    const { handleJobPost, loading: jobPostLoading, error: jobPostError, success } = useJobPost();
    const { fetchSkills } = useProfile();
    const navigate = useNavigate();
    const [iscompanies, setIsCompanies] = useState(false);
    const [newSkillInput, setNewSkillInput] = useState(""); // To manage the new skill input field


    const [companies, setCompanies] = useState([]);
    const [skills, setSkills] = useState<SkillDTO[]>([]);
    const [formData, setFormData] = useState({
        companyId: "",
        title: "",
        description: "",
        location: "",
        experience: 0,
        jobType: "",
        deadline: "",
        salary: 0,
        existingSkills: [] as string[], // IDs of selected existing skills
        newSkills: [] as string[], // Names of new skills
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompanies();
                setCompanies(response);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        const fetchAvailableSkills = async () => {
            try {
                const skills = await fetchSkills();
                setSkills(skills);
            } catch (error) {
                toast.error("Failed to fetch skills");
            }
        };

        if (!iscompanies) {
            fetchCompanies();
            fetchAvailableSkills();
            setIsCompanies(true);
        }
    }, [fetchSkills, getCompanies]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, existingSkills: selectedOptions }));
    };

    const handleAddNewSkill = (skill: string) => {
        if (formData.newSkills.includes(newSkillInput.trim())) {
            toast.error("This skill is already added");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            newSkills: [...prev.newSkills, skill],
        }));
        setNewSkillInput(""); // Clear input field

    };

    const handleRemoveNewSkill = (skill: string) => {
        setFormData((prev) => ({
            ...prev,
            newSkills: prev.newSkills.filter((s) => s !== skill),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDeadline = new Date(formData.deadline).toISOString();

        // Format the data for submission
        const jobPostData = {
            ...formData,
            existingSkills: formData.existingSkills.map((id) => {
                const skill = skills.find((s) => s.id === id);
                if (skill) {
                    return { id: skill.id, name: skill.name }; // Retain SkillDTO format
                }
                throw new Error(`Skill with ID ${id} not found`);
            }),
            newSkills: formData.newSkills.map((name) => ({ name })), // Convert to SkillRequest
            deadline: formattedDeadline,
        };

        handleJobPost(jobPostData)
            .then(() => {
                toast.success("Job post successfully created!");
                navigate("/");
            })
            .catch((error) => {
                console.error("Failed to post job:", error);
                toast.error("Failed to create job post.");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="gap-4 p-4 md:p-10">
                <div className="p-4 md:p-8 rounded-xl shadow-lg border-8">
                    <div className="flex justify-center items-center mb-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Create A Job Post
                        </span>
                    </div>
                    {success && <p className="text-green-500 text-center">Job post created successfully!</p>}
                    {jobPostError && <p className="text-red-500 text-center">{jobPostError}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
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
                            <div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
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
                            <div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
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
                            <div>
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
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium">🛠 Existing Skills</label>
                            <select
                                name="existingSkills"
                                multiple
                                value={formData.existingSkills}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        existingSkills: [...new Set([...prev.existingSkills, ...selectedOptions])],
                                    }));
                                }}
                                className="w-full p-3 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                            >
                                {skills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {/* Display selected skills */}
                                {formData.existingSkills.map((skillId) => {
                                    const skill = skills.find((s) => s.id === skillId);
                                    return skill ? (
                                        <span
                                            key={skill.id}
                                            className="inline-flex text-sm items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-lg "
                                        >
                                            {skill.name}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        existingSkills: prev.existingSkills.filter((id) => id !== skill.id),
                                                    }))
                                                }
                                                className="ml-2 bg-transparent text-red-500 hover:text-red-700 focus:outline-none py-1 px-2"
                                            >
                                                ✖
                                            </button>
                                        </span>
                                    ) : null;
                                })}
                            </div>

                        </div>
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium">➕ New Skills</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a new skill"
                                    value={newSkillInput}
                                    onChange={(e) => setNewSkillInput(e.target.value)}
                                    className="w-full px-2 py-1 shadow-md border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newSkillInput.trim()) {
                                            handleAddNewSkill(newSkillInput); //
                                            setNewSkillInput("");
                                        }
                                    }}
                                    className={`
                                        m-4 rounded-lg
                                        flex justify-center items-center
                                        cursor-pointer
                                        transition-all duration-300
                                        h-[50px] w-[130px] /* Control height and width directly */
                                        
                                        /* Light mode gradient */
                                        bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300
                                        hover:from-gray-300 hover:via-gray-400 hover:to-gray-500
                                        text-gray-800 hover:text-white
                                        shadow-lg hover:shadow-xl
                                        
                                        /* Dark mode gradient */
                                        dark:from-gray-700 dark:via-gray-800 dark:to-gray-900
                                        dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-800
                                        dark:text-white dark:shadow-2xl
                                        
                                        /* Hover effect */
                                        hover:-translate-y-1
                                    `}


                                >
                                    Add
                                </button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.newSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg shadow-md"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            className="ml-2 bg-transparent text-red-500 hover:text-red-700  py-1 px-2"
                                            onClick={() => handleRemoveNewSkill(skill)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className={`px-6 py-4 h-[50px] w-[150px] text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}
                                disabled={jobPostLoading}
                            >
                                {jobPostLoading ? "Posting..." : "Post Job"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>);

}

export default JobPostPage;