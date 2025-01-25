import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { CircleUserRound } from "lucide-react";
import ExperienceDetails from "./ExperienceDetails";
import EducationDetails from "./Educationaldetails";
import { toast } from "react-toastify";

const ProfileDetails = ({
    profile,
    setProfile,
    handleImageChange,
    handleSkillChange,
    handleProfileUpdate,
    isProfileCreated,
    skills,
    navigate,
    profileId,
}) => {
    const handleUserTypeChange = (e) => {
        const userType = e.target.value;
        setProfile({ ...profile, userType }); // Update state
        localStorage.setItem("userType", userType); // Store in localStorage
    };
    return (
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
                        <label className="block font-semibold text-gray-600 dark:text-gray-300">
                            📝 Name
                        </label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                        />
                    </div>

                    {/* User Type */}
                    <div>
                        <label className="block font-semibold text-gray-600 dark:text-gray-300">
                            🧑‍💼 View As
                        </label>
                        <select
                            value={profile.userType}
                            onChange={handleUserTypeChange}
                            className="border-gray-300 dark:bg-gray-800 shadow-md dark:shadow-2xl p-3 border rounded-lg w-full dark:text-gray-300"
                        >
                            <option value="Recruiter">Recruiter</option>
                            <option value="Applicant">Applicant</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block font-semibold text-gray-600 dark:text-gray-300">
                            🏠 Address Line 1
                        </label>
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
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">
                                🏙️ City
                            </label>
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
                            <label className="block font-semibold text-gray-600 dark:text-gray-300">
                                🌍 Country
                            </label>
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

                    </div>

                </div>
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
            h-[50px] w-[130px]

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
                <div>
                    <ExperienceDetails experiences={profile.experiences} setProfile={setProfile} />
                    <EducationDetails educations={profile.educations} setProfile={setProfile} />
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleProfileUpdate}
                        className={`
            px-6 py-4 text-white
            bg-gradient-to-r from-teal-500 to-blue-500
            rounded-lg shadow-md transform transition-all duration-300
            hover:scale-105 hover:shadow-lg active:scale-95
        `}
                    >
                        {isProfileCreated ? "Update Profile" : "Create Profile"}
                    </button>
                    <button
                        onClick={() => {
                            if (profileId) {
                                navigate(`/build-resume/${profileId}`);
                            }
                            else{
                                toast.error("Error: profileId is undefined");
                            }
                        }}
                        className={`
            px-6 py-4 w-[240px] text-white
            bg-gradient-to-r from-teal-500 to-blue-500
            rounded-lg shadow-md transform transition-all duration-300
            hover:scale-105 hover:shadow-lg active:scale-95
        `}
                    >
                        Build Your Resume
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfileDetails;
