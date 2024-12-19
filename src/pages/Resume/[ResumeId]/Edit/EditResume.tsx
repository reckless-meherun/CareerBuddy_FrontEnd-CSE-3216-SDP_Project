import DummyResume from '@/components/ResumeComponents/DummyResume';
import { ResumeInfoContext } from '@/components/ResumeComponents/ResumeInfoContext';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import React, { useState } from 'react'; // Removed useEffect
import { useParams } from 'react-router-dom';

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(DummyResume); // Initialize state directly

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <ResumeForm />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;