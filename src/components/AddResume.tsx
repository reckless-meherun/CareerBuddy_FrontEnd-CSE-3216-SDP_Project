import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");

    const navigate=useNavigate();

    const onCreate = () => {
        const uuid = uuidv4();
        console.log(resumeTitle, uuid);        
    };

    const handleCreate = (title: string) => {
        setLoading(true);
        console.log("Resume title:", title);

        // Simulate an API call or other logic
        setTimeout(() => {
            setLoading(false);
            setOpenDialog(false);
            console.log("Resume created successfully!");
        }, 2000);
    };

    return (
        <div>
            <div
                className='p-14 py-24 border 
                items-center flex 
                justify-center bg-secondary
                rounded-lg h-[295px]
                hover:scale-105 transition-all hover:shadow-md
                cursor-pointer border-dashed border-2'
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare style={{ width: '50px', height: '50px' }} />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input
                                className="my-2"
                                placeholder="Ex. Full Stack resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => navigate("/resume/"+123+"/edit")} // 123 should be replaced with resumeId
                            >
                                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
