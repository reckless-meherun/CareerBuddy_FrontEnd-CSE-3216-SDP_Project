import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

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

    useEffect(() => {
        resumeInfo?.education.length > 0 && setEducationalList(resumeInfo?.education)
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

    const onSave = () => {
        setLoading(true)
    }

    useEffect(() => {
        console.log(educationalList)
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        });
    }, [educationalList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add Your Educational Background Details</p>

                <div>
                    {educationalList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
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
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddMoreEducation} className="text-primary"> + Add More Educational Degree</Button>
                        <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default EducationalForm
