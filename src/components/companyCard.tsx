import React, { useEffect, useState } from "react";

type Company = {
  id: string;
  companyName: string;
  active: boolean;
  location?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  size?: string;
  foundationYear?: string | Date;
  domain?: string;
  description?: string;
};

type CompanyCardProps = {
  company: Company;
  fetchSubscriptionStatus: (companyId: string) => Promise<{subscribed:boolean}>;
  handleSubscription: (company: Company) => Promise<void>;
  handleUnsubscription: (company: Company) => Promise<void>;
};

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  fetchSubscriptionStatus,
  handleSubscription,
  handleUnsubscription,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isfetched, setIsFetched] = useState(false);

  // Fetch subscription status on component mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await fetchSubscriptionStatus(company.id);
        console.log(status);
        setIsSubscribed(status.subscribed);
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    };
    if(!isfetched){
        fetchStatus();
        setIsFetched(true);
    }
    
  }, [company.id, fetchSubscriptionStatus]);

  const handleButtonClick = async () => {
    setIsLoading(true);
    // setIsFetched(false);
    try {
      if (isSubscribed) {
        await handleUnsubscription(company);
        setIsSubscribed(false);
      } else {
        await handleSubscription(company);
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error while toggling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      key={company.id}
      className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {company.companyName}
        </h3>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            company.active
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {company.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Details Section */}
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p className="flex items-center gap-2">
          📍 <span>{company.location || "Location not available"}</span>
        </p>
        <p className="flex items-center gap-2">
          🌐{" "}
          <a
            href={company.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            {company.website || "Website not available"}
          </a>
        </p>
        <p className="flex items-center gap-2">
          📞 <span>{company.phoneNumber || "Phone not available"}</span>
        </p>
        <p className="flex items-center gap-2">
          ✉️ <span>{company.email || "Email not available"}</span>
        </p>
        <p className="flex items-center gap-2">
          🏢 <span>{company.size || "Size not specified"}</span>
        </p>
        <p className="flex items-center gap-2">
          🗓️{" "}
          <span>
            Founded:{" "}
            {company.foundationYear
              ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
                  new Date(company.foundationYear)
                )
              : "Year not available"}
          </span>
        </p>
        <p className="flex items-center gap-2">
          🛠️ <span>Domain: {company.domain || "Domain not specified"}</span>
        </p>
        <p className="flex items-center gap-2">
          📝 <span>{company.description || "No description available"}</span>
        </p>
      </div>

      {/* Subscribe/Unsubscribe Button */}
      <div className="mt-6 text-center">
        {isSubscribed === null ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`px-6 py-3 h-[50px] w-[240px] font-bold rounded-lg shadow-lg text-white transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 ${
              isSubscribed
                  ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-400 dark:focus:ring-red-700"
                  : "px-6 py-4 h-[50px] w-[240px] text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          }`}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
