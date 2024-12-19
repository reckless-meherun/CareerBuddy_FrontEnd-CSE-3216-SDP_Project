import React, { useState } from "react";
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

interface MyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (title: string) => void;
    loading?: boolean;
}

function MyDialog({ open, onOpenChange, onCreate, loading }: MyDialogProps) {
    const [resumeTitle, setResumeTitle] = useState("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                    <div className="flex justify-end gap-5">
                        {/* Cancel Button */}
                        <Button onClick={() => onOpenChange(false)} variant="ghost">
                            Cancel
                        </Button>
                        {/* Create Button */}
                        <Button
                            disabled={!resumeTitle || loading}
                            onClick={() => onCreate(resumeTitle)}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default MyDialog;
