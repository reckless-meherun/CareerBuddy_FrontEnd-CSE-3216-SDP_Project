import { useEffect, useState } from "react";
import { JobPost, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<JobPost[]> {
    return [
        {
            id: "728ed52f",
            companyName: "Google",
            role: "Software Engineer",
            date: new Date("2024-12-25"),
            applicants: 100
        },
        {
            id: "2428ed52f",
            companyName: "Amazon",
            role: "Frontend Developer",
            date: new Date("2024-12-25"),
            applicants: 50
          }
    ];
}

export default function RecentJobPostsTable() {
    const [data, setData] = useState<JobPost[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getData();
            setData(result);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                <div className="flex justify-center items-center mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Recent Job Posts
                    </span>
                </div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
