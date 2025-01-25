import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../ResumeInfoContext';
import RichTextEditor from '@/components/RichTextEditor';
import { AIChatSession } from '@/service/AIModel';
import { useResumeApi } from '@/hooks/useResumeApi';
import { toast } from 'react-toastify';

function ExperienceForm({ enableNext }) {
    const [experienceList, setExperienceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const {useUpdateResume,useUpdateExperienc} = useResumeApi();
    const profileId = localStorage.getItem('profileId');

    useEffect(() => {
        if (resumeInfo?.experiences.length > 0) {
            setExperienceList(resumeInfo?.experiences);
        }
    }, []);

    const handleInputChange = (index, e) => {
        const updatedExperiences = [...experienceList];
        updatedExperiences[index][e.target.name] = e.target.value;
        setExperienceList(updatedExperiences);
    };

    const AddNewExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummary: '',
            },
        ]);
    };

    const RemoveExperience = () => {
        setExperienceList((prev) => prev.slice(0, -1));
    };

    const GenerateWorkSummaryFromAI = async (index) => {
        setLoading(true);
        try {
            // Get the job details for the current index
            const jobDetails = experienceList[index];
            const { title, companyName, city, state, startDate, endDate } = jobDetails;

            // Construct a detailed prompt with job information
            const prompt = `
                Generate a professional work summary and return 'summary' in JSON format based on the following job details and add description to enhance the experience in that company and keep the response short so that it can feet in character varying(255) :
                {
                    "title": "${title}",
                    "companyName": "${companyName}",
                    "city": "${city}",
                    "state": "${state}",
                    "startDate": "${startDate}",
                    "endDate": "${endDate}"
                }
            `;

            // Send the prompt to the AI service
            const result = await AIChatSession.sendMessage(prompt);
            const rawResponse = await result.response.text();
            console.log('Raw AI Response:', rawResponse);

            // Clean and parse JSON response
            const refinedResponse = rawResponse.replace(/```json|```/g, '').trim();
            const parsedResponse = JSON.parse(refinedResponse);

            if (parsedResponse?.summary) {
                // Update the specific experience with the generated summary
                const updatedExperiences = [...experienceList];
                updatedExperiences[index].workSummary = parsedResponse.summary;
                setExperienceList(updatedExperiences);
            } else {
                alert('AI response did not include a valid work summary.');
            }
        } catch (error) {
            console.error('Error generating work summary:', error);
            alert('Failed to generate a summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experiences: experienceList,
        });
    }, [experienceList]);
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
        const newExperiences = experienceList.filter(experience => !experience.id).map(experience => ({
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
            newExperiences.forEach(async experience =>
                {const experienceResponse =await useUpdateExperienc(profileId, experience)
                    console.log(experienceResponse);
                    if (experienceResponse) {
                        toast.success("Successfully saved new experiences");
                        setResumeInfo({
                            ...resumeInfo,
                            experiences: experienceResponse.experienceSet,
                        });
                    }
                }
            );
            
            
            
            // fullSave();
                
                // Optionally, you might want to refresh the experience list 
                // to include the newly added experiences with their backend IDs
            enableNext(true);
        } catch (error) {
            toast.error("Failed to save new experiences");
            console.error(error);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <div>
            <div className="shadow-lg mt-10 p-5 border-t-4 border-t-primary rounded-lg">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add your previous job experience</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className="gap-3 grid grid-cols-2 my-5 p-3 border rounded-lg">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input
                                        name="title"
                                        defaultValue={item?.title}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input
                                        name="companyName"
                                        defaultValue={item?.companyName}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input
                                        name="city"
                                        defaultValue={item?.city}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input
                                        name="state"
                                        defaultValue={item?.state}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input
                                        type="date"
                                        defaultValue={
                                            item?.startDate
                                                ? new Date(item.startDate).toISOString().split('T')[0]
                                                : ''
                                        }
                                        name="startDate"
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input
                                        type="date"
                                        defaultValue={
                                            item?.endDate
                                                ? new Date(item.endDate).toISOString().split('T')[0]
                                                : ''
                                        }
                                        name="endDate"
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummary}
                                        onRichTextEditorChange={(e) =>
                                            handleInputChange(index, {
                                                target: { name: 'workSummary', value: e },
                                            })
                                        }
                                    />
                                    <div className='flex justify-between'>
                                    <Button
                                        variant="outline"
                                        onClick={() => GenerateWorkSummaryFromAI(index)}
                                        className="mt-3 text-primary"

                                    >
                                        <Brain className="w-4 h-4" />
                                        {loading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            'Generate Work Summary'
                                        )}
                                    </Button>
                                    <Button disabled={loading} onClick={() => onSave()}
                                         className="mt-3 text-primary">
                                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                                    </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={AddNewExperience}
                            className="text-primary"
                        >
                            + Add More Experience
                        </Button>
                        <Button
                            variant="outline"
                            onClick={RemoveExperience}
                            className="text-primary"
                        >
                            - Remove
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={() => fullSave()}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ExperienceForm;
