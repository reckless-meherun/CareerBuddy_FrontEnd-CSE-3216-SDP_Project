import { PlusSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/profile";
import { useResumeApi } from "@/hooks/useResumeApi";
import axios from "axios";

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");
    const [profile, setProfile] = useState(null);
    const { getProfile } = useProfile();
    const { useCreateResume } = useResumeApi();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        if(!profile){
        fetchProfile();
        }
    }, [getProfile]);

    const handleCreate = async () => {
        if (!profile || !resumeTitle) return;
        setLoading(true);

        try {
            // Prepare payload
            const payload = {
                resumeName: resumeTitle,
                jobTitle: "Your Desired Job Title", // Add dynamic logic if needed
                summary: profile.bio || "",
                themeColor: "#11f8fb", // Default color or user selection
                firstName: profile.name.split(" ")[0],
                lastName: profile.name.split(" ")[1] || "",
                email: profile.email,
                phoneNumber: profile.phoneNumber || "",
                address: profile.address,
                educations: profile.educationSet.map((edu) => edu.id),
                experiences: profile.experienceSet.map((exp) => exp.id),
                skills: profile.skillSet.map((skill) => skill.id),
            };

            // Send API request
            const response = await useCreateResume(profile.id, payload)

            // Redirect to edit page with new resume ID
            navigate(`/resume/${response.id}/edit`);
        } catch (err) {
            console.error("Error creating resume:", err);
        } finally {
            setLoading(false);
            setOpenDialog(false);
        }
    };

    return (
        <div>
            <div
                className="flex justify-center items-center border-2 bg-secondary hover:shadow-md py-24 p-14 border border-dashed rounded-lg h-[295px] transition-all cursor-pointer hover:scale-105"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare style={{ width: "50px", height: "50px" }} />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input
                                className="my-2"
                                placeholder="Ex. Full Stack Resume"
                                value={resumeTitle}
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">
                                Cancel
                            </Button>
                            <Button disabled={!resumeTitle || loading} onClick={handleCreate}>
                                {loading ? <Loader2 className="animate-spin" /> : "Create"}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
