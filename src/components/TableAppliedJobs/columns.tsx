"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, XCircle, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Add a tooltip component

export type JobPost = {
    id: string;
    jobId: string;
    companyName: string;
    role: string;
    appliedAt: Date;
    status: "Pending" | "Processing" | "Called for an Interview" | "Accepted" | "Rejected";
};

export const columns: ColumnDef<JobPost>[] = [
    {
        accessorKey: "id",
        header: "Application ID",
        cell: ({ getValue }) => (
            <span className="font-medium text-gray-800 dark:text-gray-300">{getValue()}</span>
        ),
    },
    {
        accessorKey: "company.companyName",
        header: "Company Name",
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-800 dark:text-gray-300">{getValue()}</span>
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Post",
        cell: ({ getValue }) => (
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                {getValue()}
            </span>
        ),
    },
    {
        accessorKey: "appliedAt",
        header: "Applying Date",
        cell: ({ getValue }) => {
            const date = new Date(getValue());
            return (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-400">
                        {date.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const statusColor = {
                Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                "Called for an Interview": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
                Accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            };
            return (
                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor[getValue()]}`}
                >
                    {getValue()}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const jobPost = row.original;
            const navigate = useNavigate();

            return (
                <div className="text-center">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(company.id)}
                        >Edit Company</DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => navigate('/detail-job-post-preview')}>Detail</DropdownMenuItem>
                        <DropdownMenuItem >Cancel Application</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            );
        },
    },
];
