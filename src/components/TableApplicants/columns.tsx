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
        accessorKey: "adress",
        header: "Address",
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
            const {isLoading, useUpdateJobApplications} = useApplyForJob();
            const navigate = useNavigate();
            const { getResumes} = useResumeApi();

            const handleStatusUpdate = async (newStatus: Applicant["status"]) => {
                try {
                    // Example: Replace with your API call
                    // await updateApplicantStatus(row.original.id, newStatus);
                    await useUpdateJobApplications(row.original.id, newStatus)
                    setCurrentStatus(newStatus);
                    toast.success(`Status updated to: ${newStatus}`);
                } catch (error) {
                    console.error("Failed to update status:", error);
                }
            };

            async function handeviewResume(profileId: string): Promise<void> {
                const response1 = await searchProfile(profileId);
                const response = await getResumes(response1.id);
                const resumeId = response[0].resumeId;
                console.log(response);
                navigate(`/resume/${resumeId}/view`);
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 w-8 h-8">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {["Pending",  "Accepted", "Rejected"].map(
                            (status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => handleStatusUpdate(status as Applicant["status"])}
                                >
                                    {status}
                                </DropdownMenuItem>
                            )
                        )}
                        <DropdownMenuItem
                        onClick={() => navigate("/my-calendar", {
                            state: { userId: row.original.userId,
                                applicationId: row.original.id,
                             },
                            
                        })}
                        >
                            Schedule meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        onClick={() => handeviewResume(row.original.userId)}
                        >
                            View Resume
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
