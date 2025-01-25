import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useResumeApi } from '@/hooks/useResumeApi'
import { toast } from 'react-toastify'

function PersonalDetailForm({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);
    const { useUpdateResume,useUpdateResueStatus } = useResumeApi();
    const handleInputChange = (e) => {
        enableNext(false)
        const { name, value } = e.target;
        setResumeInfo((resumeInfo) => ({ ...resumeInfo, [name]: value }))
    }

    const onSave = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Set loading to true to indicate the operation is in progress
        console.log(resumeInfo, "here");
    
        // Transform the data into the required format
        const formattedResumeInfo = {
            resumeName: resumeInfo.resumeName,
            jobTitle: resumeInfo.jobTitle,
            summary: resumeInfo.summary,
            themeColor: resumeInfo.themeColor,
            firstName: resumeInfo.firstName,
            lastName: resumeInfo.lastName,
            email: resumeInfo.email,
            phoneNumber: resumeInfo.phone, // Convert `phone` to `phoneNumber`
            address: resumeInfo.address,
            educations: resumeInfo.educations.map((education) => education.id),
            experiences: resumeInfo.experiences.map((experience) => experience.id),
            skills: resumeInfo.skills.map((skill) => skill.id),
        };
    
        console.log(formattedResumeInfo, "formatted");
    
        try {
            const response = await useUpdateResume(resumeInfo.resumeId, formattedResumeInfo);
            if (response) {
                toast.success("Successfully saved resume");
                await useUpdateResueStatus(resumeInfo.resumeId);
                enableNext(true); // Enable the "Next" button if save was successful
            }
        } catch (error) {
            toast.error("Failed to save resume. Please try again.");
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };
    
    

    return (
        <div className='shadow-lg mt-10 p-5 border-t-4 border-t-primary rounded-lg'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='gap-3 grid grid-cols-2 mt-5'>
                    <div>
                        <label>First Name</label>
                        <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label>Job Title</label>
                        <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label>Address</label>
                        <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                        <div className='flex justify-end mt-3'>
                            <Button type="submit"
                                disabled={loading}>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm