/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, type JSX } from "react";
import { Link } from "react-router-dom";
import CitizenLayout from "../../components/citizen/layout/CitizenLayout";
import {
  FaFileAlt,
  FaPassport,
  FaIdCard,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaEnvelope,
  FaPlus,
  FaBell,
} from "react-icons/fa";
import Card from "../../components/ui/Card";

interface ApplicationStatus {
  id: string;
  type: string;
  status: string;
  submittedDate: string;
  updatedDate: string;
  icon: JSX.Element;
  progress: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

const CitizenDashboard = () => {
  // Sample data
  const [applications] = useState<ApplicationStatus[]>([
    {
      id: "APP-2025-0123",
      type: "Passport Renewal",
      status: "In Progress",
      submittedDate: "2025-05-20",
      updatedDate: "2025-05-22",
      icon: <FaPassport className="text-blue-500" />,
      progress: 60,
    },
    {
      id: "ETC-2025-0456",
      type: "Emergency Travel Certificate",
      status: "Pending",
      submittedDate: "2025-05-25",
      updatedDate: "2025-05-25",
      icon: <FaIdCard className="text-yellow-500" />,
      progress: 30,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "not-1",
      title: "Document Verification Required",
      message:
        "Please upload additional identification documents for your passport application.",
      date: "2025-05-25",
      read: false,
      type: "warning",
    },
    {
      id: "not-2",
      title: "Application Update",
      message: "Your ETC application has moved to the verification stage.",
      date: "2025-05-23",
      read: false,
      type: "info",
    },
    {
      id: "not-3",
      title: "Payment Received",
      message: "We have received your payment for passport renewal services.",
      date: "2025-05-20",
      read: true,
      type: "success",
    },
  ]);

  const serviceOptions = [
    {
      id: "passport",
      title: "Passport Services",
      description: "Apply for new passport, renew or report lost passport",
      icon: <FaPassport className="h-6 w-6" />,
      link: "/citizen/applications/passport",
    },
    {
      id: "etc",
      title: "Emergency Travel Certificate",
      description: "Apply for an emergency travel document",
      icon: <FaIdCard className="h-6 w-6" />,
      link: "/citizen/applications/etc",
    },
    {
      id: "nol",
      title: "No Objection Letter",
      description: "Request a no objection letter for study or work abroad",
      icon: <FaFileAlt className="h-6 w-6" />,
      link: "/citizen/applications/nol",
    },
    {
      id: "attestation",
      title: "Document Attestation",
      description: "Get your documents attested by the embassy",
      icon: <FaCheckCircle className="h-6 w-6" />,
      link: "/citizen/applications/attestation",
    },
  ];

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "warning":
        return <FaExclamationCircle className="text-yellow-500" />;
      case "error":
        return <FaExclamationCircle className="text-red-500" />;
      case "info":
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  // Example of using useEffect to fetch data
  useEffect(() => {
    // In a real application, you would fetch data from your API here
    // For example:
    // const fetchData = async () => {
    //   try {
    //     const token = localStorage.getItem('citizenToken');
    //     const response = await fetch('/api/citizen/dashboard', {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await response.json();
    //     setApplications(data.applications);
    //     setNotifications(data.notifications);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   }
    // };
    //
    // fetchData();
  }, []);

  return (
    <CitizenLayout title="Citizen Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications */}
        <div className="lg:col-span-2">
          <Card
            title="My Recent Applications"
            icon={<FaFileAlt />}
            className="mb-6"
          >
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">{app.icon}</div>
                        <div>
                          <h4 className="font-medium">{app.type}</h4>
                          <p className="text-sm text-gray-500">ID: {app.id}</p>
                          <p className="text-sm text-gray-500">
                            Submitted on {app.submittedDate}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 text-right">
                      <Link
                        to={`/citizen/applications/${app.id}`}
                        className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaFileAlt className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">
                  No applications yet
                </h3>
                <p className="mt-1 text-gray-500">
                  Start by applying for a service from the options below.
                </p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Link
                to="/citizen/applications"
                className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
              >
                <span>View all applications</span>
                <svg
                  className="ml-1 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </Card>

          {/* Services */}
          <Card title="Embassy Services" icon={<FaCheckCircle />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <Link
                  key={service.id}
                  to={service.link}
                  className="border border-gray-200 rounded-lg p-4 flex hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="mr-4 flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Important Notifications */}
          <Card title="Notifications" icon={<FaBell />}>
            <div className="divide-y divide-gray-200">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`py-3 ${!notification.read ? "bg-gray-50" : ""}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              New
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  No new notifications
                </div>
              )}
            </div>

            <div className="mt-4">
              <Link
                to="/citizen/notifications"
                className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center justify-center"
              >
                <span>View all notifications</span>
                <svg
                  className="ml-1 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </Card>

          {/* Quick Links */}
          <Card title="Quick Links">
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <a
                  href="https://immigration.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <FaExclamationCircle className="mr-2 text-primary-500" />
                  <span>Immigration Website</span>
                </a>
              </li>
              <li className="py-2">
                <Link
                  to="/citizen/support"
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <FaEnvelope className="mr-2 text-primary-500" />
                  <span>Contact Support</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  to="/citizen/faq"
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <FaInfoCircle className="mr-2 text-primary-500" />
                  <span>FAQs</span>
                </Link>
              </li>
            </ul>
          </Card>

          {/* Need Help Widget */}
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-center">
            <FaInfoCircle className="mx-auto h-8 w-8 text-primary-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Our support team is ready to assist you with any questions
            </p>
            <Link
              to="/citizen/support"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Start Application CTA */}
      <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-md overflow-hidden">
        <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8 lg:py-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to start a new application?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-primary-100">
              Apply for embassy services online. Fast, secure, and convenient.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:ml-8">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/citizen/services"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
              >
                <FaPlus className="mr-2" />
                Start New Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default CitizenDashboard;
