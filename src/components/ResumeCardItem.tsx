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
    // console.log(resume, "resume");

    const onDelete = () => {
        setLoading(true)
        setOpenAlert(false)
        setLoading(false)
    }

    return (
        <div className="hover:shadow-md transition-all hover:scale-105">
            {/* Card Content */}
            <Link to={`/resume/${resume.resumeId}/edit`}>
                <div
                    className="flex justify-center items-center border-2 border-primary bg-secondary bg-gradient-to-b from-gray-100 via-teal-100 to-gray-600 py-24 p-14 border border-t-8 rounded-t-lg h-[240px] cursor-pointer"
                >
                    <FileUser style={{ width: "50px", height: "50px" }} />
                </div>
            </Link>

            <div
                // style={{
                //     backgroundColor: resume.themeColor
                // }}
                className="flex justify-between items-center bg-primary mt-auto px-4 py-2 border-t-4 border-teal-500 rounded-b-lg w-full font-bold text-center text-sm text-white"
            >
                <span>{resume?.resumeName || "Untitled Resume"}</span>

                {/* Dropdown Menu (Separate from Link) */}
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-primary w-0 cursor-pointer'>
                        <MoreVertical className='w-4 h-4' />
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
