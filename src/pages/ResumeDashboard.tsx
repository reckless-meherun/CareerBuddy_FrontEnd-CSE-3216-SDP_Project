import React, { useEffect, useState } from 'react';
import AddResume from '../components/AddResume';
import ResumeCardItem from '../components/ResumeCardItem';
import { useResumeApi } from '@/hooks/useResumeApi';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

function ResumeDashboard() {
    const { profileId } = useParams();
    const { loading, getResumes } = useResumeApi();
    const [resumes, setResumes] = useState([]);
    const [isResuemFeteched, setIsResumeFetched] = useState(false);

    // Fetch resumes when the component mounts
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                if (profileId) {
                    const fetchedResumes = await getResumes(profileId); // Pass profileId if required by the API
                    setResumes(fetchedResumes);
                } else {
                    console.error('Error: profileId is undefined');
                }
            } catch (err) {
                console.error('Error fetching resumes:', err);
            }
        };
        if(! isResuemFeteched){
        fetchResumes();
        setIsResumeFetched(true);
        }
    }, [getResumes, profileId]);

    if (loading) {
        return <Loader2 className="mx-auto w-16 h-16 animate-spin" />;
    }

    // if (error) {
    //     return <div className="text-center text-red-500">Error: {error.message || 'Failed to load resumes.'}</div>;
    // }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100">
            <div className="bg-white shadow-lg m-5 md:px-20 lg:px-32 p-8 rounded-xl">
                <h2 className="font-bold text-3xl">My Resume</h2>
                <p>Start creating AI resumes for your next job role</p>
                <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
                    <AddResume />
                    {resumes.map((resume) => (
                        <ResumeCardItem resume={resume} key={resume.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ResumeDashboard;
