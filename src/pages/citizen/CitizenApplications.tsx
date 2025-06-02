import { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import CitizenLayout from "../../components/citizen/layout/CitizenLayout";
import {
  FaSearch,
  FaFileAlt,
  FaPassport,
  FaIdCard,
  FaCheckCircle,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import Card from "../../components/ui/Card";

interface Application {
  id: string;
  type: string;
  status: string;
  submittedDate: string;
  lastUpdated: string;
  icon: JSX.Element;
  progress: number;
}

const CitizenApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample applications data
  const allApplications: Application[] = [
    {
      id: "APP-2025-0123",
      type: "Passport Renewal",
      status: "In Progress",
      submittedDate: "2025-05-20",
      lastUpdated: "2025-05-22",
      icon: <FaPassport className="text-blue-500" />,
      progress: 60,
    },
    {
      id: "ETC-2025-0456",
      type: "Emergency Travel Certificate",
      status: "Pending",
      submittedDate: "2025-05-25",
      lastUpdated: "2025-05-25",
      icon: <FaIdCard className="text-yellow-500" />,
      progress: 30,
    },
    {
      id: "NOL-2025-0789",
      type: "No Objection Letter",
      status: "Approved",
      submittedDate: "2025-04-15",
      lastUpdated: "2025-04-28",
      icon: <FaFileAlt className="text-green-500" />,
      progress: 100,
    },
    {
      id: "ATT-2025-0321",
      type: "Document Attestation",
      status: "Rejected",
      submittedDate: "2025-05-10",
      lastUpdated: "2025-05-15",
      icon: <FaCheckCircle className="text-red-500" />,
      progress: 80,
    },
    {
      id: "PAS-2025-0654",
      type: "New Passport Application",
      status: "Draft",
      submittedDate: "2025-05-28",
      lastUpdated: "2025-05-28",
      icon: <FaPassport className="text-gray-500" />,
      progress: 10,
    },
  ];

  // Filter applications based on search and status
  const filteredApplications = allApplications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      app.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "in progress":
        return "bg-blue-500";
      case "rejected":
        return "bg-red-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <CitizenLayout title="My Applications">
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by application ID or type"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:w-48">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <Link
            to="/citizen/applications/new"
            className="md:w-48 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            New Application
          </Link>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">
            Applications ({filteredApplications.length})
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredApplications.length} of {allApplications.length}{" "}
            applications
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Application
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Submitted
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          {application.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${getStatusBgColor(
                            application.status
                          )}`}
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 text-gray-500 text-right">
                        {application.progress}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/citizen/applications/${application.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <FaEye className="inline-block" /> View
                      </Link>
                      {application.status === "Draft" && (
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash className="inline-block" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 text-center border border-gray-200 rounded-lg">
            <FaFileAlt className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              No applications found
            </h3>
            <p className="mt-1 text-gray-500">
              No applications match your current filters.
            </p>
            {searchTerm || filterStatus !== "all" ? (
              <button
                className="mt-3 text-primary-600 hover:text-primary-800"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link
                to="/citizen/applications/new"
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Start your first application
              </Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                results
              </p>
            </div>
            <div className="flex justify-between sm:justify-end">
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </CitizenLayout>
  );
};

export default CitizenApplications;
