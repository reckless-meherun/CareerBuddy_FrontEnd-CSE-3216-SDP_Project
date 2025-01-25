import React from "react";
// import DashboardButton from "./DashboardButton";
import { ClipboardPlus, UserRoundPlus, Store, ChartNoAxesCombined } from "lucide-react";

const RecruiterDashboard = ({ addPostPage, addCompanyPage, navigate }) => {
    interface DashboardButtonProps {
        onClick: () => void;
        title: string;
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        width?: string; // Optional width for the button
        height?: string; // Optional height for the button
        iconSize?: string; // Optional size for the icon
    }

    const DashboardButton: React.FC<DashboardButtonProps> = ({
        onClick,
        title,
        Icon,
        width = "100%", // Default width
        height = "auto", // Default height
        iconSize = "80px", // Default icon size
    }) => {
        return (
            <div
                onClick={onClick}
                className={`
              m-4 p-6 rounded-lg
              flex justify-between items-center px-8
              cursor-pointer
              transition-all duration-300
      
              /* Light mode */
              bg-gradient-to-r from-white via-teal-50 to-white
              hover:from-teal-500 hover:via-teal-400 hover:to-blue-500
              text-gray-800 hover:text-white
              shadow-lg hover:shadow-xl
      
              /* Dark mode */
              dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
              dark:hover:from-teal-600 dark:hover:via-teal-500 dark:hover:to-blue-600
              dark:text-white dark:shadow-2xl
      
              /* Hover effect */
              hover:scale-105
            `}
                style={{ width, height }} // Apply custom width and height
            >
                <span className="font-semibold text-xl">{title}</span>
                <Icon className={`w-[100px] h-[100px] transition-transform duration-300 group-hover:rotate-3`} />
            </div>
        );
    };

    return (
        <div className="flex-1 bg-gray-200 dark:bg-gray-800 p-4 w-full min-h-screen">
            <div className="flex flex-col justify-evenly min-h-screen">
                <DashboardButton
                    onClick={addPostPage}
                    title="Create A Job Post"
                    Icon={ClipboardPlus}
                    height="200px"
                />
                <DashboardButton
                    onClick={addCompanyPage}
                    title="Add A New Company"
                    Icon={UserRoundPlus}
                    height="200px"
                />
                <DashboardButton
                    onClick={() => navigate("/companies-table")}
                    title="My Companies"
                    Icon={Store}
                    height="200px"
                />
                <DashboardButton
                    onClick={() => navigate("/statistics")}
                    title="Statistics"
                    Icon={ChartNoAxesCombined}
                    height="200px"
                />
            </div>
        </div>
    );
};

export default RecruiterDashboard;
