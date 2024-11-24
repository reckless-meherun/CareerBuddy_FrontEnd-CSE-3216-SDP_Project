import { useState } from "react";
import { searchProfile, createProfile } from "../api/profileApi";

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProfile = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await searchProfile(id);
            return response;
        } catch (err) {
            setError('error fetching jobs');
        } finally {
            setLoading(false);
        }
    };
    const makeProfile = async (
        id: string,
        name: string,
        bio: string,
        email: string,
        phoneNumber: string,
        role: string,
        address: string,
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
            };
    
            // Pass the object to createProfile
            const response = await createProfile(profileData);
            return response;
        } catch (err) {
            console.error("Error creating profile:", err);
            setError("Error creating profile");
        } finally {
            setLoading(false);
        }
    };
    

    return { loading, error, getProfile, makeProfile };
};