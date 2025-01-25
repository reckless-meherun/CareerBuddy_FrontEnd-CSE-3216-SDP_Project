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
        const fetchedResume = await useGetResume(ResumeId);
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

  const generatePDF = async (): Promise<Blob | null> => {
    if (previewRef.current) {
      const originalStyles = previewRef.current.style.color;
      previewRef.current.style.color = 'black';

      try {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
        });

        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Generate PDF as a Blob
        return pdf.output('blob');
      } finally {
        previewRef.current.style.color = originalStyles;
      }
    }
    return null;
  };

  const HandleDownload = async () => {
    const pdfBlob = await generatePDF();
    if (pdfBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = 'resume.pdf';
      link.click();
    }
  };

  const HandleShare = async () => {
    const pdfBlob = await generatePDF();
    if (pdfBlob && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], 'resume.pdf', { type: 'application/pdf' })] })) {
      try {
        await navigator.share({
          title: 'My AI-Generated Resume',
          text: 'Check out my AI-generated resume!',
          files: [new File([pdfBlob], 'resume.pdf', { type: 'application/pdf' })],
        });
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      alert('Your browser does not support file sharing!');
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
            Now you are ready to download your resume and can share the PDF with your friends and family.
          </p>
          <div className="flex justify-between p-8 w-full">
            <Button onClick={HandleDownload}>Download</Button>
            <Button onClick={HandleShare}>Share</Button>
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
