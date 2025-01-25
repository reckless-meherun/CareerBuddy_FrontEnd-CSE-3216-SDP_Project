import React from "react";
// import DashboardButton from "./DashboardButton";
import {
    ClipboardCheck,
    UserRoundPen,
    CalendarDays,
    BookMarked,
    BellRing,
} from "lucide-react";

const ApplicantDashboard = ({ profileId, user, navigate }) => {
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
            width = "630px", // Default width
            height = "auto", // Default height
            iconSize = "40px", // Default icon size
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
                  bg-gradient-to-r from-white via-teal-100 to-white
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
                    <Icon className={`w-[50px] h-[50px] transition-transform duration-300 group-hover:rotate-3`} />
                </div>
            );
        };
    
    return (
        <div className="flex-1 dark:bg-gray-800 p-4 w-[200px]">
            <div className="flex flex-col justify-evenly">
                <DashboardButton
                    onClick={() => navigate("/applied-jobs-table")}
                    title="Applied Jobs"
                    Icon={ClipboardCheck}
                    height="90px"
                />
                <DashboardButton
                    onClick={() => navigate(`/job-recommendations/${profileId}`)}
                    title="Recommended Jobs"
                    Icon={UserRoundPen}
                    height="90px"
                />
                <DashboardButton
                    onClick={() => {
                        if (!user?.id) {
                            alert("User ID is not available. Please log in or refresh the page.");
                            return;
                        }
                        navigate("/my-calendar", {
                            state: { userId: user.id },
                        });
                    }}
                    title="My Calendar"
                    Icon={CalendarDays}
                    height="90px"
                />
                <DashboardButton
                    onClick={() => navigate(`/saved-jobs/${profileId}`)}
                    title="Saved Jobs"
                    Icon={BookMarked}
                    height="90px"
                />
                <DashboardButton
                    onClick={() => navigate("/subscribed-companies")}
                    title="Subscribed Companies"
                    Icon={BellRing}
                    height="90px"
                />
            </div>
        </div>
    );
};

export default ApplicantDashboard;
