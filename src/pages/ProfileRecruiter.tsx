import { useEffect, useState } from "react";
import UserStorage from "@/utilities/UserStorage";
import { useProfile } from "../hooks/profile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BookMarked, CalendarDays, ClipboardCheck, ClipboardPlus, History, Store, UserRoundPen, UserRoundPlus } from "lucide-react";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string; };

function ProfileRecruiter() {
    const { getProfile, makeProfile, fetchSkills, useFetchSkills, useUpdateProfile } = useProfile();
    const [skills, setSkills] = useState<SkillDTO[]>([]);
    const [isSkills, setIsSkills] = useState(false);
    const [userSkills, setUserSkills] = useState<SkillDTO[]>([]);
    const [isUserSkills, setIsUserSkills] = useState(false);
    const [profileId, setProfileId] = useState(null);
    const [isRecruter, setRecruter] = useState(false);


    const navigate = useNavigate();
    const user = UserStorage.getUser();
    const [profile, setProfile] = useState({
        profileImage: "human.png",
        email: user?.email || "",
        name: user?.name || "",
        phoneNumber: "01234567899",
        userType: "Recruiter",
        bio: "Software Engineer",
        address: {
            line1: "Corporate Avenue",
            city: "New York",
            country: "USA",
        },
        readySkills: [] as SkillDTO[], // Pre-existing skills
        newSkills: [] as SkillRequest[],   // New skills to add
    });
    const [isProfileCreated, setIsProfileCreated] = useState(true);
    const [isProfile, setIsProfile] = useState(false);

    // const [companies, setCompanies] = useState([
    //     { companyName: "TechCorp", position: "Hiring Manager", joiningDate: "2022-01-15" },
    //     { companyName: "InnovateX", position: "Lead Recruiter", joiningDate: "2023-03-22" },
    // ]);

    // const [postedJobs, setPostedJobs] = useState([
    //     { companyName: "TechCorp", role: "Software Engineer", date: "2024-11-01", applicants: 45 },
    //     { companyName: "InnovateX", role: "Data Scientist", date: "2024-11-03", applicants: 23 },
    //     { companyName: "TechCorp", role: "Product Manager", date: "2024-11-05", applicants: 37 },
    // ]);

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
            const id = user?.id;
            console.log(id)
            // return

            if (!id || isProfile) return;
            setIsProfile(true);

            try {
                const data = await getProfile();
                // console.log(data);
                if (data) {
                    // console.log(data);
                    const { line1, city, country } = parseAddress(data.adress);
                    setProfile({
                        profileImage: "human.png",
                        email: data.email || "recruiter@example.com",
                        name: data.name || "John Doe",
                        userType: data.role || "Applicant",
                        bio: data.bio || "Software Engineer",
                        phoneNumber: data.phoneNumber || "01234567899",
                        address: {
                            line1: line1 || "Corporate Avenue",
                            city: city || "New York",
                            country: country || "USA",
                        },
                        readySkills: data.skillSet || [], // Pre-existing skills
                        newSkills: data.newSkills || [],   // New skills to add
                    });
                    setProfileId(data.id);
                    // if (data.companies) setCompanies(data.companies);
                    // if (data.postedJobs) setPostedJobs(data.postedJobs);
                }
                else {
                    setIsProfileCreated(false);
                }


            } catch (err) {
                console.error("Error fetching profile:", err);
                setIsProfileCreated(false);
            }
        };
        const getSkills = async () => {
            if (isSkills) {
                return;
            }
            setIsSkills(true);
            try {
                const data = await fetchSkills();
                // console.log(data, "Skills");
                setSkills(data);
            }
            catch (err) {
                console.error("Error fetching skills:", err);
                toast.error("Failed to fetch skills");
            }

        };
        const getUserSkills = async () => {
            const id = user?.id;
            // console.log(!id || isUserSkills)
            // return
            setIsUserSkills(true);
            if (!id || isProfile) return;
            try {
                const data = await useFetchSkills(id);
                // console.log(data, "User Skills");
                setUserSkills(data);
            }
            catch (err) {
                console.error("Error fetching user skills:", err);
                toast.error("Failed to fetch user skills");
            }
        }
        getSkills();
        fetchProfile();
        getUserSkills();
    }, [getProfile, fetchSkills, useFetchSkills]);
    const handleSkillChange = (event, selectedSkills) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            readySkills: selectedSkills,
        }));
    };

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
        navigate("/create-company")
    };
    const handleProfileUpdate = async () => {
        if (isProfileCreated) {
            try {

                // console.log(id);
                if (!profileId) throw new Error("User ID not found");

                const { name, email, userType, address, bio, phoneNumber, readySkills, newSkills } = profile;
                // console.log(profile);
                const response = await useUpdateProfile(
                    profileId,
                    name,
                    bio, // Assuming `userType` corresponds to `bio` or a similar field in the backend
                    email,
                    phoneNumber, // Add phoneNumber if needed
                    userType, // Assuming `userType` maps to role
                    `${address.line1}, ${address.city}, ${address.country}`,
                    readySkills,
                    newSkills
                );

                if (response) {
                    setIsProfileCreated(true);
                    toast("Profie Updated successfully!");
                    setIsProfile(false)
                    // console.log("Profile created:", response);
                }
            } catch (err) {
                console.error("Error creating profile:", err);
                toast("Failed to create profile");
                console.log("Error creating profile:", err)
            }

            return;
        }

        try {
            const id = user?.id;
            // console.log(id);
            if (!id) throw new Error("User ID not found");

            const { name, email, userType, address, bio, phoneNumber, readySkills, newSkills } = profile;
            // console.log(profile);
            const response = await makeProfile(
                id,
                name,
                bio, // Assuming `userType` corresponds to `bio` or a similar field in the backend
                email,
                phoneNumber, // Add phoneNumber if needed
                userType, // Assuming `userType` maps to role
                `${address.line1}, ${address.city}, ${address.country}`,
                readySkills,
                newSkills
            );

            if (response) {
                setIsProfileCreated(true);
                toast("Profile created successfully!");
                // console.log("Profile created:", response);
            }
        } catch (err) {
            console.error("Error creating profile:", err);
            toast("Failed to create profile");
            console.log("Error creating profile:", err)
        }
    };

    return (
        <div className="min-h-screen flex flex-wrap lg:flex-nowrap bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="w-full lg:w-[700px] flex-1 h-auto lg:h-5/6 bg-gray-200 dark:bg-gray-800 p-8">
                <div className="w-full p-6  lg:mb-10 border-8 shadow-lg dark:border-2 dark:border-white dark:bg-transparent bg-white rounded-lg ">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                        👔 {profile.userType} Profile
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={profile.profileImage}
                                alt="Profile Photo"
                                className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg object-cover shadow-md"
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
                        {/* Email */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">
                                📧 Email
                            </label>
                            <input
                                type="text"
                                value={profile.email}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-300 cursor-not-allowed"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">📝 Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full p-3 shadow-md dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                            />
                        </div>

                        {/* User Type */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">🧑‍💼  View As</label>
                            <select
                                value={profile.userType}
                                onChange={(e) => setProfile({ ...profile, userType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 shadow-md dark:shadow-2xl"
                            >
                                <option value="Recruiter">Recruiter</option>
                                <option value="Applicant">Applicant</option>
                            </select>
                        </div>

                        {/* Address */}
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
                                shadow-md dark:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                            />
                        </div>

                        {/* City & Country */}
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
                                    className="w-full p-3 shadow-md dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
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
                                    className="w-full p-3 shadow-md dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Ready Skills */}
                        <div>
                            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Add Skills
                            </h5>
                            <Autocomplete
                                multiple
                                options={skills}
                                getOptionLabel={(skill) => skill.name}
                                value={profile.readySkills}
                                onChange={handleSkillChange}
                                className="bg-transparent dark:bg-gray-200 rounded-lg"
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            key={option.id}
                                            label={option.name}
                                            {...getTagProps({ index })}
                                            className="bg-white text-blue-700"
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Select Skills"
                                        className="w-full"
                                    />
                                )}
                            />

                            {/* {profile.readySkills?.length > 0 && (
                                <div className="mt-4">
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                        User Skills:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.readySkills.map((skill) => (
                                            <Chip
                                                key={skill.id}
                                                label={skill.name}
                                                className="bg-blue-100 text-blue-700 text-xs font-medium rounded-lg shadow-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                        {/* New Skills */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300 font-semibold">📚 New Skills</label>
                            {profile.newSkills.map((skill, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={skill.name}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                newSkills: profile.newSkills.map((s, i) =>
                                                    i === index ? { ...s, name: e.target.value } : s
                                                ),
                                            })
                                        }
                                        className="flex-1 p-3 shadow-md dark:shadow-2xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 mr-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProfile({
                                                ...profile,
                                                newSkills: profile.newSkills.filter((_, i) => i !== index),
                                            })
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                    setProfile({
                                        ...profile,
                                        newSkills: [...profile.newSkills, { name: "" }],
                                    })
                                }
                                className="mt-2 text-green-500 hover:text-green-700 font-semibold"
                            >
                                ➕ Add Skill
                            </button>
                        </div>

                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={handleProfileUpdate}
                            className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-lightTeal dark:bg-darkTeal shadow-md dark:shadow-2xl 
                            hover:bg-darkTeal dark:hover:bg-darkGrey"
                        >
                            {isProfileCreated ? "Update Profile" : "Create Profile"}
                        </button>
                        <button className="py-3 px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-lightTeal dark:bg-darkTeal shadow-md dark:shadow-2xl 
                            hover:bg-darkTeal dark:hover:bg-darkGrey"
                            onClick={() => navigate('/build-resume')}
                        >
                            Build Your Resume with AI
                        </button>
                    </div>
                </div>

            </div>
            {/* {profile.userType == 'Recruiter' ? ( */}
            <div className="w-full min-h-screen flex-1 bg-gray-200 dark:bg-gray-800 p-4">
                <div className="flex flex-col justify-evenly min-h-screen">
                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={addPostPage}
                    >
                        <h2 className="text-xl">Create A Job Post</h2><ClipboardPlus className="flex w-[80px] h-[80px]" />
                    </div>
                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={addCompanyPage}
                    >
                        <span className="text-xl">Add A New Company</span>
                        <UserRoundPlus className="flex w-[80px] h-[80px]" />
                    </div>
                    {/* <div
                            className="py-3 border-8 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                            hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                            onClick={() => navigate("/recent-job-posts-table")}
                            >
                            <span className="text-xl">Recent Job Posts</span>
                            <History className="flex w-[60px] h-[60px]" />
                            </div> */}

                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/companies-table")}
                    >
                        <span className="text-xl">My Companies</span>
                        <Store className="flex w-[80px] h-[80px]" />
                    </div>



                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/applied-jobs-table")}
                    >
                        <h2 className="text-xl">Applied Jobs</h2><ClipboardCheck className="flex w-[80px] h-[80px]" />
                    </div>
                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate(`/job-recommendations/${profileId}`)}
                    >
                        <span className="text-xl">Recommended Jobs</span>
                        <UserRoundPen className="flex w-[80px] h-[80px]" />
                    </div>
                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/my-calendar")}
                    >
                        <span className="text-xl">My Calendar</span>
                        <CalendarDays className="flex w-[80px] h-[80px]" />
                    </div>

                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/saved-jobs")}
                    >
                        <span className="text-xl">Saved Jobs</span>
                        <BookMarked className="flex w-[80px] h-[80px]" />
                    </div>

                    <div
                        className="py-3 border-4 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/subscribed-companies")}
                    >
                        <span className="text-xl">Subscribed Companies</span>
                        <BookMarked className="flex w-[80px] h-[80px]" />
                    </div>
                </div>
            </div>

            {/* ) : ( */}
            {/* <div className="w-[200px] flex-1 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <div className="flex flex-col justify-evenly h-full">
                    <div
                    className="py-3 border-8 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                    bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                    hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                    onClick={() => navigate("/applied-jobs-table")}
                    >
                    <h2 className="text-xl">Applied Jobs</h2><ClipboardCheck className="flex w-[60px] h-[60px]" />
                    </div>
                    <div
                    className="py-3 border-8 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                    bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                            onClick={() => navigate(`/job-recommendations/${profileId}`)}
                        >
                        <span className="text-xl">Recommended Jobs</span>
                        <UserRoundPen className="flex w-[60px] h-[60px]" />
                        </div>
                        <div
                        className="py-3 border-8 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                        bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                        hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                        onClick={() => navigate("/recent-job-posts-table")}
                        >
                        <span className="text-xl">My Calender</span>
                        <CalendarDays className="flex w-[60px] h-[60px]" />
                        </div>

                        <div
                            className="py-3 border-8 m-4 h-full flex justify-between items-center px-8 text-black dark:text-white font-semibold rounded-lg 
                            bg-white dark:bg-darkTeal shadow-xl dark:shadow-2xl 
                            hover:bg-darkTeal dark:hover:bg-darkGrey cursor-pointer"
                            onClick={() => navigate("/filtered-jobs")}
                            >
                            <span className="text-xl">Saved Jobs</span>
                            <BookMarked className="flex w-[60px] h-[60px]" />
                            </div>
                            
                            </div>
                            </div> */}
            {/* )} */}

        </div>
    );
}

export default ProfileRecruiter;
