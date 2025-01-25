import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../ResumeInfoContext';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { useResumeApi } from '@/hooks/useResumeApi';
import { useProfile } from '@/hooks/profile';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'; // Update based on your Select component import

const formField = { name: '', rating: 5 };
type SkillDTO = { id: string; name: string };

function SkillsForm({ enableNext }: { enableNext: (value: boolean) => void }) {
    const [skillsList, setSkillsList] = useState<{ name: string; rating: number }[]>([formField]);
    const [skills, setSkills] = useState<SkillDTO[]>([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const { useUpdateResume ,useFinalaseResume } = useResumeApi();
    const [isSkillsFetched, setIsSkillsFetched] = useState(false);
    const { fetchSkills } = useProfile();
    const [isUpdating, setIsUpdating] = useState(false);

    // Load existing skills from resumeInfo
    useEffect(() => {
        if (!isUpdating) {
            if (resumeInfo?.skills) {
                setSkillsList(
                    resumeInfo.skills.map((skill) => ({
                        name: skill.name || '',
                        rating: skill.rating || 5,
                    }))
                );
            }
            setIsUpdating(true);
        }
    }, [resumeInfo]);

    // Fetch available skills from the backend
    useEffect(() => {
        const getSkills = async () => {
            if (isSkillsFetched) return;
            setIsSkillsFetched(true);

            try {
                const data = await fetchSkills();
                setSkills(data);
            } catch (err) {
                console.error('Error fetching skills:', err);
                toast.error('Failed to fetch skills');
            }
        };
        getSkills();
    }, [fetchSkills, isSkillsFetched]);

    // Handle skill name and rating changes
    const handleInputChange = (index: number, field: string, value: any) => {
        const updatedSkillsList = [...skillsList];
        updatedSkillsList[index][field] = value;
        setSkillsList(updatedSkillsList);
    };

    // Add a new skill to the list
    const addNewSkill = () => {
        setSkillsList([...skillsList, { name: '', rating: 5 }]);
    };

    // Remove a skill from the list
    const removeSkill = (index: number) => {
        setSkillsList(skillsList.filter((_, i) => i !== index));
    };

    // Save the skills to the backend
    const saveSkills = async () => {
        setLoading(true);
    
        // Format the skills in the required structure
        const formattedSkills = skillsList.map((skill) => {
            const skillObj = skills.find((s) => s.name === skill.name); // Find skill ID from available skills
            return {
                id: skillObj?.id || '', // Use the existing skill ID if available
                name: skill.name,
                rating: skill.rating,
            };
        });
    
        // Prepare the entire resumeInfo payload
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
            skills: formattedSkills.map((skills)=> skills.id), // Pass the formatted skills
        };
    
        try {
            const response = await useUpdateResume(resumeInfo.resumeId, formattedResumeInfo);
            if (response) {
                await useFinalaseResume(resumeInfo.resumeId);
                toast.success('Successfully saved resume');
                enableNext(true);
            }
        } catch (error) {
            toast.error('Failed to save resume. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    // Update resume info whenever skillsList changes
    useEffect(() => {
        setResumeInfo({ ...resumeInfo, skills: skillsList });
    }, [skillsList]);

    // Get available skills for the dropdown
    const getAvailableSkills = () => {
        const selectedSkills = skillsList.map((skill) => skill.name);
        return skills.filter((skill) => !selectedSkills.includes(skill.name));
    };

    return (
        <div className="shadow-lg mt-10 p-5 border-t-4 border-t-primary rounded-lg">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className="flex justify-between mb-4 p-3 border rounded-lg">
                        {/* Skill Name Dropdown for New Skills */}
                        <div>
                            <label className="text-xs">Skill Name</label>
                            {item.name ? (
                                <p className="font-medium">{item.name}</p> // Existing skill displayed as plain text
                            ) : (
                                <Select
                                    onValueChange={(value) => handleInputChange(index, 'name', value)}
                                    value={item.name}
                                >
                                    <SelectTrigger className="w-44">
                                        <SelectValue placeholder="Select a skill" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getAvailableSkills().map((skill) => (
                                            <SelectItem key={skill.id} value={skill.name}>
                                                {skill.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>

                        {/* Rating Component */}
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={item.rating}
                            onChange={(value) => handleInputChange(index, 'rating', value)}
                        />

                        {/* Remove Skill Button */}
                        <Button
                            variant="outline"
                            onClick={() => removeSkill(index)}
                            className="text-red-500"
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>

            {/* Add and Save Buttons */}
            <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={addNewSkill} className="text-primary">
                    + Add More Skill
                </Button>
                <Button disabled={loading} onClick={saveSkills}>
                    {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default SkillsForm;
