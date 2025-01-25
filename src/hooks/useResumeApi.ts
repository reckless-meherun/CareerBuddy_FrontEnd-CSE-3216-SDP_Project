import { createResume, finaliseResume, getResume, getUserResumes, rejectResume, updateEducation, updateExperience, updateResuemState, updateResume } from "@/api/resumeApi";
import { useState } from "react";

export const useResumeApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState(false);

    const getResumes = async (profileId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserResumes(profileId);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }

    const useCreateResume = async (profileId:string, resumeData:any) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createResume(profileId, resumeData);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }
    const useGetResume = async (resumeId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getResume(resumeId);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }
    const useUpdateResume = async (resumeId:string, resumeData:any) => {
        setLoading(true);
        setError(null);
        console.log(resumeData,"ki pass hoy");
        try {
            const data = await updateResume(resumeId, resumeData);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }
    const useUpdateEducation = async (profileId:string, resumeData:any) => {
        setLoading(true);
        setError(null);
        console.log(resumeData,"ki pass hoy");
        try {
            const data = await updateEducation(profileId, resumeData);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }
    const useUpdateExperienc = async (profileId:string, resumeData:any) => {
        setLoading(true);
        setError(null);
        console.log(resumeData,"ki pass hoy");
        try {
            const data = await updateExperience(profileId, resumeData);
            return data;
        } catch (err) {
            setError('Error fetching resumes');
        } finally {
            setLoading(false);
        }
    }
    const useUpdateResueStatus = async (resumeId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await updateResuemState(resumeId);
            return data;
        } catch (err) {
            setError('Error updating state of resumes');
        } finally {
            setLoading(false);
        }
    }
    const useFinalaseResume = async (resumeId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await finaliseResume(resumeId);
            return data;
        } catch (err) {
            setError('Error updating state of resumes');
        } finally {
            setLoading(false);
        }
    }
    const userejectResume = async (resumeId:string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await rejectResume(resumeId);
            return data;
        } catch (err) {
            setError('Error updating state of resumes');
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, getResumes, useCreateResume,useGetResume,useUpdateResume,useUpdateEducation,useUpdateExperienc,useUpdateResueStatus,useFinalaseResume,userejectResume };
}