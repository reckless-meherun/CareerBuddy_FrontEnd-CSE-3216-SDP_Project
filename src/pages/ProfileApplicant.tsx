import { useState } from "react";

function ProfileApplicant() {
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

    const [appliedJobs, setAppliedJobs] = useState([
        { date: "2024-11-01", role: "Software Developer", company: "TechCorp", status: "Pending" },
        { date: "2024-11-03", role: "Data Analyst", company: "DataSolutions", status: "Interview Scheduled" },
        { date: "2024-11-05", role: "UI/UX Designer", company: "CreativeWorks", status: "Accepted" },
        { date: "2024-11-07", role: "Project Manager", company: "BizCorp", status: "Rejected" },
    ]);

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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="w-full h-5/6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="w-full p-8 mb-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h2 className="text-3xl sm:text-3xl font-bold text-center mb-8">👩‍💻My Profile</h2>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={profileImage}
                                alt="Profile Photo"
                                className="w-32 h-32 rounded-lg object-cover shadow-md"
                                style={{ backgroundColor: "#f0f0f0" }} // Light background for visibility in dark theme
                            />
                            <label
                                className="absolute bottom-2 right-2 p-2 font-semibold rounded-lg cursor-pointer text-xs 
                                bg-lightTeal dark:bg-darkTeal 
                                hover:bg-darkTeal dark:hover:bg-darkGrey                                 
                                text-black dark:text-white"
                            >
                                <input type="file" className="hidden" onChange={handleImageChange} />
                                Edit
                            </label>


                        </div>
                    </div>

                    <div className="w-full max-w-3xl mx-auto space-y-4">
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">📧 Email</label>
                            <input type="text" value={email} readOnly className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 cursor-not-allowed" />
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">📝 Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">🧑‍💼 User Type</label>
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
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">🏠 Address Line 1</label>
                            <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">🏙️ City</label>
                                <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                            </div>
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold"> 🌍 Country</label>
                                <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">🛠️ Skills (tell us about your priority)</label>
                            {skills.map((skill, index) => (
                                <div key={index} className="mt-2">
                                    <label className="block text-gray-500 dark:text-gray-400 font-semibold">Skill {index + 1}</label>
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
                            <label className="block text-gray-600 dark:text-gray-300 font-medium font-semibold">📄 Upload Resume</label>
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
                            className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-lightTeal dark:bg-darkTeal 
                            hover:bg-darkTeal dark:hover:bg-darkGrey"
                        >
                            Update Profile
                        </button>
                    </div>

                </div>

                {/* Jobs Applied Table */}
                <div className="w-full p-8 mt-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">💼 Jobs Applied</h3>
                    <table className="w-full text-left border-collapse border-spacing-2 rounded-lg">
                        <thead>
                            <tr className="bg-[#d0fcf4] dark:bg-[#558b88]">
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg text-center">Date</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Job Role</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Company</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedJobs.map((job, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.date}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.role}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.company}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.status}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="p-3 border-b text-gray-600 dark:text-gray-300 rounded-bl-lg" colSpan="4"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>




            </div>
        </div>
    );
}

export default ProfileApplicant;