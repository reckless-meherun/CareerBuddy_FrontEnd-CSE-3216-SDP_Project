import { useEffect, useState } from "react";
import { Company, columns } from "./columns";
import { DataTable } from "./data-table";
import useCompany from "@/hooks/useCompany";

export default function CompaniesTable() {
    const [data, setData] = useState<Company[]>([]);
    const { useGetCompaniesbyUser, error, loading } = useCompany();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await useGetCompaniesbyUser();
                console.log(result, "got companies");
                setData(result || []);
            } catch (err) {
                console.error("Error fetching companies:", err);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <div className="flex justify-center items-center mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                            My Companies
                        </span>
                    </div>
                    {data.length === 0 ? (
                        <div>No companies found.</div>
                    ) : (
                        <DataTable columns={columns} data={data} />
                    )}
                </div>
            </div>
        </div>
    );
}
