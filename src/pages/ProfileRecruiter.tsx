import { useEffect, useState } from "react";
import UserStorage from "@/utilities/UserStorage";
import { useProfile } from "../hooks/profile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";
import ProfileDetails from "@/components/profileDetailComponent";
import RecruiterDashboard from "@/components/RecuitersComponent";
import ApplicantDashboard from "@/components/ApplicantsDashboard";

type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string };
type Experience = {
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummary: string;
};
type Education = {
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
};

function ProfileRecruiter() {
    const { getProfile, makeProfile, fetchSkills, useFetchSkills, useUpdateProfile, useUploadPhoto } = useProfile();
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
        userType: localStorage.getItem("userType") || "Recruiter", // Initialize from localStorage
        bio: "Software Engineer",
        address: {
            line1: "Corporate Avenue",
            city: "New York",
            country: "USA",
        },
        readySkills: [] as SkillDTO[], // Pre-existing skills
        newSkills: [] as SkillRequest[], // New skills to add
        experiences: [] as Experience[], // Work experiences
        educations: [] as Education[], // Educational qualifications
    });

    const [isProfileCreated, setIsProfileCreated] = useState(true);
    const [isProfile, setIsProfile] = useState(false);

    const [newJob, setNewJob] = useState({ companyName: "", role: "" });
    const [newCompany, setNewCompany] = useState({ name: "", industry: "", location: "" });

    const parseAddress = (addressString: string) => {
        if (!addressString) {
            return { line1: "", city: "", country: "" }; // Return default values if address is not valid
        }
        const [line1, city, country] = addressString.split(',').map(part => part.trim());
        return { line1, city, country };
    };

    // Fetch recruiter profile
    useEffect(() => {
        const fetchProfile = async () => {
            const id = user?.id;

            if (!id || isProfile) return;
            setIsProfile(true);

            try {
                const data = await getProfile();
                console.log(data);

                if (data) {
                    localStorage.setItem('profileId', data.id);
                    const { line1, city, country } = parseAddress(data.address);
                    setProfile({
                        profileImage: "human.png",
                        email: data.email || "recruiter@example.com",
                        name: data.name || "John Doe",
                        userType: data.role || localStorage.getItem("userType") || "Recruiter",
                        bio: data.bio || "Software Engineer",
                        phoneNumber: data.phoneNumber || "01234567899",
                        address: {
                            line1: line1 || "Corporate Avenue",
                            city: city || "New York",
                            country: country || "USA",
                        },
                        readySkills: data.skillSet || [], // Pre-existing skills
                        newSkills: data.newSkills || [], // New skills to add
                        experiences: data.experienceSet || [], // Work experiences
                        educations: data.educationSet || [], // Educational qualifications
                    });
                    setProfileId(data.id);
                } else {
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
                setSkills(data);
            } catch (err) {
                console.error("Error fetching skills:", err);
                toast.error("Failed to fetch skills");
            }
        };

        const getUserSkills = async () => {
            const id = user?.id;
            setIsUserSkills(true);
            if (!id || isProfile) return;
            try {
                const data = await useFetchSkills(id);
                setUserSkills(data);
            } catch (err) {
                console.error("Error fetching user skills:", err);
                toast.error("Failed to fetch user skills");
            }
        };

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
    const handleProfileUpdate = async () => {
        if (isProfileCreated) {
            console.log("Profile already created");
            try {

                if (!profileId) throw new Error("User ID not found");
                // console.log(profile)

                const { name, email, userType, address, bio, phoneNumber, readySkills, newSkills, experiences, educations } = profile;
                const response = await useUpdateProfile(
                    profileId,
                    name,
                    bio,
                    email,
                    phoneNumber,
                    userType,
                    `${address.line1}, ${address.city}, ${address.country}`,
                    readySkills,
                    newSkills,
                    experiences,
                    educations
                );

                if (response) {
                    setIsProfileCreated(true);
                    toast("Profie Updated successfully!");
                    setIsProfile(false)
                }
            } catch (err) {
                console.error("Error creating profile:", err);
                toast("Failed to create profile");
                console.log("Error creating profile:", err)
            }

        }

        else{
            try {
                const id = user?.id;
                // console.log(id);
                if (!id) throw new Error("User ID not found");
    
                const { name, email, userType, address, bio, phoneNumber, readySkills, newSkills, experiences, educations } = profile;
                // console.log(profile);
                const response = await makeProfile(
                    id,
                    name,
                    bio,
                    email,
                    phoneNumber,
                    userType,
                    `${address.line1}, ${address.city}, ${address.country}`,
                    readySkills,
                    newSkills,
                    experiences,
                    educations
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
        }
    //     try {
    // const id = user?.id;
    // if (!id) throw new Error("User ID not found");

    // const formData = new FormData();

    // // Check if profileImage exists and is a valid file
    // if (!profile.profileImage || !(profile.profileImage instanceof File)) {
    //     throw new Error("Invalid or missing profile image");
    // }

    // formData.append('userId', id.toString());
    // formData.append('file', profile.profileImage);

    // console.log("FormData before upload:", formData);
    // const response1 = await useUploadPhoto(formData);

    // if (response1) {
    //     toast.success("Successfully uploaded");
    // } else {
    //     toast.error("Failed to upload");
    // }
// } catch (err) {
//     console.error("Error uploading photo:", err);
//     toast.error(err.message || "Failed to upload photo");
// }

    };
    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-700 min-h-screen text-gray-800 dark:text-gray-100">
            <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                <ProfileDetails
                    profile={profile}
                    setProfile={setProfile}
                    handleImageChange={handleImageChange}
                    handleSkillChange={handleSkillChange}
                    handleProfileUpdate={handleProfileUpdate}
                    isProfileCreated={isProfileCreated}
                    skills={skills}
                    navigate={navigate}
                    profileId={profileId}
                />
            </div>
            <div className={`bg-white lg:w-1/2 h-full lg:overflow-y-auto`}>
                {profile.userType === "Recruiter" ? (
                    <RecruiterDashboard 
                        addPostPage={() => navigate("/post-job")} 
                        addCompanyPage={() => navigate("/create-company")} 
                        navigate={navigate} 
                    />
                ) : (
                    <ApplicantDashboard 
                        profileId={profileId} 
                        user={user} 
                        navigate={navigate} 
                    />
                )}
            </div>
        </div>
    );
}

export default ProfileRecruiter;
