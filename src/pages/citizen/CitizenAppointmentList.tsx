import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaPlus,
  FaSearch,
  FaFilter,
  FaPrint,
} from "react-icons/fa";

// Appointment interface
interface Appointment {
  id: string;
  purpose: string;
  date: string;
  time: string;
  location: string;
  status: string;
  reference: string;
}

const CitizenAppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch appointments
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Example data - in a real app, this would come from an API
      const sampleAppointments: Appointment[] = [
        {
          id: "APT-123456",
          purpose: "Passport Collection",
          date: "2025-06-15",
          time: "10:30 AM",
          location: "Main Embassy Office",
          status: "scheduled",
          reference: "REF-2025-06-15-123456",
        },
        {
          id: "APT-123457",
          purpose: "Document Attestation",
          date: "2025-06-22",
          time: "11:00 AM",
          location: "Northern Consulate",
          status: "scheduled",
          reference: "REF-2025-06-22-123457",
        },
        {
          id: "APT-123458",
          purpose: "Consular Consultation",
          date: "2025-05-30",
          time: "02:00 PM",
          location: "Main Embassy Office",
          status: "completed",
          reference: "REF-2025-05-30-123458",
        },
        {
          id: "APT-123459",
          purpose: "Visa Application",
          date: "2025-05-10",
          time: "09:30 AM",
          location: "Southern Consulate",
          status: "canceled",
          reference: "REF-2025-05-10-123459",
        },
      ];

      setAppointments(sampleAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  // Navigate to appointment scheduling page
  const handleScheduleAppointment = () => {
    navigate("/citizen/appointments/schedule");
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get filtered appointments
  const getFilteredAppointments = () => {
    return appointments.filter((appointment) => {
      // Filter by search term
      const matchesSearch =
        appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reference
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        filterStatus === "all" || appointment.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Check if appointment is upcoming (in the future)
  const isUpcomingAppointment = (dateString: string) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    return appointmentDate >= today;
  };

  // Check if appointment is today
  const isAppointmentToday = (dateString: string) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    return appointmentDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id: string) => {
    // In a real app, this would make an API call
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "canceled" }
            : appointment
        )
      );
    }
  };

  // Filtered appointments
  const filteredAppointments = getFilteredAppointments();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with action buttons */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-1">
            View and manage your embassy appointments
          </p>
        </div>
        <div className="flex mt-4 sm:mt-0 space-x-3">
          <button
            onClick={handleScheduleAppointment}
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" /> Schedule New Appointment
          </button>
        </div>
      </div>

      {/* Filter and search */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative flex items-center mb-4 md:mb-0 md:w-2/3">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="Search appointments by purpose, reference, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
                <option value="rescheduled">Rescheduled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Today's appointments */}
      {filteredAppointments.some((appointment) =>
        isAppointmentToday(appointment.date)
      ) && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Today's Appointments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments
              .filter(
                (appointment) =>
                  isAppointmentToday(appointment.date) &&
                  appointment.status !== "canceled"
              )
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-md border-l-4 border-primary-500 p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {appointment.purpose}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.reference}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center mb-2">
                      <FaClock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium mr-4"
                      onClick={() =>
                        navigate(`/citizen/appointments/${appointment.id}`)
                      }
                    >
                      View Details
                    </button>
                    {appointment.status === "scheduled" && (
                      <button
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Upcoming appointments */}
      {filteredAppointments.some(
        (appointment) =>
          isUpcomingAppointment(appointment.date) &&
          !isAppointmentToday(appointment.date)
      ) && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Appointments
          </h2>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments
                  .filter(
                    (appointment) =>
                      isUpcomingAppointment(appointment.date) &&
                      !isAppointmentToday(appointment.date)
                  )
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.purpose}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.reference}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-primary-600 hover:text-primary-800 mr-3"
                          onClick={() =>
                            navigate(`/citizen/appointments/${appointment.id}`)
                          }
                        >
                          View
                        </button>
                        {appointment.status === "scheduled" && (
                          <>
                            <button
                              className="text-indigo-600 hover:text-indigo-800 mr-3"
                              onClick={() =>
                                navigate(
                                  `/citizen/appointments/reschedule/${appointment.id}`
                                )
                              }
                            >
                              Reschedule
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Past appointments */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Past Appointments
        </h2>

        {filteredAppointments.some(
          (appointment) => !isUpcomingAppointment(appointment.date)
        ) ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments
                  .filter(
                    (appointment) => !isUpcomingAppointment(appointment.date)
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.purpose}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.reference}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-primary-600 hover:text-primary-800 mr-3"
                          onClick={() =>
                            navigate(`/citizen/appointments/${appointment.id}`)
                          }
                        >
                          View
                        </button>

                        {appointment.status === "completed" && (
                          <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() =>
                              alert("Print functionality would go here")
                            }
                          >
                            <FaPrint className="inline mr-1" /> Print
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No past appointments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Past appointments will appear here.
            </p>
          </div>
        )}
      </div>

      {/* No appointments message */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaCalendarAlt className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No appointments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "You have not scheduled any appointments yet."}
          </p>
          <div className="mt-6">
            <button
              onClick={handleScheduleAppointment}
              className="btn-primary inline-flex items-center"
            >
              <FaPlus className="mr-2" /> Schedule New Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenAppointmentList;
