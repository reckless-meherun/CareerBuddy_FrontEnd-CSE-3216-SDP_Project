import React from "react";

const EducationDetails = ({ educations, setProfile }) => {
    console.log(educations)
    const handleEducationChange = (index, field, value) => {
        const updatedEducations = educations.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
        );
        setProfile((prev) => ({ ...prev, educations: updatedEducations }));
    };

    const addEducation = () => {
        setProfile((prev) => ({
            ...prev,
            educations: [
                ...prev.educations,
                {
                    universityName: "",
                    degree: "",
                    major: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        }));
    };

    const removeEducation = (index) => {
        setProfile((prev) => ({
            ...prev,
            educations: prev.educations.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="mb-6">
            <h5 className="mb-2 font-semibold text-gray-800 text-lg dark:text-gray-200">Education</h5>
            {educations.map((edu, index) => (
                <div key={index} className="dark:bg-gray-800 mb-4 p-4 border rounded-lg">
                    <input
                        type="text"
                        placeholder="University Name"
                        value={edu.universityName}
                        onChange={(e) => handleEducationChange(index, "universityName", e.target.value)}
                        className="border-gray-300 dark:bg-gray-800 mb-2 p-2 border rounded-lg w-full dark:text-gray-300"
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        className="border-gray-300 dark:bg-gray-800 mb-2 p-2 border rounded-lg w-full dark:text-gray-300"
                    />
                    <input
                        type="text"
                        placeholder="Major"
                        value={edu.major}
                        onChange={(e) => handleEducationChange(index, "major", e.target.value)}
                        className="border-gray-300 dark:bg-gray-800 mb-2 p-2 border rounded-lg w-full dark:text-gray-300"
                    />
                    <div className="flex gap-4">
                        <input
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                            className="border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                        <input
                            type="date"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                            className="border-gray-300 dark:bg-gray-800 p-2 border rounded-lg dark:text-gray-300"
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                        className="border-gray-300 dark:bg-gray-800 mt-2 p-2 border rounded-lg w-full dark:text-gray-300"
                    />
                    <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="mt-2 text-red-500 hover:text-red-700"
                    >
                        - Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addEducation}
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
                + Add Education
            </button>
        </div>
    );
};

export default EducationDetails;
