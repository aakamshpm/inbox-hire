import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow, format } from "date-fns";

type Application = {
  id: string;
  job_title: string;
  company_name: string;
  status: string;
  received_at: string;
  last_updated: string | null;
};

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
  Offer: "bg-green-100 text-green-800",
};

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/applications");
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  console.log(applications.length, "applications loaded");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">📥 Inbox Applications</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet. Start applying via your inbox email!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications?.map((app) => (
            <div
              key={app.id}
              className="border p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">
                  {app.job_title || "Untitled Role"}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[app.status] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>Company:</strong> {app.company_name}
              </p>

              <p className="text-sm text-gray-500">
                <strong>Applied On:</strong>{" "}
                {format(new Date(app.received_at), "MMM dd, yyyy")}
              </p>

              {app.last_updated && (
                <p className="text-sm text-gray-500">
                  <strong>Last Update:</strong>{" "}
                  {formatDistanceToNow(new Date(app.last_updated), {
                    addSuffix: true,
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
