import { useState } from "react";

function ProfileRecruiter() {
    const [profileImage, setProfileImage] = useState("/path/to/your/default/profileImage.jpg");
    const [email, setEmail] = useState("recruiter@example.com");
    const [name, setName] = useState("John Doe");
    const [userType, setUserType] = useState("Recruiter");
    const [address, setAddress] = useState({
        line1: "Corporate Avenue",
        city: "New York",
        country: "USA"
    });

    const [companies, setCompanies] = useState([
        { companyName: "TechCorp", position: "Hiring Manager", joiningDate: "2022-01-15" },
        { companyName: "InnovateX", position: "Lead Recruiter", joiningDate: "2023-03-22" },
    ]);

    const [postedJobs, setPostedJobs] = useState([
        { companyName: "TechCorp", role: "Software Engineer", date: "2024-11-01", applicants: 45 },
        { companyName: "InnovateX", role: "Data Scientist", date: "2024-11-03", applicants: 23 },
        { companyName: "TechCorp", role: "Product Manager", date: "2024-11-05", applicants: 37 },
    ]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="w-full h-5/6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="w-full p-8 mb-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h2 className="text-3xl sm:text-3xl font-bold text-center mb-8">👔 Recruiter Profile</h2>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={profileImage}
                                alt="Profile Photo"
                                className="w-32 h-32 rounded-lg object-cover shadow-md"
                                style={{ backgroundColor: "#f0f0f0" }}
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
                                <option value="Recruiter">Recruiter</option>
                                <option value="Applicant">Applicant</option>
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

                {/* Companies Table */}
                {/* Companies Table */}
                <div className="w-full p-8 mt-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">🏢 Companies Involved</h3>
                    <table className="w-full text-left border-collapse border-spacing-2 rounded-lg">
                        <thead>
                            <tr className="bg-[#d0fcf4] dark:bg-[#558b88]">
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg text-center">Company Name</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Position</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg text-center">Joining Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{company.companyName}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{company.position}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{company.joiningDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recently Posted Jobs Table */}
                {/* Recently Posted Jobs Table */}
                <div className="w-full p-8 mt-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">📄 Recently Posted Jobs</h3>
                    <table className="w-full text-left border-collapse border-spacing-2 rounded-lg">
                        <thead>
                            <tr className="bg-[#d0fcf4] dark:bg-[#558b88]">
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg text-center">Company Name</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Role</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Date</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 text-center">Applicants</th>
                                <th className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postedJobs.map((job, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.companyName}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.role}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.date}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">{job.applicants}</td>
                                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 text-center">
                                        <button
                                            className="py-2 px-4 font-semibold rounded-lg
                            bg-lightTeal dark:bg-darkTeal
                            hover:bg-darkTeal dark:hover:bg-darkGrey
                            text-black dark:text-white"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ProfileRecruiter;