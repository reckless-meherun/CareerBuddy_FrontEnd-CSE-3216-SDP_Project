import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const formfield = {
    name: '',
    rating: 0
}

function SkillsForm(enableNext) {
    const [skillsList, setSkillsList] = useState(
        [formfield]
    );
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        resumeInfo && setSkillsList(resumeInfo?.skills)
    }, [])

    const handleInputChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating}
                            onChange={(v) => handleInputChange(index, 'rating', v)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default SkillsForm
