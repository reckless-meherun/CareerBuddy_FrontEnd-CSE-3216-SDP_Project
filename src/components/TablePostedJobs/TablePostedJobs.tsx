import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { JobPost, columns } from "./columns";
import { DataTable } from "./data-table";
import { useJobPost } from "@/hooks/useJobPost";

// async function getData(companyId?: string): Promise<JobPost[]> {
//     const allJobs: JobPost[] = [
//         {
//             id: "728ed52f",
//             companyName: "Google",
//             role: "Software Engineer",
//             date: new Date("2024-12-25"),
//             applicants: 100,
//         },
//         {
//             id: "2428ed52f",
//             companyName: "Amazon",
//             role: "Frontend Developer",
//             date: new Date("2024-12-25"),
//             applicants: 50,
//         },
//     ];

//     return companyId
//         ? allJobs.filter((job) => job.id === companyId)
//         : allJobs;
// }

export default function JobPostsTable() {
    const { companyId } = useParams<{ companyId: string }>(); // Get companyId from URL
    const [data, setData] = useState<JobPost[] >([]);
    const { loading, useGetJobPost, error } = useJobPost(); // Get handleJobPost hook from useJobPost.ts

    useEffect(() => {
        async function fetchData() {
            if (companyId){
                const result = await useGetJobPost(companyId);
                setData(result);
            }
            
        }
        fetchData();
    }, [companyId]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">📄 Recent Job Posts</h3>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
