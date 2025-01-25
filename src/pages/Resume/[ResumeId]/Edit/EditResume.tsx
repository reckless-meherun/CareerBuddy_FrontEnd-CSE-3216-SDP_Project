import DummyResume from '@/components/ResumeComponents/DummyResume';
import { ResumeInfoContext } from '@/components/ResumeComponents/ResumeInfoContext';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResumeApi } from '@/hooks/useResumeApi';

function EditResume() {
  const { ResumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null); // Initialize with dummy data
  const { useGetResume } = useResumeApi();
  const [isResumeFetched, setIsResumeFetched] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const fetchedResume = await useGetResume(ResumeId); // Fetch resume by ID
        console.log('Fetched resume:', fetchedResume); // Log fetched resume for debugging purposes
        setResumeInfo(fetchedResume); // Update state with fetched data
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      }
    };

    if (ResumeId && !isResumeFetched) {
      fetchResume();
      setIsResumeFetched(true);
    }
  }, [ResumeId, useGetResume]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 p-10">
        {/* Form Section */}
        <ResumeForm />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
