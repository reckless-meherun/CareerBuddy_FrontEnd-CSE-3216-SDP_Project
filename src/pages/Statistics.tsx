import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
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
} from 'chart.js';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react';

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

function Statistics() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Chart data configurations remain the same
    const jobApplicationsData = {
        labels: ['Software Engineer', 'Designer', 'Product Manager', 'Data Analyst'],
        datasets: [
            {
                label: 'Applications Received',
                data: [120, 80, 150, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const hiringTrendData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Candidates Hired',
                data: [5, 10, 8, 15, 12],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const applicationSourcesData = {
        labels: ['Job Portal', 'Referrals', 'Social Media', 'Direct Applications'],
        datasets: [
            {
                data: [50, 30, 10, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                align: 'center'
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8"
        >
            <motion.h1 
                variants={itemVariants}
                className="text-3xl font-bold mb-6 text-center"
            >
                Recruitment Dashboard
            </motion.h1>

            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* Section 1: Job Applications */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                        Applications Per Job
                    </h2>
                    <div className="h-64">
                        <Bar data={jobApplicationsData} options={chartOptions} />
                    </div>
                </motion.div>

                {/* Section 2: Hiring Trends */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                        Hiring Trends
                    </h2>
                    <div className="h-64">
                        <Line data={hiringTrendData} options={chartOptions} />
                    </div>
                </motion.div>

                {/* Section 3: Application Sources */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-500" />
                        Application Sources
                    </h2>
                    <div className="h-64">
                        <Pie data={applicationSourcesData} options={pieChartOptions} />
                    </div>
                </motion.div>
            </motion.div>

            {/* Section 4: Summary Statistics */}
            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
            >
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Total Applications
                    </h3>
                    <motion.p 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                    >
                        450
                    </motion.p>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-green-500" />
                        Jobs Posted
                    </h3>
                    <motion.p 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-2xl font-bold text-green-600 dark:text-green-400"
                    >
                        25
                    </motion.p>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Candidates Hired
                    </h3>
                    <motion.p 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                    >
                        50
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Statistics;