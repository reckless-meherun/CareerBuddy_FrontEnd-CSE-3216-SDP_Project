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

export type Company = {
    id: string
    companyName: string
    email: string
    foundationYear: string
    active: boolean
    description: string
    domain: string
    location : string   
    phoneNumber: string
    registrationYear:string 
    size: string
    userId: string
    website: string 

}

export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "companyName",
        header: "Company Name",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
            const description = getValue() as string;
            const maxLength = 50; // Adjust the maximum length as needed
            return description.length > maxLength
                ? `${description.substring(0, maxLength)}...`
                : description;
        },
    },
    {
        accessorKey: "foundationYear", // or the key for your date column
        header: "Joining Date",
        cell: ({ getValue }) => {
            const dateString = getValue() as string; // ISO format date
            const date = new Date(dateString);
            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }); // Output: "11 Dec 2024"
        },
    },
    {
        accessorKey: "active",
        header: "Status",
        cell: ({ getValue }) => {
            const isActive = getValue() as boolean;
            return (
                <span
                    className={`px-2 py-1 rounded ${
                        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
            );
        },
    },
    {
        accessorKey: "domain",
        header: "Domain",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const company = row.original;
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
                        <DropdownMenuItem onClick={() => navigate("/create-company")}>
                            Edit Company
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/create-company")}>
                            Delete Company
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/job-posts-table/${company.id}`)}>
                            Jobs
                        </DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
