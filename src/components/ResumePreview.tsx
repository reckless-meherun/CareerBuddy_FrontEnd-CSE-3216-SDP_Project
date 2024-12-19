import React, { useContext } from 'react'
import { ResumeInfoContext } from './ResumeComponents/ResumeInfoContext'
import PersonalDetailPreview from './ResumeComponents/PreviewComponents/PersonalDetailPreview'
import SummaryPreview from './ResumeComponents/PreviewComponents/SummaryPreview'
import ExperiencePreview from './ResumeComponents/PreviewComponents/ExperiencePreview'
import EducationalPreview from './ResumeComponents/PreviewComponents/EducationalPreview'
import SkillsPreview from './ResumeComponents/PreviewComponents/SkillsPreview'

function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor
            }}>
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo}/>
            <ExperiencePreview resumeInfo={resumeInfo}/>
            <EducationalPreview resumeInfo={resumeInfo}/>
            <SkillsPreview resumeInfo={resumeInfo}/>
        </div>
    )
}

export default ResumePreview