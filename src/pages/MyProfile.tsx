import { useState } from "react";

function MyProfile() {
    const [profileImage, setProfileImage] = useState("/path/to/your/default/profileImage.jpg"); // Replace with the actual image path or import
    const [email, setEmail] = useState("meherun@gmail.com");
    const [name, setName] = useState("Meherun Farzana");
    const [userType, setUserType] = useState("Applicant"); // Default to "Applicant"
    const [address, setAddress] = useState({
        line1: "Dhaka University",
        city: "Dhaka",
        country: "Bangladesh"
    });
    const [skills, setSkills] = useState(["", "", "", "", ""]);
    const [resume, setResume] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file.name); // Store the resume file name for display
        }
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="w-full p-8 md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">👩‍💻My Profile</h2>

                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover shadow-md"
                            style={{ backgroundColor: "#f0f0f0" }} // Light background for visibility in dark theme
                        />
                        <label
                            className="absolute bottom-2 right-2 text-black p-2 rounded-full cursor-pointer text-xs hover:opacity-90"
                            style={{ backgroundColor: "#d0fcf4" }}
                        >
                            <input type="file" className="hidden" onChange={handleImageChange} />
                            Edit
                        </label>
                    </div>
                </div>

                <div className="w-full max-w-3xl mx-auto space-y-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">📧 Email</label>
                        <input type="text" value={email} readOnly className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 cursor-not-allowed" />
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">📝 Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">🧑‍💼 User Type</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                        >
                            <option value="Applicant">Applicant</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">🏠 Address Line 1</label>
                        <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium">🏙️ City</label>
                            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                        </div>
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium"> 🌍 Country</label>
                            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">🛠️ Skills (tell us about your priority)</label>
                        {skills.map((skill, index) => (
                            <div key={index} className="mt-2">
                                <label className="block text-gray-500 dark:text-gray-400">Skill {index + 1}</label>
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium">📄 Upload Resume</label>
                        <input
                            type="file"
                            onChange={handleResumeChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                        />
                        {resume && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploaded: {resume}</p>}
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="py-3 px-8 text-black font-semibold rounded-lg focus:outline-none hover:opacity-90"
                        style={{ backgroundColor: "#d0fcf4" }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
