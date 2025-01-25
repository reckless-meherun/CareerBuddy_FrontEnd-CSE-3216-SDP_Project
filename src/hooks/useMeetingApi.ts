import { getusermeetings,addmeeting } from "@/api/meetingApi";
import { useState } from "react";

export const useMeetingApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const getMeeting = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getusermeetings(id);
            return data;
        } catch (err) {
            setError('Error fetching meeting');
        } finally {
            setLoading(false);
        }
    }
    const useAddmeetings = async (meetingData:any) => {
        setLoading(true);
        setError(null);
        try {
            const data = await addmeeting(meetingData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError('Error adding meeting');
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, getMeeting, setSuccess,useAddmeetings };
}

