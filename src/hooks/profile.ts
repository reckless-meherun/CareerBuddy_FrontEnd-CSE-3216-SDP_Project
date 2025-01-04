import { useState, useEffect } from "react";
import { searchProfile, createProfile, getskills } from "../api/profileApi";

// Define types for the skills
type SkillDTO = { id: string; name: string };
type SkillRequest = { name: string; };

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch a profile by ID
    const getProfile = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await searchProfile(id);
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


    return { loading, error, getProfile, makeProfile,fetchSkills };
};



