import React from 'react'
import AddResume from '../components/AddResume'
import ResumeCardItem from '../components/ResumeCardItem'

function ResumeDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className='p-8 md:px-20 lg:px-32 bg-white m-5 rounded-xl shadow-lg'>
                <h2 className='font-bold text-3xl'>My Resume</h2>
                <p>Start Creating AI resume to your next Job role</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
                    <AddResume />
                    <ResumeCardItem resume={'abc'} key={'123'} />
                </div>
            </div>
        </div>
    )
}

export default ResumeDashboard