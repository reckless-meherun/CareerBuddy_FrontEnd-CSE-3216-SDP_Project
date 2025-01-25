import React from "react";

const ExperienceDetails = ({ experiences, setProfile }) => {
    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = experiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        setProfile((prev) => ({ ...prev, experiences: updatedExperiences }));
    };

    const addExperience = () => {
        setProfile((prev) => ({
            ...prev,
            experiences: [
                ...prev.experiences,
                {
                    title: "",
                    companyName: "",
                    city: "",
                    state: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    workSummary: "",
                },
            ],
        }));
    };

    const removeExperience = (index) => {
        setProfile((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mb-6">
            <h5 className="mb-2 font-semibold text-gray-800 text-lg dark:text-gray-200">Work Experience</h5>
            {experiences.map((exp, index) => (
                <div key={index} className="dark:bg-gray-800 mb-4 p-4 border rounded-lg">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                            className="flex-1 border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={exp.companyName}
                            onChange={(e) =>
                                handleExperienceChange(index, "companyName", e.target.value)
                            }
                            className="flex-1 border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                    </div>
                    <div className="flex gap-4 mt-2">
                        <input
                            type="text"
                            placeholder="City"
                            value={exp.city}
                            onChange={(e) => handleExperienceChange(index, "city", e.target.value)}
                            className="flex-1 border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={exp.state}
                            onChange={(e) => handleExperienceChange(index, "state", e.target.value)}
                            className="flex-1 border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                    </div>
                    <div className="flex gap-4 mt-2">
                        <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                            className="border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                        <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                            className="border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                            disabled={exp.currentlyWorking}
                        />
                    </div>
                    <div className="mt-2">
                        <textarea
                            placeholder="Work Summary"
                            value={exp.workSummary}
                            onChange={(e) =>
                                handleExperienceChange(index, "workSummary", e.target.value)
                            }
                            className="border-gray-300 dark:bg-gray-800 p-2 border rounded-lg w-full dark:text-gray-300"
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={exp.currentlyWorking}
                                onChange={(e) =>
                                    handleExperienceChange(
                                        index,
                                        "currentlyWorking",
                                        e.target.checked
                                    )
                                }
                                className="mr-2"
                            />
                            Currently Working
                        </label>
                        <button
                            type="button"
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            - Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addExperience}
                className={`
                    m-4 rounded-lg
                    flex justify-center items-center
                    cursor-pointer
                    transition-all duration-300
                    h-[40px] w-[135px]
        
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
                + Add Experience
            </button>
        </div>
    );
};

export default ExperienceDetails;
