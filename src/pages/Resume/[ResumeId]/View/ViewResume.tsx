import { ResumeInfoContext } from '@/components/ResumeComponents/ResumeInfoContext'
import ResumePreview from '@/components/ResumePreview'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState()
    const resumeId = useParams()

    const HandleDownload=()=>{
        window.print()
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <div className='p-8 md:px-20 lg:px-32 bg-white m-5 rounded-xl shadow-lg'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume url with your friends and family </p>
                    <div className='flex justify-between w-full p-8'>
                    <Button onClick={HandleDownload}>Download</Button>
                        <Button>Share</Button>
                    </div>

                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume
