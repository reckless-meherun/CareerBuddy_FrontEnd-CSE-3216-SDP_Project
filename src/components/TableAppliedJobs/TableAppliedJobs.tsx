import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { JobPost } from "../TableAppliedJobs/columns";
import useApplyForJob from "@/hooks/useApplyForJob";
import { useJobPost } from "@/hooks/useJobPost";


// async function getData(): Promise<JobPost[]> {
//     return [
//         {
//             id: "728ed52f",
//             companyName: "Google",
//             role: "Software Engineer",
//             date: new Date("2024-12-25"),
//             status: "Pending"
//         },
//         {
//             id: "2428ed52f",
//             companyName: "Amazon",
//             role: "Frontend Developer",
//             date: new Date("2024-12-25"),
//             status: "Accepted"
//         }
//     ];
// }

export default function AppliedJobsTable() {
    const [data, setData] = useState<JobPost[]>([]);
    const { useGetAppliedlJobs, isLoading, error } = useApplyForJob();
    const { useGetJobPosts, loading } = useJobPost();


    useEffect(() => {
        async function fetchData() {
            try {
                const appliedJobs = await useGetAppliedlJobs(); // Fetch applied jobs
                const detailedJobs = await Promise.all(
                    appliedJobs.map(async (job: JobPost) => {
                        const jobDetails = await useGetJobPosts(job.jobId); // Fetch job details using jobId
                        return { ...job, ...jobDetails }; // Merge original job data with fetched details
                    })
                );
                setData(detailedJobs); // Update state with merged data
            } catch (err) {
                console.error("Error fetching job details:", err);
            }
        }
        fetchData();
    }, []);
    if (isLoading || loading) {
        return <div>Loading...</div>;
    }
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <div className="flex justify-center items-center mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Applied Jobs
                        </span>
                    </div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
