import { useState, useEffect } from "react";
import { searchProfile, createProfile, getskills,searchskills, updateProfile } from "../api/profileApi";
import UserStorage from "@/utilities/UserStorage";
import { useNavigate } from "react-router-dom";

// Define types for the skills
type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string; };

export const useProfile = () => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const user = UserStorage.getUser();
    const userId = user?.id;
    const navigate = useNavigate();

    // Fetch a profile by ID
    const getProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            if(!userId){
                navigate("/login", { state: { from: location.pathname } });
                return;
            }
            const response = await searchProfile(userId);
            return response;
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Error fetching profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const useFetchSkills = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await searchskills(id);
            return response;
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Error fetching profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Create or update a profile
    const makeProfile = async (
        id: string,
        name: string,
        bio: string,
        email: string,
        phoneNumber: string,
        role: string,
        address: string,
        readySkills: SkillDTO[] = [],
        newSkills: SkillRequest[] = []
    ) => {
        setLoading(true);
        setError(null);

        try {
            // Construct the profileData object
            const profileData = {
                user_id: id,
                name,
                bio,
                email,
                phoneNumber,
                role,
                address,
                readySkills,
                newSkills,
            };

            // Pass the object to createProfile
            const response = await createProfile(profileData);
            return response;
        } catch (err) {
            console.error("Error creating profile:", err);
            setError("Error creating profile");
            return null;
        } finally {
            setLoading(false);
        }

    };
    const fetchSkills = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getskills(); // Replace with your actual API function
            return response;
        } catch (err) {
            console.error("Error fetching skills:", err);
            setError("Error fetching skills");
        } finally {
            setLoading(false);
        }
    };
    const useUpdateProfile = async (
        id: string,
        name: string,
        bio: string,
        email: string,
        phoneNumber: string,
        role: string,
        address: string,
        readySkills: SkillDTO[] = [],
        newSkills: SkillRequest[] = []
    ) => {
        setLoading(true);
        setError(null);

        try {
            // Construct the profileData object
            const profileData = {
                user_id: id,
                name,
                bio,
                email,
                phoneNumber,
                role,
                address,
                readySkills,
                newSkills,
            };

            // Pass the object to createProfile
            const response = await updateProfile(profileData);
            return response;
        } catch (err) {
            console.error("Error creating profile:", err);
            setError("Error creating profile");
            return null;
        } finally {
            setLoading(false);
        }

    };


    return { loading, error, getProfile, makeProfile,useFetchSkills,fetchSkills,useUpdateProfile };
};



