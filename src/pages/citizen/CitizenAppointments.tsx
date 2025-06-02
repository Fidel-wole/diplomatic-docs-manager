import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";

// Available services for appointments
const availableServices = [
  { id: "passport", name: "Passport Collection" },
  { id: "document-attestation", name: "Document Attestation" },
  { id: "certificate", name: "Certificate Collection" },
  { id: "consultation", name: "Consular Consultation" },
  { id: "visa", name: "Visa Application" },
  { id: "notary", name: "Notary Services" },
];

// Available locations
const availableLocations = [
  {
    id: "main-embassy",
    name: "Main Embassy Office",
    address: "123 Embassy Road, Main City",
  },
  {
    id: "consulate-north",
    name: "Northern Consulate",
    address: "456 Consulate Avenue, North City",
  },
  {
    id: "consulate-south",
    name: "Southern Consulate",
    address: "789 Diplomatic Street, South City",
  },
];

const AppointmentScheduling = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Service Selection
    serviceType: "",
    serviceDetails: "",

    // Date and Time
    appointmentDate: "",
    appointmentTime: "",

    // Location
    location: "",

    // Additional Information
    additionalRequirements: false,
    specialAssistance: false,
    specialAssistanceDetails: "",

    // Personal Information (pre-filled from user profile but can be edited)
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",

    // Confirmation
    agreeToTerms: false,
  });

  useEffect(() => {
    // Get user data from local storage
    const userString = localStorage.getItem("citizenUser");

    if (userString) {
      try {
        const userData = JSON.parse(userString);

        setFormData((prev) => ({
          ...prev,
          fullName: `${userData.firstName || ""} ${
            userData.lastName || ""
          }`.trim(),
          email: userData.email || "",
          phone: userData.phoneNumber || "",
          passportNumber: userData.passportNumber || "",
        }));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle step navigation
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the form data to your backend API
    console.log("Appointment scheduled:", formData);

    // Move to the success step
    nextStep();
  };

  // Function to get available time slots based on selected date
  // In a real app, this would fetch from the API based on date and service
  const getAvailableTimeSlots = () => {
    return [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
    ];
  };

  // Get current step progress percentage
  const getProgressPercentage = () => {
    const totalSteps = 5;
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };

  // Get service name by ID
  const getServiceNameById = (id: string) => {
    const service = availableServices.find((service) => service.id === id);
    return service ? service.name : "";
  };

  // Get location name by ID
  const getLocationNameById = (id: string) => {
    const location = availableLocations.find((location) => location.id === id);
    return location ? location.name : "";
  };

  // Get location address by ID
  const getLocationAddressById = (id: string) => {
    const location = availableLocations.find((location) => location.id === id);
    return location ? location.address : "";
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                {currentStep === 5 ? "Completed" : `Step ${currentStep} of 4`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary-600">
                {getProgressPercentage()}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
            <div
              style={{ width: `${getProgressPercentage()}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step ? <FaCheck /> : step}
              </div>
              <div className="text-xs mt-1 text-gray-500">
                {step === 1 && "Service"}
                {step === 2 && "Date & Time"}
                {step === 3 && "Details"}
                {step === 4 && "Confirmation"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Selection - Step 1 */}
      {currentStep === 1 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Select a Service</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {availableServices.map((service) => (
              <label
                key={service.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  formData.serviceType === service.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="serviceType"
                    value={service.id}
                    checked={formData.serviceType === service.id}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-primary-600 mt-0.5"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{service.name}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceDetails"
            >
              Additional Service Details (optional)
            </label>
            <textarea
              id="serviceDetails"
              name="serviceDetails"
              value={formData.serviceDetails}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Please provide any additional details about your service needs..."
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={nextStep}
              disabled={!formData.serviceType}
              className="btn-primary flex items-center"
            >
              Next: Choose Date & Time <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Date and Time Selection - Step 2 */}
      {currentStep === 2 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            Select Date and Time
            <span className="block text-sm font-normal text-gray-600 mt-1">
              For {getServiceNameById(formData.serviceType)}
            </span>
          </h2>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="appointmentDate"
            >
              <FaCalendarAlt className="inline mr-2" /> Preferred Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setMonth(new Date().getMonth() + 3))
                  .toISOString()
                  .split("T")[0]
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Appointments available up to 3 months in advance
            </p>
          </div>

          {formData.appointmentDate && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FaClock className="inline mr-2" /> Available Time Slots
              </label>
              <div className="grid grid-cols-3 gap-3">
                {getAvailableTimeSlots().map((timeSlot) => (
                  <label
                    key={timeSlot}
                    className={`border rounded-lg p-3 cursor-pointer text-center text-sm transition-all hover:shadow-sm ${
                      formData.appointmentTime === timeSlot
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="appointmentTime"
                      value={timeSlot}
                      checked={formData.appointmentTime === timeSlot}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    {timeSlot}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="btn-outline-primary flex items-center"
            >
              <FaChevronLeft className="mr-2" /> Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.appointmentDate || !formData.appointmentTime}
              className="btn-primary flex items-center"
            >
              Next: Additional Details <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Location and Additional Details - Step 3 */}
      {currentStep === 3 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            Additional Details
            <span className="block text-sm font-normal text-gray-600 mt-1">
              For your appointment on {formatDate(formData.appointmentDate)} at{" "}
              {formData.appointmentTime}
            </span>
          </h2>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              <FaMapMarkerAlt className="inline mr-2" /> Embassy Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableLocations.map((location) => (
                <label
                  key={location.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    formData.location === location.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="location"
                      value={location.id}
                      checked={formData.location === location.id}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-primary-600 mt-0.5"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-500">
                        {location.address}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="additionalRequirements"
                name="additionalRequirements"
                checked={formData.additionalRequirements}
                onChange={handleInputChange}
                className="h-5 w-5 text-primary-600"
              />
              <label
                className="ml-3 text-gray-700"
                htmlFor="additionalRequirements"
              >
                I have reviewed the additional requirements for this service
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="specialAssistance"
                name="specialAssistance"
                checked={formData.specialAssistance}
                onChange={handleInputChange}
                className="h-5 w-5 text-primary-600 mt-1"
              />
              <div className="ml-3">
                <label className="text-gray-700" htmlFor="specialAssistance">
                  I require special assistance
                </label>
                {formData.specialAssistance && (
                  <textarea
                    name="specialAssistanceDetails"
                    value={formData.specialAssistanceDetails}
                    onChange={handleInputChange}
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={2}
                    placeholder="Please specify any special assistance needs..."
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="btn-outline-primary flex items-center"
            >
              <FaChevronLeft className="mr-2" /> Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.location}
              className="btn-primary flex items-center"
            >
              Next: Confirm Details <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Review and Confirm - Step 4 */}
      {currentStep === 4 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            Confirm Your Appointment
          </h2>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-4">Appointment Summary</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">
                    {getServiceNameById(formData.serviceType)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {formatDate(formData.appointmentDate)},{" "}
                    {formData.appointmentTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {getLocationNameById(formData.location)}
                  </p>
                  <p className="text-sm">
                    {getLocationAddressById(formData.location)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Passport Number</p>
                  <p className="font-medium">{formData.passportNumber}</p>
                </div>
              </div>
            </div>

            {formData.serviceDetails && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Additional Service Details
                </p>
                <p className="text-sm">{formData.serviceDetails}</p>
              </div>
            )}

            {formData.specialAssistance && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Special Assistance</p>
                <p className="text-sm">
                  {formData.specialAssistanceDetails || "Required"}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
            <div className="flex">
              <FaInfoCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium">Important Notes</h4>
                <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                  <li>
                    Please arrive 15 minutes before your appointment time.
                  </li>
                  <li>Bring all necessary documents and a valid ID.</li>
                  <li>
                    If you need to cancel or reschedule, please do so at least
                    24 hours in advance.
                  </li>
                  <li>
                    Appointments that are missed without prior notice may incur
                    a penalty.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-5 w-5 text-primary-600 mt-1"
                required
              />
              <label
                className="ml-3 text-sm text-gray-700"
                htmlFor="agreeToTerms"
              >
                I confirm that the information provided is accurate and I agree
                to the embassy's appointment terms and policies. I understand
                that providing false information may result in my appointment
                being canceled.
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="btn-outline-primary flex items-center"
            >
              <FaChevronLeft className="mr-2" /> Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms}
              className="btn-primary flex items-center"
            >
              Schedule Appointment <FaCalendarAlt className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Success Message - Step 5 */}
      {currentStep === 5 && (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
            <FaCheck className="h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            Appointment Scheduled!
          </h2>
          <p className="text-gray-600 mt-2">
            Your appointment has been successfully scheduled for{" "}
            <span className="font-medium">
              {formatDate(formData.appointmentDate)}
            </span>{" "}
            at <span className="font-medium">{formData.appointmentTime}</span>.
          </p>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg text-left">
            <h3 className="font-medium mb-2">Appointment Details</h3>
            <p className="text-sm mb-1">
              <span className="font-medium">Confirmation Number:</span> APT-
              {Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Service:</span>{" "}
              {getServiceNameById(formData.serviceType)}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Location:</span>{" "}
              {getLocationNameById(formData.location)}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            A confirmation email has been sent to {formData.email} with all the
            details of your appointment.
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigate("/citizen/appointments")}
              className="btn-outline-primary"
            >
              View All Appointments
            </button>
            <button
              onClick={() => navigate("/citizen/dashboard")}
              className="btn-primary"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduling;
