import { useEffect, useState } from "react";
import { Applicant, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Applicant[]> {
    return [
        {
            id: "728ed52f",
            name: "Meherun Farzana",
            role: "Software Engineer",
            date: new Date("2024-12-25"),
            status: "Processing"
        },
        {
            id: "2428ed52f",
            name: "Aniket Joarder",
            role: "Frontend Developer",
            date: new Date("2024-12-25"),
            status: "Pending"
        }
    ];
}

export default function ApplicantsTable() {
    const [data, setData] = useState<Applicant[] | null>(null);

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
                    <h3 className="text-2xl font-bold text-center mb-4">🏢 Applicants</h3>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
