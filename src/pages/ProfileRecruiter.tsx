import { useEffect, useState } from "react";
import JobPostDialog from "./JobPostDialog";

import { useProfile } from "../hooks/profile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function ProfileRecruiter() {
    const { loading, error, getProfile, makeProfile } = useProfile();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        profileImage: "human.png",
        email: localStorage.getItem("email")||"",
        name: "John Doe",
        phoneNumber:"01234567899",
        userType: "Recruiter",
        bio:"Software Engineer",
        address: {
            line1: "Corporate Avenue",
            city: "New York",
            country: "USA",
        },
    });
    const[isProfileCreated, setIsProfileCreated] = useState(true);

    const [companies, setCompanies] = useState([
        { companyName: "TechCorp", position: "Hiring Manager", joiningDate: "2022-01-15" },
        { companyName: "InnovateX", position: "Lead Recruiter", joiningDate: "2023-03-22" },
    ]);

    const [postedJobs, setPostedJobs] = useState([
        { companyName: "TechCorp", role: "Software Engineer", date: "2024-11-01", applicants: 45 },
        { companyName: "InnovateX", role: "Data Scientist", date: "2024-11-03", applicants: 23 },
        { companyName: "TechCorp", role: "Product Manager", date: "2024-11-05", applicants: 37 },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);

    const [newJob, setNewJob] = useState({ companyName: "", role: "" });
    const [newCompany, setNewCompany] = useState({ name: "", industry: "", location: "" });
    const parseAddress = (addressString: string) => {
        if (!addressString) {
            return { line1: "", city: "", country: "" };  // Return default values if address is not valid
        }
        const [line1, city, country] = addressString.split(',').map(part => part.trim());
        return { line1, city, country };
    };

    // Fetch recruiter profile
    useEffect(() => {
        const fetchProfile = async () => {
            const id = localStorage.getItem("id");
            if (!id || !isProfileCreated) return;


            try {
                const data = await getProfile(id);
                // console.log(data);
                if(data){
                    // console.log(data.address);
                    const{line1,city,country} = parseAddress(data.address);
                    setProfile({
                        profileImage: "human.png",
                        email: data.email || "recruiter@example.com",
                        name: data.name || "John Doe",
                        userType: data.role || "Recruiter",
                        bio: data.bio || "Software Engineer",
                        phoneNumber: data.phoneNumber || "01234567899",
                        address: {
                            line1: line1||"Corporate Avenue",
                            city: city||"New York",
                            country: country||"USA",
                        } 
                });
                    if (data.companies) setCompanies(data.companies);
                    if (data.postedJobs) setPostedJobs(data.postedJobs);
                }
                else{
                    setIsProfileCreated(false);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setIsProfileCreated(false);
            }
        };

        fetchProfile();
    }, [getProfile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
        }
    };
    const addPostPage = () => {
        navigate("/post-job")
    }


    const addCompanyPage = () => {
        navigate("/cerate-company")
    };
    const handleProfileUpdate = async () => {
        if (isProfileCreated) {
            toast("Profile already created");
            return;
        }

        try {
            const id = localStorage.getItem("id");
            console.log(id);
            if (!id) throw new Error("User ID not found");

            const { name, email, userType, address,bio,phoneNumber } = profile;
            console.log(profile);
            const response = await makeProfile(
                id,
                name,
                bio, // Assuming `userType` corresponds to `bio` or a similar field in the backend
                email,
                phoneNumber, // Add phoneNumber if needed
                userType, // Assuming `userType` maps to role
                `${address.line1}, ${address.city}, ${address.country}`
            );

            if(response){
                setIsProfileCreated(true);
                toast.success("Profile created successfully!");
                console.log("Profile created:", response);
            }
        } catch (err) {
            console.error("Error creating profile:", err);
            toast.error("Failed to create profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="w-full h-5/6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="w-full p-8 mb-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h2 className="text-3xl sm:text-3xl font-bold text-center mb-8">👔 {profile.userType} Profile</h2>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={profile.profileImage}
                                alt="Profile Photo"
                                className="w-32 h-32 rounded-lg object-cover shadow-md"
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                            <label className="absolute bottom-2 right-2 p-2 font-semibold rounded-lg cursor-pointer text-xs 
                                bg-lightTeal dark:bg-darkTeal 
                                hover:bg-darkTeal dark:hover:bg-darkGrey 
                                text-black dark:text-white">
                                <input type="file" className="hidden" onChange={handleImageChange} />
                                Edit
                            </label>
                        </div>
                    </div>

                    <div className="w-full max-w-3xl mx-auto space-y-4">
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">📧 Email</label>
                            <input
                                type="text"
                                value={profile.email}
                                readOnly
                                className="w-full p-3 shadow-xl dark:shadow-2xl border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">📝 Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full p-3 shadow-xl dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">🧑‍💼 User Type</label>
                            <select
                                value={profile.userType}
                                onChange={(e) => setProfile({ ...profile, userType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 shadow-xl dark:shadow-2xl"
                            >
                                <option value="Recruiter">Recruiter</option>
                                <option value="Applicant">Applicant</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">🏠 Address Line 1</label>
                            <input
                                type="text"
                                value={profile.address.line1}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        address: { ...profile.address, line1: e.target.value },
                                    })
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 
                                shadow-xl dark:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300 font-semibold">🏙️ City</label>
                                <input
                                    type="text"
                                    value={profile.address.city}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            address: { ...profile.address, city: e.target.value },
                                        })
                                    }
                                    className="w-full p-3 shadow-xl dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 dark:text-gray-300 font-semibold"> 🌍 Country</label>
                                <input
                                    type="text"
                                    value={profile.address.country}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            address: { ...profile.address, country: e.target.value },
                                        })
                                    }
                                    className="w-full p-3 shadow-xl dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleProfileUpdate}
                            className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-lightTeal dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                            hover:bg-darkTeal dark:hover:bg-darkGrey"
                        >
                            {isProfileCreated ? "Update Profile" : "Create Profile"}
                        </button>
                    </div>
                </div>
                {/* Create Job Post Button */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-lightTeal dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey"
                        onClick={addPostPage}
                    >
                        Create Job Post
                    </button>
                    <button
                        className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-lightTeal dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey"
                        onClick={addCompanyPage}
                    >
                        Add New Company
                    </button>
                </div>

                {/* Job Post Dialog */}
                

                {/* {/* Company Dialog */}
                

                {/* Companies Table */}
                {/* Companies Table */}
                <div className="w-full p-8 mt-10 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">🏢 Companies Involved</h3>
                    <table className="w-full shadow-xl dark:shadow-2xl text-left border-collapse border-spacing-2 rounded-lg">
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
                    <table className="w-full shadow-xl dark:shadow-2xl text-left border-collapse border-spacing-2 rounded-lg">
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
