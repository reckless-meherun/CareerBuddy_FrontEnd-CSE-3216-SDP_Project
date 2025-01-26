import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { motion } from "framer-motion";
import { Briefcase, Users, Award } from "lucide-react";
import { useJobPost } from "@/hooks/useJobPost";
import useCompany from "@/hooks/useCompany";
import useApplyForJob from "@/hooks/useApplyForJob";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const useInterval = (callback, delay) => {
    useEffect(() => {
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
    }, [callback, delay]);
};

const ChartCard = ({ title, icon: Icon, children }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl p-6 rounded-lg transition-shadow duration-300"
    >
        <h2 className="flex items-center gap-2 mb-4 font-semibold text-2xl">
            <Icon className="w-6 h-6 text-blue-500" />
            {title}
        </h2>
        <div className="h-64">{children}</div>
    </motion.div>
);

const SummaryCard = ({ title, icon: Icon, value, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl p-6 rounded-lg transition-shadow duration-300"
    >
        <h3 className="flex items-center gap-2 font-semibold text-lg">
            <Icon className={`w-5 h-5 text-${color}-500`} />
            {title}
        </h3>
        <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`font-bold text-2xl text-${color}-600 dark:text-${color}-400`}
        >
            {value}
        </motion.p>
    </motion.div>
);

function Statistics() {
    const { useGetJobPost } = useJobPost();
    const { useGetCompaniesbyUser } = useCompany();
    const { usegetJobApplications } = useApplyForJob();

    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [jobLocations, setJobLocations] = useState({});
    const [jobMonthlyData, setJobMonthlyData] = useState({});

    const fetchData = async () => {
        try {
            const companyData = await useGetCompaniesbyUser();
            setCompanies(companyData);

            const jobPromises = companyData.map((company) =>
                useGetJobPost(company.id)
            );
            const jobsData = await Promise.all(jobPromises);
            setJobs(jobsData.flat());

            const applicationPromises = jobsData.flat().map((job) =>
                usegetJobApplications(job.id)
            );
            const applicationsData = await Promise.all(applicationPromises);
            console.log(applicationsData);
            setApplications(applicationsData.flat());

            // Aggregate job locations for pie chart
            const locationCount = {};
            jobsData.flat().forEach((job) => {
                const location = job.location || "Unknown";
                locationCount[location] = (locationCount[location] || 0) + 1;
            });
            setJobLocations(locationCount);

            // Aggregate job data by month
            const monthlyCount = {};
            jobsData.flat().forEach((job) => {
                const month = new Date(job.deadline).toLocaleString("default", {
                    month: "short",
                });
                monthlyCount[month] = (monthlyCount[month] || 0) + 1;
            });
            setJobMonthlyData(monthlyCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useInterval(fetchData, 600000);

    const jobApplicationsData = {

        // labels:  applications.map(application => {
        //     console.log(application,"application");
        //     application.jobId
        // }),

        labels: jobs.map((job) => job.title),
        datasets: [
            {
                label: "Applications Received",
                data: jobs.map(
                    (job) =>
                        applications.filter((app) => app.jobId === job.id).length
                ),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const jobLocationsData = {
        labels: Object.keys(jobLocations),
        datasets: [
            {
                data: Object.values(jobLocations),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const jobMonthlyChartData = {
        labels: Object.keys(jobMonthlyData),
        datasets: [
            {
                label: "Job Posts",
                data: Object.values(jobMonthlyData),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="bg-gray-100 dark:bg-gray-800 p-8 min-h-screen text-gray-800 dark:text-gray-100"
        >
            {/* <motion.h1 className="mb-6 font-bold text-3xl text-center">
                Recruitment Dashboard
            </motion.h1> */}
            <div className="flex justify-center items-center mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Recruitment Statistics
                </span>
            </div>

            <motion.div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                <ChartCard title="Applications Per Job" icon={Briefcase}>
                    <Bar data={jobApplicationsData} />
                </ChartCard>
                <ChartCard title="Job Locations" icon={Users}>
                    <Pie data={jobLocationsData} />
                </ChartCard>
                <ChartCard title="Job Posts Per Month" icon={Users}>
                    <Line data={jobMonthlyChartData} />
                </ChartCard>
            </motion.div>

            <motion.div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-6">
                <SummaryCard
                    title="Total Applications"
                    icon={Users}
                    value={applications.length}
                    color="blue"
                />
                <SummaryCard
                    title="Jobs Posted"
                    icon={Briefcase}
                    value={jobs.length}
                    color="green"
                />
                <SummaryCard
                    title="Candidates Hired"
                    icon={Award}
                    value={applications.filter((app) => app.status === "Accepted").length}
                    color="purple"
                />
            </motion.div>
        </motion.div>
    );
}

export default Statistics;
