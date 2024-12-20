"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export type JobPost = {
    id: string
    companyName: string
    role: string
    date: Date
    status: "Pending" | "Processing" | "Called for an Interview" | "Accepted" | "Rejected"
}

export const columns: ColumnDef<JobPost>[] = [
    {
        accessorKey: "id",
        header: "Applicantion ID",
    },
    {
        accessorKey: "companyName",
        header: "Company Name",
    },
    {
        accessorKey: "role",
        header: "Post",
    },
    {
        accessorKey: "date", // or the key for your date column
        header: "Applying Date",
        cell: ({ getValue }) => {
            const date = new Date(getValue());
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }); // Output: "25 Dec 2024"
        },
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const jobPost = row.original
            const navigate = useNavigate();

            return (
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
            )
        },
    },
]
