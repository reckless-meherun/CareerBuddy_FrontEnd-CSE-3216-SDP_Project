import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../ResumeInfoContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

function PersonalDetailForm({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        enableNext(false)
        const { name, value } = e.target;
        setResumeInfo((resumeInfo) => ({ ...resumeInfo, [name]: value }))
    }

    const onSave = (e) => {
        e.preventDefault();
        enableNext(true);
        setLoading(true)
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label>First Name</label>
                        <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label>Job Title</label>
                        <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label>Address</label>
                        <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                        <div className='mt-3 flex justify-end'>
                            <Button type="submit"
                                disabled={loading}>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm