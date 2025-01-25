import { ResumeInfoContext } from '@/components/ResumeComponents/ResumeInfoContext';
import ResumePreview from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { useResumeApi } from '@/hooks/useResumeApi';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ViewResume() {
  const { ResumeId } = useParams();
  const { useGetResume } = useResumeApi();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isResumeFetched, setIsResumeFetched] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null); // Ref for the preview section

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const fetchedResume = await useGetResume(ResumeId );
        console.log('Fetched resume:', fetchedResume);
        setResumeInfo(fetchedResume);
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      }
    };

    if (ResumeId && !isResumeFetched) {
      fetchResume();
      setIsResumeFetched(true);
    }
  }, [ResumeId, useGetResume]);

  const HandleDownload = async () => {
    if (previewRef.current) {
      // Temporarily set text color to black
      const originalStyles = previewRef.current.style.color;
      previewRef.current.style.color = 'black';
  
      try {
        // Convert the preview section to canvas
        const canvas = await html2canvas(previewRef.current, {
          scale: 2, // Higher scale for better resolution
        });
  
        // Create PDF
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf'); // Download the PDF
      } finally {
        // Restore original text color
        previewRef.current.style.color = originalStyles;
      }
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100">
        <div className="bg-white shadow-lg m-5 md:px-20 lg:px-32 p-8 rounded-xl">
          <h2 className="font-medium text-2xl text-center">
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and can share the unique resume URL with your friends and family.
          </p>
          <div className="flex justify-between p-8 w-full">
            <Button onClick={HandleDownload}>Download</Button>
            <Button>Share</Button>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div ref={previewRef} className="shadow p-10 rounded-md">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
