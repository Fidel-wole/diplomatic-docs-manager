/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitizenLayout from "../../../components/citizen/layout/CitizenLayout";
import {
  FaIdCard,
  FaArrowRight,
  FaInfoCircle,
  FaUpload,
  FaCreditCard,
  FaCheck,
} from "react-icons/fa";
import Card from "../../../components/ui/Card";

// Define the application steps
const applicationSteps = [
  { id: "personal", name: "Personal Information", icon: <FaIdCard /> },
  { id: "upload", name: "Document Upload", icon: <FaUpload /> },
  { id: "review", name: "Review", icon: <FaInfoCircle /> },
  { id: "payment", name: "Payment", icon: <FaCreditCard /> },
  { id: "confirmation", name: "Confirmation", icon: <FaCheck /> },
];

// Main component
const ETCApplication = () => {
  const [currentStep, setCurrentStep] = useState("personal");
  const [applicationData, setApplicationData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
      destinationCountry: "",
      departureDate: "",
    },
    documents: {
      identification: null,
      passportPhoto: null,
      supportingDocuments: null,
    },
    agreeToTerms: false,
    paymentMethod: "",
  });

  const navigate = useNavigate();

  // Get the current step index
  const currentStepIndex = applicationSteps.findIndex(
    (step) => step.id === currentStep
  );

  // Function to update form data
  const updateFormData = (section: string, field: string, value: any) => {
    setApplicationData((prevData) => ({
      ...prevData,
      [section]: {
        ...(prevData[section as keyof typeof prevData] as Record<string, any>),
        [field]: value,
      },
    }));
  };

  // Function to handle file uploads
  const handleFileUpload = (field: string, file: File | null) => {
    setApplicationData((prevData) => ({
      ...prevData,
      documents: {
        ...prevData.documents,
        [field]: file,
      },
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Move to the next step
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < applicationSteps.length) {
      setCurrentStep(applicationSteps[nextStepIndex].id);
    }
  };

  // Function to handle final submission
  const handleFinalSubmit = () => {
    // In a real application, you would send the data to your API here
    console.log("Final submission data:", applicationData);

    // Simulate API call
    setTimeout(() => {
      navigate("/citizen/applications/etc-success", {
        state: {
          applicationId: "ETC-" + Math.floor(100000 + Math.random() * 900000),
        },
      });
    }, 1500);
  };

  return (
    <CitizenLayout title="Emergency Travel Certificate Application">
      {/* Application Steps */}
      <div className="mb-8">
        <nav>
          <ol className="flex items-center">
            {applicationSteps.map((step, stepIdx) => (
              <li
                key={step.id}
                className={
                  stepIdx === applicationSteps.length - 1 ? "flex-1" : "flex-1"
                }
              >
                {stepIdx < currentStepIndex ? (
                  // Completed step
                  <div className="group">
                    <span className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-600 text-white">
                        <FaCheck className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-primary-600">
                        {step.name}
                      </span>
                    </span>
                  </div>
                ) : stepIdx === currentStepIndex ? (
                  // Current step
                  <div className="flex items-center" aria-current="step">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-primary-600">
                      {step.icon}
                    </span>
                    <span className="ml-3 text-sm font-medium text-primary-600">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  // Future step
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300">
                      {step.icon}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                  </div>
                )}

                {stepIdx !== applicationSteps.length - 1 && (
                  <div className="hidden sm:block w-full h-0.5 bg-gray-200 mx-2">
                    <div
                      className={`h-0.5 ${
                        stepIdx < currentStepIndex
                          ? "bg-primary-600"
                          : "bg-gray-200"
                      }`}
                      style={{
                        width: stepIdx < currentStepIndex ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Application Form */}
      <Card className="mb-6">
        {/* Personal Information Step */}
        {currentStep === "personal" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={applicationData.personalInfo.firstName}
                    onChange={(e) =>
                      updateFormData(
                        "personalInfo",
                        "firstName",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={applicationData.personalInfo.lastName}
                    onChange={(e) =>
                      updateFormData("personalInfo", "lastName", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={applicationData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      updateFormData(
                        "personalInfo",
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nationality
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    value={applicationData.personalInfo.nationality}
                    onChange={(e) =>
                      updateFormData(
                        "personalInfo",
                        "nationality",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="passportNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passport Number (if available)
                  </label>
                  <input
                    type="text"
                    id="passportNumber"
                    value={applicationData.personalInfo.passportNumber}
                    onChange={(e) =>
                      updateFormData(
                        "personalInfo",
                        "passportNumber",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={applicationData.personalInfo.email}
                    onChange={(e) =>
                      updateFormData("personalInfo", "email", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={applicationData.personalInfo.phone}
                    onChange={(e) =>
                      updateFormData("personalInfo", "phone", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={applicationData.personalInfo.address}
                  onChange={(e) =>
                    updateFormData("personalInfo", "address", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="destinationCountry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destination Country
                </label>
                <input
                  type="text"
                  id="destinationCountry"
                  value={applicationData.personalInfo.destinationCountry}
                  onChange={(e) =>
                    updateFormData(
                      "personalInfo",
                      "destinationCountry",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="departureDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expected Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  value={applicationData.personalInfo.departureDate}
                  onChange={(e) =>
                    updateFormData(
                      "personalInfo",
                      "departureDate",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason for Emergency Travel Certificate
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  value={applicationData.personalInfo.reason}
                  onChange={(e) =>
                    updateFormData("personalInfo", "reason", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next: Document Upload <FaArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Document Upload Step */}
        {currentStep === "upload" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Document Upload</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please upload clear, high-quality scans or photos of the
                    required documents. Accepted formats: JPG, PNG, or PDF.
                    Maximum file size: 5MB per document.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Identification Document (Passport, National ID, or Driver's
                  License)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="identification"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="identification"
                          name="identification"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileUpload(
                              "identification",
                              e.target.files?.[0] || null
                            )
                          }
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recent Passport-sized Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="passportPhoto"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="passportPhoto"
                          name="passportPhoto"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileUpload(
                              "passportPhoto",
                              e.target.files?.[0] || null
                            )
                          }
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supporting Documents (Travel Itinerary, Medical Documentation,
                  etc.)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="supportingDocuments"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="supportingDocuments"
                          name="supportingDocuments"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileUpload(
                              "supportingDocuments",
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep("personal")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next: Review <FaArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Review Step */}
        {currentStep === "review" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Review Your Application
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Please review all the information carefully before
                    proceeding to payment.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 border-b border-gray-200 pb-2 mb-3">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Full Name
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.firstName}{" "}
                      {applicationData.personalInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Nationality
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.nationality}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Passport Number
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.passportNumber ||
                        "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Email Address
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Phone Number
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.phone}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Current Address
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Destination Country
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.destinationCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Expected Departure Date
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.departureDate}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Reason for Emergency Travel Certificate
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {applicationData.personalInfo.reason}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-900 border-b border-gray-200 pb-2 mb-3">
                  Uploaded Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Identification Document
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      <FaCheck className="inline-block mr-1" /> Uploaded
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Passport Photo
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      <FaCheck className="inline-block mr-1" /> Uploaded
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Supporting Documents
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                      {applicationData.documents.supportingDocuments ? (
                        <>
                          <FaCheck className="inline-block mr-1" /> Uploaded
                        </>
                      ) : (
                        <span className="text-gray-500">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={applicationData.agreeToTerms}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        agreeToTerms: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I confirm that all the information provided is accurate and
                    true to the best of my knowledge. I understand that
                    providing false information may result in the rejection of
                    my application and potential legal consequences.
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep("upload")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!applicationData.agreeToTerms}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    applicationData.agreeToTerms
                      ? "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Next: Payment <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  Application Fee
                </h3>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <p>Emergency Travel Certificate Fee</p>
                  <p className="font-semibold">$50.00</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <p>Processing Fee</p>
                  <p className="font-semibold">$5.00</p>
                </div>
                <div className="flex justify-between items-center pt-2 text-lg font-bold">
                  <p>Total</p>
                  <p>$55.00</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Select Payment Method
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={applicationData.paymentMethod === "creditCard"}
                      onChange={() =>
                        setApplicationData({
                          ...applicationData,
                          paymentMethod: "creditCard",
                        })
                      }
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 block text-sm text-gray-900">
                      Credit or Debit Card
                    </span>
                  </label>

                  {applicationData.paymentMethod === "creditCard" && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md">
                      <div className="mb-4">
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="expiryDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            placeholder="123"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="cardholderName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardholderName"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={applicationData.paymentMethod === "paypal"}
                      onChange={() =>
                        setApplicationData({
                          ...applicationData,
                          paymentMethod: "paypal",
                        })
                      }
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 block text-sm text-gray-900">
                      PayPal
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={applicationData.paymentMethod === "bankTransfer"}
                      onChange={() =>
                        setApplicationData({
                          ...applicationData,
                          paymentMethod: "bankTransfer",
                        })
                      }
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 block text-sm text-gray-900">
                      Bank Transfer
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep("review")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!applicationData.paymentMethod}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    applicationData.paymentMethod
                      ? "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Help box */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Need help with your application?
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                If you have any questions or need assistance, please contact our
                support team at{" "}
                <a
                  href="mailto:support@embassy.com"
                  className="font-semibold underline"
                >
                  support@embassy.com
                </a>{" "}
                or call{" "}
                <a href="tel:+1234567890" className="font-semibold">
                  +1 (234) 567-890
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default ETCApplication;
