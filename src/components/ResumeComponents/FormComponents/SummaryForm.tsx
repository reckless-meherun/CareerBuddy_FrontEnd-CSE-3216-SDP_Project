import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../ResumeInfoContext';
import { AIChatSession } from '@/service/AIModel';
import { toast } from 'react-toastify';
import { useResumeApi } from '@/hooks/useResumeApi';

const prompt = `
Job Title: {jobTitle}. Generate a list of summaries for 3 experience levels (Senior, Mid-Level, Fresher) as an array. 
Each object should have "summary" and "experience_level" fields in JSON format and each response should be able to store in character varying(255). No additional text or code blocks.
`;

function SummaryForm({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
    const [error, setError] = useState(null);
    const { useUpdateResume } = useResumeApi();

    const handleInputChange = (e) => {
        setSummary(e.target.value);
        setResumeInfo({
            ...resumeInfo,
            summary: e.target.value,
        });
    };
    useEffect(() => {
        setSummary(resumeInfo.summary);
    }, [setSummary, resumeInfo.summary]);


    const onSave = async (e) => {
        console.log(resumeInfo, "here summery");
        e.preventDefault();
        setLoading(true);
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
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Replace with actual save logic
    };

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        setError(null); // Reset error before new attempt
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.resumeName || 'Your Desired Job Title');
            console.log('Generated Prompt: ', PROMPT);

            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log('Raw AI Response: ', responseText);

            // Clean and validate the response
            const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
            const parsedResponse = JSON.parse(cleanedResponse);

            if (
                Array.isArray(parsedResponse) &&
                parsedResponse.every(item => item?.summary && item?.experience_level)
            ) {
                console.log('Valid Parsed Response: ', parsedResponse);
                setAiGeneratedSummaryList(parsedResponse);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (err) {
            console.error('Error generating AI summaries:', err);
            setError('Failed to generate summaries. Please try again.');
            setAiGeneratedSummaryList([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="shadow-lg mt-10 p-5 border-t-4 border-t-primary rounded-lg">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add a summary for your job title</p>

                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label>Add Summary</label>
                        <Button
                            variant="outline"
                            onClick={GenerateSummaryFromAI}
                            type="button"
                            size="sm"
                            className="flex gap-2 border-primary text-primary"
                        >
                            <Brain className="w-4 h-4" /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5 h-[150px]"
                        required
                        value={summary}
                        onChange={handleInputChange}
                        placeholder="Enter your summary..."
                    />
                    <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={loading}
                        onClick={onSave}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {loading ? (
                <p className="p-2">Generating AI summaries...</p>
            ) : error ? (
                <p className="p-2 text-red-500">{error}</p>
            ) : aiGeneratedSummaryList.length > 0 ? (
                aiGeneratedSummaryList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSummary(item.summary);
                            setResumeInfo({
                                ...resumeInfo,
                                summary: item.summary,
                            });
                            alert(`Selected summary for ${item.experience_level} has been saved!`);
                        }}
                        className="hover:bg-gray-100 shadow-lg my-4 p-5 rounded-lg cursor-pointer hover:scale-105"
                    >
                        <h2 className="my-1 font-bold text-primary">
                            Level: {item.experience_level}
                        </h2>
                        <p>{item.summary}</p>
                    </div>
                ))
            ) : (
                <p className="p-2">No suggestions available</p>
            )}
        </div>
    );
}

export default SummaryForm;
