import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useResumeApi } from '@/hooks/useResumeApi'
import { toast } from 'react-toastify'

const formField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
}


function EducationalForm(enableNext) {
    const [educationalList, setEducationalList] = useState([])
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    const { useUpdateResume, useUpdateEducation,useUpdateResueStatus } = useResumeApi();
    const profileId = localStorage.getItem('profileId');

    useEffect(() => {
        resumeInfo?.educations.length > 0 && setEducationalList(resumeInfo?.educations)
    }, [])

    const handleInputChange = (index, e) => {
        const newEntries = educationalList.slice();
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const AddMoreEducation = () => {
        setEducationalList([...educationalList,
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
        ])
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }
    const fullSave = async () => {
        console.log(resumeInfo, "resumeInfo");
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
                enableNext(true); // Enable the "Next" button if save was successful
            }
        } catch (error) {
            toast.error("Failed to save resume. Please try again.");
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    }

    const onSave = async () => {
        setLoading(true)
        const newExperiences = educationalList.filter(experience => !experience.id).map(experience => ({
            ...experience,
            profileId: profileId
        }));

        // If there are no new experiences, return early
        if (newExperiences.length === 0) {
            toast.info("No new experiences to save");
            return;
        }

        try {
            // Only save new experiences
            newExperiences.forEach(async experience => {
                const experienceResponse = await useUpdateEducation(profileId, experience)
                console.log(experienceResponse);
                if (experienceResponse) {
                    toast.success("Successfully saved new Education");
                    setResumeInfo({
                        ...resumeInfo,
                        educations: experienceResponse.educationSet,
                    });
                }
            }
            );
        } catch (error) {
            toast.error("Failed to save new experiences");
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                await useUpdateResueStatus(resumeInfo.resumeId);
                toast.success("Successfully saved resume");
                // enableNext(true); // Enable the "Next" button if save was successful
            }
        } catch (error) {
            toast.error("Failed to save resume. Please try again.");
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    }

    useEffect(() => {
        console.log(educationalList)
        setResumeInfo({
            ...resumeInfo,
            educations: educationalList
        });
    }, [educationalList]);

    return (
        <div>
            <div className='shadow-lg mt-10 p-5 border-t-4 border-t-primary rounded-lg'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add Your Educational Background Details</p>

                <div>
                    {educationalList.map((item, index) => (
                        <div key={index}>
                            <div className='gap-3 grid grid-cols-2 my-5 p-3 border rounded-lg'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>University/College/School Name</label>
                                    <Input name="universityName" defaultValue={item?.universityName} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Degree</label>
                                    <Input name="degree" defaultValue={item?.degree} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Major</label>
                                    <Input name="major" defaultValue={item?.major} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date" defaultValue={
                                        item?.startDate
                                            ? new Date(item.startDate).toISOString().split("T")[0]
                                            : ''
                                    } name="startDate" onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input defaultValue={
                                        item?.endDate
                                            ? new Date(item.endDate).toISOString().split("T")[0]
                                            : ''
                                    } type="date" name="endDate" onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>Description</label>
                                    <Textarea name="description" defaultValue={item?.description} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                            </div>
                            <Button disabled={loading} onClick={() => onSave()}
                                className="my-3 text-primary">
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddMoreEducation} className="text-primary"> + Add More Educational Degree</Button>
                        <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={() => fullSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default EducationalForm
