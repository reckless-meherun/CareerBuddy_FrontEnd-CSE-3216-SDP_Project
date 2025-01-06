import { useEffect, useState } from "react";
import { Applicant, columns } from "./columns";
import { DataTable } from "./data-table";
import useApplyForJob from "@/hooks/useApplyForJob";
import { useParams } from "react-router-dom";
import { searchProfile } from "@/api/profileApi";

export default function ApplicantsTable() {
    const { jobId } = useParams<{ jobId: string }>(); // Replace with a real job ID.
    const [data, setData] = useState<Applicant[]>([]);
    const { isLoading, usegetJobApplications } = useApplyForJob(); // Assuming `useApplyForJob` exposes `getJobApplications`.
    const [isData, setIsData] = useState(false); //

    useEffect(() => {
        async function fetchData() {
            console.log(jobId);
            if (!jobId) return; // Ensure `jobId` is set.
            try {
                const jobApplications = await usegetJobApplications(jobId); // Fetch job applications.
                const detailedJobs = await Promise.all(
                    jobApplications.map(async (job: Applicant) => {
                        const jobDetails = await searchProfile(job.userId); // Fetch job details using jobId
                        return {  ...jobDetails, ...job }; // Merge original job data with fetched details
                    })
                );
                console.log(detailedJobs)
                setData(detailedJobs);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        }
        if (!isData) {

            fetchData();
            setIsData(true);  // Set isData to true once data is fetched.
        }
    }, [jobId, usegetJobApplications, isData, setIsData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">🏢 Applicants</h3>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
