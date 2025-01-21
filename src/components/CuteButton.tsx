interface CuteButtonProps {
    onClick: () => void;
    title: string;
    width?: string;  // Optional width for the button
    height?: string; // Optional height for the button
}

const CuteButton: React.FC<CuteButtonProps> = ({
    onClick,
    title,
    width = "100%",  // Default width
    height = "auto", // Default height
}) => {
    return (
        <div
            onClick={onClick}
            className="
              m-4 p-6 rounded-lg
              flex justify-center items-center
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
              dark:text-white dark:shadow-3xl            
              /* Hover effect */
              hover:scale-105
            "
            style={{ width, height }} // Apply custom width and height
        >
            <span className="text-base">{title}</span>
        </div>
    );
};

export default CuteButton;
