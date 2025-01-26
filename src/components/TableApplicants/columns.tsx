"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // Adjust path if necessary
import { useState } from "react";
import { toast } from "react-toastify";
import useApplyForJob from "@/hooks/useApplyForJob";
import { useNavigate } from "react-router-dom";
import { useResumeApi } from "@/hooks/useResumeApi";
import { searchProfile } from "@/api/profileApi";

export type Applicant = {
    id: string;
    name: string;
    role: string;
    date: Date;
    userId: string;
    status: "Pending" | "Processing" | "Called for an Interview" | "Accept" | "Reject";
};

export const columns: ColumnDef<Applicant>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "appliedAt",
        header: "Applying Date",
        cell: ({ getValue }) => {
            const date = new Date(getValue());
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updating Date",
        cell: ({ getValue }) => {
            const date = new Date(getValue());
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue() as Applicant["status"];
            const statusColors = {
                Pending: "bg-yellow-200 text-yellow-800",
                Processing: "bg-blue-200 text-blue-800",
                "Called for an Interview": "bg-purple-200 text-purple-800",
                Accepted: "bg-green-200 text-green-800",
                Rejected: "bg-red-200 text-red-800",
            };

            return (
                <span
                    className={`px-2 py-1 rounded-md font-semibold ${statusColors[status]}`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [currentStatus, setCurrentStatus] = useState(row.original.status);
            const [priority, setPriority] = useState<number | undefined>(0);
            const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false); // Modal state
            const { isLoading, useUpdateJobApplications, useUpdtapriorityIndes } = useApplyForJob();
            const navigate = useNavigate();
            const { getResumes } = useResumeApi();

            const handleStatusUpdate = async (newStatus: Applicant["status"]) => {
                try {
                    await useUpdateJobApplications(row.original.id, newStatus);
                    setCurrentStatus(newStatus);
                    toast.success(`Status updated to: ${newStatus}`);
                } catch (error) {
                    console.error("Failed to update status:", error);
                }
            };

            const handlePriorityUpdate = async () => {
                try {
                    if (priority !== undefined) {
                        console.log(priority);
                        const response = await useUpdtapriorityIndes(row.original.id, priority);
                        if (response) {
                            toast.success(`Priority updated to: ${priority}`);
                            setIsPriorityModalOpen(false);
                            window.location.reload();
                        }
                    }
                } catch (error) {
                    toast.error("Failed to update priority. Please try again.");
                    console.error("Failed to update priority:", error);
                }
            };

            async function handleViewResume(profileId: string): Promise<void> {
                try {
                    const response1 = await searchProfile(profileId);
                    const response = await getResumes(response1.id);
                    const resume = response.find((item) => item.state === "FINALISED");
                    if (resume) {
                        navigate(`/resume/${resume.resumeId}/view`);
                    }
                } catch (error) {
                    console.error("Failed to view resume:", error);
                }
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0 w-8 h-8">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {["Pending", "Accepted", "Rejected"].map((status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => handleStatusUpdate(status as Applicant["status"])}
                                >
                                    {status}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate("/my-calendar", {
                                        state: {
                                            userId: row.original.userId,
                                            applicationId: row.original.id,
                                        },
                                    })
                                }
                            >
                                Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResume(row.original.userId)}>
                                View Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsPriorityModalOpen(true)}>
                                Update Priority
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Modal for Updating Priority */}
                    <Dialog open={isPriorityModalOpen} onOpenChange={setIsPriorityModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Priority</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={priority ?? ""}
                                    onChange={(e) => {setPriority(Number(e.target.value))
                                        console.log(e.target.value)
                                    }}
                                    className="px-4 py-2 border rounded-md"
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsPriorityModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handlePriorityUpdate}
                                    disabled={isLoading || priority === undefined}
                                >
                                    Update
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
