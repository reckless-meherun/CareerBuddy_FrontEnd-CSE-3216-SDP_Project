import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='mb-2 font-bold text-center text-sm'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.experiences?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='font-bold text-sm'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='flex justify-between text-xs'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.startDate} To {experience?.endDate? experience.endDate:"present"} </span>
                </h2>
                {/* <p className='my-2 text-xs'>
                    {experience.workSummary}
                </p> */} 
                <div className='my-2 text-xs' dangerouslySetInnerHTML={{__html:experience?.workSummary}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview