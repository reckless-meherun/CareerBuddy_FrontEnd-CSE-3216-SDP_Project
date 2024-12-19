import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext';
import RichTextEditor from '@/components/RichTextEditor';
import { AIChatSession } from '@/service/AIModel';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
}

function ExperienceForm(enableNext) {
    const [experinceList, setExperinceList] = useState([])
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        resumeInfo?.experience.length > 0 && setExperinceList(resumeInfo?.experience)
    }, [])


    const handleInputChange = (index, e) => {
        const newEntries = experinceList.slice();
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperinceList([...experinceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: '',
        }])
    }

    const RemoveExperience = () => {
        setExperinceList(experinceList => experinceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experinceList.slice();
        newEntries[index][name] = e.target.value;
        console.log("handleRichTextEditor"+newEntries);
        setExperinceList(newEntries);
    }

    useEffect(() => {
        console.log(experinceList)
        setResumeInfo({
            ...resumeInfo,
            experience: experinceList
        });
        // console.log("useEffect"+newEntries);
    }, [experinceList]);


    const onSave = () => {
        setLoading(true)
        console.log(experinceList)
    }

    const handleRichTextEditorChange = (e, index) => {
        const newEntries = [...experinceList];
        newEntries[index].workSummary = e.target.value;
        setExperinceList(newEntries);
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>

                <div>
                    {experinceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" defaultValue={item?.title} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" defaultValue={item?.companyName} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" defaultValue={item?.city} onChange={(e) => handleInputChange(index, e)} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" defaultValue={item?.state} onChange={(e) => handleInputChange(index, e)} />
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
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummary}
                                        onRichTextEditorChange={handleRichTextEditor}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ExperienceForm