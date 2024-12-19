import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '../ResumeInfoContext';
import { AIChatSession } from '@/service/AIModel';
import { MyAlert } from '@/components/MyAlert';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Fresher level in 3-4 lines in array format, with summery and experience_level fields in JSON format.";

function SummaryForm({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    const handleInputChange = (e) => {
        setSummary(e.target.value);
        setResumeInfo({
            ...resumeInfo,
            summary: e.target.value,
        });
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate save operation
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Replace with actual save logic
    };

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
            console.log("Generated Prompt: ", PROMPT);
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log("Raw AI Response: ", responseText);
            // Clean the response to extract valid JSON
            const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
            const parsedResponse = JSON.parse(cleanedResponse);
            console.log("Parsed Response: ", parsedResponse);
            setAiGeneratedSummaryList(parsedResponse.summaries || []); // Save summaries in state
        } catch (error) {
            console.error('Error generating AI summaries:', error);
            setAiGeneratedSummaryList([]); // Reset list if an error occurs
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
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
                            className="border-primary text-primary flex gap-2"
                        >
                            <Brain className="h-4 w-4" /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5 h-[150px]"
                        required
                        value={summary}
                        onChange={handleInputChange}
                        placeholder="Enter your summary..."
                    />
                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {loading ? (
                <p className='p-2'>Generating AI summaries...</p> // Display loading indicator while AI is working
            ) : aiGeneratedSummaryList?.length > 0 ? (
                aiGeneratedSummaryList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            // Save the selected summary to the resume
                            setSummary(item?.summary);
                            setResumeInfo({
                                ...resumeInfo,
                                summary: item?.summary, // Update the summary in the context
                            });
                            alert(`Selected summary for ${item.experience_level} has been saved!`);
                        }}
                        className="p-5 hover:scale-105 hover:bg-gray-100 shadow-lg my-4 rounded-lg cursor-pointer"
                    >
                        <h2 className="font-bold my-1 text-primary">
                            Level: {item?.experience_level}
                        </h2>
                        <p>{item?.summary}</p>
                    </div>
                ))
            ) : (
                <p className='p-2'>No suggestions available</p>
            )}

        </div>
    );
}

export default SummaryForm;
