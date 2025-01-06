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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-500 text-gray-800 dark:text-gray-100">
            <div className="p-10">
                <div className="w-full p-8 mb-10 border-8 rounded-lg md:p-12 bg-white dark:bg-gray-700 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">
                        🏢 Companies Involved
                    </h3>
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
