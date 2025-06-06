import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  FiMail,
  FiCalendar,
  FiEdit2,
  FiClock,
  FiBriefcase,
  FiLoader,
} from "react-icons/fi";
import api from "../utils/api";
import { FaRegBuilding } from "react-icons/fa";

type Application = {
  id: number;
  created_at: string;
  user_id: string;
  job_title: string | null;
  body_preview: string | null;
  source_email: string;
  status: string;
  subject: string | null;
  company_name: string | null;
  received_at: string | null;
  notes: string | null;
  is_reply: boolean;
};

const statusColors: Record<string, string> = {
  Applied: "bg-blue-900/30 text-blue-400",
  Interview: "bg-yellow-900/30 text-yellow-400",
  Rejected: "bg-red-900/30 text-red-400",
  Offer: "bg-green-900/30 text-green-400",
};

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/api/user/applications");
        setApplications(res.data.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="w-full bg-gray-900">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto text-gray-100 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
            <FiMail className="text-blue-400" /> Inbox Applications
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track all your job applications in one place
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-2 text-blue-400">
              <FiLoader className="animate-spin" size={20} />
              <span>Loading applications...</span>
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center p-6 max-w-md bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-300">
                No applications yet. Start applying via your inbox email!
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <FiBriefcase className="text-blue-400" /> Position
                    </div>
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <FaRegBuilding className="text-blue-400" /> Company
                    </div>
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <FiMail className="text-blue-400" /> Source
                    </div>
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="text-blue-400" /> Date
                    </div>
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <FiEdit2 className="text-blue-400" /> Notes
                    </div>
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {applications?.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <div className="font-medium text-white">
                        {app.job_title || "Unknown Position"}
                      </div>
                      {app.subject && (
                        <div
                          className="text-sm text-gray-400 truncate max-w-[200px]"
                          title={app.subject}
                        >
                          {app.subject}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <div className="text-white">
                        {app.company_name || "Unknown Company"}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap hidden md:table-cell">
                      <div
                        className="text-gray-300 truncate max-w-[180px]"
                        title={app.source_email}
                      >
                        {app.source_email}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          {app.created_at ? (
                            <>
                              <FiClock className="text-gray-500" />
                              {formatDistanceToNow(new Date(app.created_at), {
                                addSuffix: true,
                              })}
                            </>
                          ) : (
                            "Unknown date"
                          )}
                        </div>
                        {app.received_at && (
                          <div className="text-xs text-gray-500">
                            {format(new Date(app.received_at), "MMM dd, yyyy")}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6 hidden sm:table-cell">
                      <div className="text-sm text-gray-300 max-w-[200px] truncate">
                        {app.notes || "No notes"}
                      </div>
                      {app.body_preview && (
                        <div
                          className="text-xs text-gray-500 mt-1 truncate max-w-[200px]"
                          title={app.body_preview}
                        >
                          {app.body_preview}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[app.status] ||
                            "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {app.status || "unknown"}
                        </span>
                        {app.is_reply && (
                          <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">
                            Follow-up
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
