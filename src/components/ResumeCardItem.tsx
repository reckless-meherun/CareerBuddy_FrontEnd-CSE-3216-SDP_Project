import { FileUser, MoreVertical } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ResumeCardItem({ resume }) {
    const navigate = useNavigate();

    return (
        <div className="hover:scale-105 transition-all hover:shadow-md">
            {/* Card Content */}
            <Link to={`/resume/${resume?.resumeId}/edit`}>
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

            {/* Title and Dropdown Menu */}
            <div
                className="w-full text-center mt-auto text-white bg-primary py-2 text-sm font-bold border-t-4 rounded-b-lg border-teal-500 flex justify-between items-center px-4"
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default ResumeCardItem;
