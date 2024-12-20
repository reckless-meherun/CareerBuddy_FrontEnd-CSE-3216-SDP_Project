import { Button } from '@/components/ui/button'
import { CalendarOff, Factory, HandCoins, MapPinned, PersonStanding, Users } from 'lucide-react'
import React from 'react'

function DetailJobPostPreview() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div className="grid grid-rows-3 grid-cols-1 gap-4 p-10">
                {/* Job Post Section */}
                <div className="flex items-center justify-between gap-4 bg-white border p-6 border-8 rounded-xl shadow-lg">
                    <div className="flex text-center rounded-xl bg-primary w-[200px] h-[200px]">logo</div>
                    <div className="flex flex-col justify-center items-center text-center w-[800px] h-[100px]">
                        <h2 className="text-2xl">job post title</h2>
                        <h2 className="text-sm text-gray-500">Posted On: date</h2>
                    </div>
                    <Button
                        type="submit"
                        className="py-2 px-6 font-semibold rounded-lg text-black dark:text-white bg-lightTeal dark:bg-darkTeal hover:bg-darkTeal dark:hover:bg-darkGrey shadow-md dark:shadow-lg"
                    >
                        Apply
                    </Button>
                </div>

                {/* Job Details Section */}
                <div className="flex flex-col bg-white rounded-xl shadow-lg border-8 p-8">
                    <div className="flex items-center justify-between gap-4 p-3 m-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <HandCoins className="w-10 h-10" />
                            </div>
                            <span>Salary</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <PersonStanding className="w-10 h-10" />
                            </div>
                            <span>Job Type</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <MapPinned className="w-10 h-10" />
                            </div>
                            <span>Location</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 m-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <Users className="w-10 h-10" />
                            </div>
                            <span>Vacancies</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <Factory className="w-10 h-10" />
                            </div>
                            <span>Industries</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full p-3 border border-gray-400">
                                <CalendarOff className="w-10 h-10" />
                            </div>
                            <span>Deadline</span>
                        </div>
                    </div>
                </div>


                {/* Position Summary Section */}
                <div className="flex bg-white rounded-xl justify-between gap-4 border p-8 border-8 shadow-lg">
                    <h2 className='text-2xl font-bold '>Description</h2>
                </div>
            </div>


        </div>
    )
}

export default DetailJobPostPreview
