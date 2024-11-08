import React from "react";

// Define the type for the column
interface TableColumn {
    key: string;   // Key for accessing the value in each row
    header: string; // Display name for the column
}

// Define the type for the table data row
interface TableRow {
    [key: string]: string | number;  // A row can have keys with values of any type (string or number)
}

// Define the type for the Table props
interface TableProps {
    columns: TableColumn[];  // Array of column objects
    data: TableRow[];        // Array of data rows, each being an object with column values
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
    return (
        <table className="w-full text-left border-collapse border-spacing-2 rounded-lg">
            <thead>
                <tr className="bg-[#d0fcf4] dark:bg-[#558b88]">
                    {columns.map((column, index) => (
                        <th key={index} className="p-3 border-b font-medium font-semibold text-gray-700 dark:text-gray-200">
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}>
                            {columns.map((column) => (
                                <td key={column.key} className="p-3 border-b text-gray-600 dark:text-gray-300">
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="p-3 text-center text-gray-600 dark:text-gray-300">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td className="p-3 border-b text-gray-600 dark:text-gray-300 rounded-bl-lg" colSpan={columns.length}></td>
                </tr>
            </tfoot>
        </table>
    );
};

export default Table;
