import { FileUser, Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function ResumeCardItem({ resume }) {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    // const color = resume?.themeColor
    // console.log("Theme Color:", resume?.themeColor);

    const onDelete = () => {
        setLoading(true)
        setOpenAlert(false)
        setLoading(false)
    }

    return (
        <div className="hover:scale-105 transition-all hover:shadow-md">
            {/* Card Content */}
            <Link to={`/resume/${123}/edit`}>
                <div
                    className="p-14 bg-gradient-to-b from-gray-100 via-teal-100 to-gray-600 py-24 border 
                    items-center flex 
                    justify-center bg-secondary
                    rounded-t-lg h-[240px]                
                    cursor-pointer border-primary border-2 border-t-8"
                >
                    <FileUser style={{ width: "50px", height: "50px" }} />
                </div>
            </Link>

            <div
                // style={{
                //     backgroundColor: resume.themeColor
                // }}
                className="w-full bg-primary text-center mt-auto text-white py-2 text-sm font-bold border-t-4 rounded-b-lg border-teal-500 flex justify-between items-center px-4"
            >
                <span>{resume?.resumeTitle || "Untitled Resume"}</span>

                {/* Dropdown Menu (Separate from Link) */}
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-primary w-0 cursor-pointer'>
                        <MoreVertical className='h-4 w-4' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-primary text-white">
                        <DropdownMenuItem onClick={() => navigate(`/resume/${resume?.resumeId}/edit`)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/resume/${resume?.resumeId}/view`)}>
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={openAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this resume.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}> {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default ResumeCardItem;
