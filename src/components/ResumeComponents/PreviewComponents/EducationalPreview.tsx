import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='mb-2 font-bold text-center text-sm'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Education</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    {resumeInfo?.educations.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='font-bold text-sm'
                style={{
                    color:resumeInfo?.themeColor
                }}
            >{education.universityName}</h2>
            <h2 className='flex justify-between text-xs'>{education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate? education?.endDate:'Present'}</span>
            </h2>
            <p className='my-2 text-xs'>
                {education?.description}
            </p>
        </div>
    ))}
    </div>
  )
}

export default EducationalPreview