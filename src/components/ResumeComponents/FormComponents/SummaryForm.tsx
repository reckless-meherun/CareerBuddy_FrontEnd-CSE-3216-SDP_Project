import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext'

function SummaryForm(enableNext) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState('');
    
    const handleInputChange = (e) => {
        setSummary(e.target.value);
        setResumeInfo({ 
            ...resumeInfo, 
            summary: e.target.value 
            
        }); 
      };
    const onSave=(e)=>{
        e.preventDefault();        
        setLoading(true);
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7'
                onSubmit={onSave}
                >
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant="outline"
                            // onClick={() => GenerateSummaryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required defaultValue={resumeInfo?.summary}
                        onChange={handleInputChange}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* {aiGeneratedSummaryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummaryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummary(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>} */}

        </div>
    )
}

export default SummaryForm