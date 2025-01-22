import { useEffect, useState } from "react";
import UserStorage from "@/utilities/UserStorage";
import { useProfile } from "../hooks/profile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BellRing, BookMarked, CalendarDays, ChartNoAxesCombined, CircleUserRound, ClipboardCheck, ClipboardPlus, History, Store, UserRoundPen, UserRoundPlus } from "lucide-react";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import CuteButton from "@/components/CuteButton";

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

    interface DashboardButtonProps {
        onClick: () => void;
        title: string;
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        width?: string; // Optional width for the button
        height?: string; // Optional height for the button
        iconSize?: string; // Optional size for the icon
    }

    const DashboardButton: React.FC<DashboardButtonProps> = ({
        onClick,
        title,
        Icon,
        width = "100%", // Default width
        height = "auto", // Default height
        iconSize = "80px", // Default icon size
    }) => {
        return (
            <div
                onClick={onClick}
                className={`
              m-4 p-6 rounded-lg
              flex justify-between items-center px-8
              cursor-pointer
              transition-all duration-300
      
              /* Light mode */
              bg-gradient-to-r from-white via-teal-50 to-white
              hover:from-teal-500 hover:via-teal-400 hover:to-blue-500
              text-gray-800 hover:text-white
              shadow-lg hover:shadow-xl
      
              /* Dark mode */
              dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
              dark:hover:from-teal-600 dark:hover:via-teal-500 dark:hover:to-blue-600
              dark:text-white dark:shadow-2xl
      
              /* Hover effect */
              hover:scale-105
            `}
                style={{ width, height }} // Apply custom width and height
            >
                <span className="font-semibold text-xl">{title}</span>
                <Icon className={`w-[100px] h-[100px] transition-transform duration-300 group-hover:rotate-3`} />
            </div>
        );
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
        <div className="flex flex-wrap lg:flex-nowrap bg-gray-100 dark:bg-gray-500 min-h-screen text-gray-800 dark:text-gray-100">
            <div className="flex-1 bg-gray-200 dark:bg-gray-800 p-8 w-full lg:w-[700px] h-full lg:h-5/6">
                <div className="border-8 dark:border-2 dark:border-white bg-white dark:bg-transparent shadow-lg lg:mb-10 p-6 rounded-lg w-full">
                    <h2 className="flex justify-center items-center gap-2 mb-8 font-bold text-2xl text-center sm:text-3xl">
                        <CircleUserRound className="w-12 h-12" /> {profile.userType} Profile
                    </h2>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={profile.profileImage}
                                alt="Profile Photo"
                                className="shadow-md rounded-lg w-20 sm:w-32 h-20 sm:h-32 object-cover"
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                            <label className="right-2 bottom-2 absolute bg-lightTeal hover:bg-darkTeal dark:hover:bg-darkGrey dark:bg-darkTeal p-2 rounded-lg font-semibold text-black text-xs dark:text-white cursor-pointer">
                                <input type="file" className="hidden" onChange={handleImageChange} />
                                Edit
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4 mx-auto w-full max-w-3xl">
                        {/* Email */}
                        <div>
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">
                                📧 Email
                            </label>
                            <input
                                type="text"
                                value={profile.email}
                                readOnly
                                className="border-gray-300 bg-gray-100 dark:bg-gray-800 p-3 border rounded-lg w-full dark:text-gray-300 cursor-not-allowed"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">📝 Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                            />
                        </div>

                        {/* User Type */}
                        <div>
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">🧑‍💼  View As</label>
                            <select
                                value={profile.userType}
                                onChange={(e) => setProfile({ ...profile, userType: e.target.value })}
                                className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                            >
                                <option value="Recruiter">Recruiter</option>
                                <option value="Applicant">Applicant</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">🏠 Address Line 1</label>
                            <input
                                type="text"
                                value={profile.address.line1}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        address: { ...profile.address, line1: e.target.value },
                                    })
                                }
                                className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 w-full dark:text-gray-300 focus:outline-none"
                            />
                        </div>

                        {/* City & Country */}
                        <div className="gap-4 grid grid-cols-2">
                            <div>
                                <label className="block font-semibold text-gray-600 dark:text-gray-300">🏙️ City</label>
                                <input
                                    type="text"
                                    value={profile.address.city}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            address: { ...profile.address, city: e.target.value },
                                        })
                                    }
                                    className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 dark:text-gray-300"> 🌍 Country</label>
                                <input
                                    type="text"
                                    value={profile.address.country}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            address: { ...profile.address, country: e.target.value },
                                        })
                                    }
                                    className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Ready Skills */}
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 text-lg dark:text-gray-200">
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
                                    <h5 className="mb-2 font-semibold text-gray-800 text-lg dark:text-gray-200">
                                        User Skills:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.readySkills.map((skill) => (
                                            <Chip
                                                key={skill.id}
                                                label={skill.name}
                                                className="bg-blue-100 shadow-sm rounded-lg font-medium text-blue-700 text-xs"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                        {/* New Skills */}
                        <div>
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">📚 New Skills</label>
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
                                        className="flex-1 border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl mr-2 p-3 border rounded-lg dark:text-gray-300"
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
                                ➕ Add Skill
                            </button>
                        </div>

                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handleProfileUpdate}
                            className={`px-6 py-4 h-[50px] text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}>
                            {isProfileCreated ? "Update Profile" : "Create Profile"}
                        </button>
                        <button
                            onClick={() => navigate("/build-resume")}
                            className={`px-6 py-4 h-[50px] w-[240px] text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}
                        >
                            Build Your Resume
                        </button>

                    </div>
                </div>

            </div>
            {profile.userType == 'Recruiter' ? (
                <div className="flex-1 bg-gray-200 dark:bg-gray-800 p-4 w-full min-h-screen">
                    <div className="flex flex-col justify-evenly min-h-screen">
                        <DashboardButton
                            onClick={addPostPage}
                            title="Create A Job Post"
                            Icon={ClipboardPlus}
                            height="200px"
                        />
                        <DashboardButton
                            onClick={addCompanyPage}
                            title="Add A New Company"
                            Icon={UserRoundPlus}
                            height="200px"
                        />
                        {/* <div
                            className="flex justify-between items-center border-8 bg-white hover:bg-darkTeal dark:hover:bg-darkGrey dark:bg-darkTeal shadow-xl dark:shadow-2xl m-4 px-8 py-3 rounded-lg h-full font-semibold text-black dark:text-white cursor-pointer"
                            onClick={() => navigate("/recent-job-posts-table")}
                            >
                            <span className="text-xl">Recent Job Posts</span>
                            <History className="flex w-[60px] h-[60px]" />
                            </div> */}

                        <DashboardButton
                            onClick={() => navigate("/companies-table")}
                            title="My Companies"
                            Icon={Store}
                            height="200px"
                        />
                        <DashboardButton
                            onClick={() => navigate("/statistics")}
                            title="Statistics"
                            Icon={ChartNoAxesCombined}
                            height="200px"
                        />
                    </div>
                </div>

            ) : (
                <div className="flex-1 bg-gray-200 dark:bg-gray-800 p-4 w-[200px]">
                    <div className="flex flex-col justify-evenly h-full">
                        <DashboardButton
                            onClick={() => navigate("/applied-jobs-table")}
                            title="Applied Jobs"
                            Icon={ClipboardCheck}
                            height="140px"
                        />
                        <DashboardButton
                            onClick={() => navigate(`/job-recommendations/${profileId}`)}
                            title="Recommended Jobs"
                            Icon={UserRoundPen}
                            height="140px"
                        />
                        <DashboardButton
                            onClick={() => navigate("/my-calendar")}
                            title="My Calendar"
                            Icon={CalendarDays}
                            height="140px"
                        />
                        <DashboardButton
                            onClick={() => navigate(`/saved-jobs/${profileId}`)}
                            title="Saved Jobs"
                            Icon={BookMarked}
                            height="140px"
                        />
                        <DashboardButton
                            onClick={() => navigate("/subscribed-companies")}
                            title="Subscribed Companies"
                            Icon={BellRing}
                            height="140px"
                        />

                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileRecruiter;
