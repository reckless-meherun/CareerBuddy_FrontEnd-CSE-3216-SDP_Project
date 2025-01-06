"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export interface JobPost {
  id: string;
  title: string;
  description: string;
  location: string;
  experience: number;
  jobType: string;
  deadline: string; // ISO Date string
  salary: number;
  company: {
    id: string;
    companyName: string;
  };
  skills: {
    id: string;
    name: string;
  }[];
}

export const columns: ColumnDef<JobPost>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company.companyName",
    header: "Company Name",
    cell: ({ row }) => row.original.company.companyName,
  },
  {
    accessorKey: "experience",
    header: "Experience (Years)",
    cell: ({ getValue }) => `${getValue()} years`,
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }); // Output: "06 Jan 2025"
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const jobPost = row.original;
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
            <DropdownMenuItem
              onClick={() => navigate(`/applicants-table/${jobPost.id}`)}
            >
              View Applicants
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/edit-job/${jobPost.id}`)}
            >
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete Post", jobPost.id)}
            >
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
