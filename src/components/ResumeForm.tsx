import React, { useState } from 'react'
import PersonalDetailForm from './ResumeComponents/FormComponents/PersonalDetailForm'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import SummaryForm from './ResumeComponents/FormComponents/SummaryForm';
import ExperienceForm from './ResumeComponents/FormComponents/ExperienceForm';
import EducationalForm from './ResumeComponents/FormComponents/EducationalForm';
import SkillsForm from './ResumeComponents/FormComponents/SkillsForm';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import ThemeColor from '@/components/ResumeComponents/ThemeColor';


function ResumeForm() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false)

    const {ResumeId} = useParams();

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Link to={"/build-resume"}>
                    <Button><Home /></Button>
                </Link>
                <ThemeColor/>
                <div className='flex gap-5' >
                    {activeFormIndex > 1 &&
                        <Button size="sm"
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
                            <ArrowLeft />
                        </Button>}
                    <Button disabled={!enableNext}
                        className='flex gap-2' size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
                        Next
                        <ArrowRight />
                    </Button>
                </div>
            </div>

           

            {activeFormIndex == 1 ? <PersonalDetailForm enableNext={(v) => setEnableNext(v)} /> 
            : activeFormIndex == 2 ? <SummaryForm enableNext={(v) => setEnableNext(v)} /> 
            : activeFormIndex == 3 ? <ExperienceForm enableNext={(v) => setEnableNext(v)} /> 
            : activeFormIndex == 4 ? <EducationalForm enableNext={(v) => setEnableNext(v)} /> 
            : activeFormIndex == 5 ? <SkillsForm enableNext={(v) => setEnableNext(v)} /> 
            : activeFormIndex >= 6 ? <Navigate to={`/resume/${ResumeId}/view`}/> // 123 should be replaced with resumeId
            : null}
            
        </div>
    )
}

export default ResumeForm
