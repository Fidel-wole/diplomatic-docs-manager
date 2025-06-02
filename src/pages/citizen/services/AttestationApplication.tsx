import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCheck, 
  FaUpload, 
  FaRegCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// Multi-step form for document attestation
const AttestationApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Applicant Information
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    
    // Document Information
    documentType: '', // e.g., birth certificate, marriage certificate, academic transcript
    documentPurpose: '', // e.g., study, employment, immigration
    documentCountry: '', // country where document will be used
    urgentProcessing: false,
    
    // Document Upload
    originalDocument: null as File | null,
    translations: null as File | null,
    identificationDocument: null as File | null,
    
    // Payment
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Declaration
    agreeToTerms: false,
    declarationTrue: false,
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
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
    console.log('Form submitted:', formData);
    
    // Move to the success step
    nextStep();
  };

  // Get current step progress percentage
  const getProgressPercentage = () => {
    return ((currentStep - 1) / 4) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                Step {currentStep} of 5
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
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
            ></div>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              currentStep > 1 ? 'bg-primary-500 border-primary-500 text-white' : 
              currentStep === 1 ? 'border-primary-500 text-primary-600' : 
              'border-gray-300'
            }`}>
              {currentStep > 1 ? <FaCheck className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-xs mt-1">Applicant Info</span>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              currentStep > 2 ? 'bg-primary-500 border-primary-500 text-white' : 
              currentStep === 2 ? 'border-primary-500 text-primary-600' : 
              'border-gray-300'
            }`}>
              {currentStep > 2 ? <FaCheck className="h-4 w-4" /> : '2'}
            </div>
            <span className="text-xs mt-1">Document Details</span>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              currentStep > 3 ? 'bg-primary-500 border-primary-500 text-white' : 
              currentStep === 3 ? 'border-primary-500 text-primary-600' : 
              'border-gray-300'
            }`}>
              {currentStep > 3 ? <FaCheck className="h-4 w-4" /> : '3'}
            </div>
            <span className="text-xs mt-1">Upload Files</span>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              currentStep > 4 ? 'bg-primary-500 border-primary-500 text-white' : 
              currentStep === 4 ? 'border-primary-500 text-primary-600' : 
              'border-gray-300'
            }`}>
              {currentStep > 4 ? <FaCheck className="h-4 w-4" /> : '4'}
            </div>
            <span className="text-xs mt-1">Payment</span>
          </div>
          
          <div className={`flex flex-col items-center ${currentStep >= 5 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              currentStep === 5 ? 'bg-primary-500 border-primary-500 text-white' : 
              'border-gray-300'
            }`}>
              {currentStep === 5 ? <FaCheck className="h-4 w-4" /> : '5'}
            </div>
            <span className="text-xs mt-1">Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Step 1: Applicant Information */}
        {currentStep === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Applicant Information</h2>
            <p className="text-gray-600 mb-6">
              Please provide your personal details. This information will be used for communication regarding your application.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                Continue <FaChevronRight className="ml-2" />
              </button>
            </div>
          </form>
        )}
        
        {/* Step 2: Document Information */}
        {currentStep === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Document Information</h2>
            <p className="text-gray-600 mb-6">
              Please provide details about the document you need attested and its purpose.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type *</label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select document type</option>
                  <option value="birthCertificate">Birth Certificate</option>
                  <option value="marriageCertificate">Marriage Certificate</option>
                  <option value="deathCertificate">Death Certificate</option>
                  <option value="divorceCertificate">Divorce Certificate</option>
                  <option value="academicCertificate">Academic Certificate/Transcript</option>
                  <option value="medicalReport">Medical Report</option>
                  <option value="policeReport">Police Clearance/Report</option>
                  <option value="powerOfAttorney">Power of Attorney</option>
                  <option value="commercialDocument">Commercial Document</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Attestation *</label>
                <select
                  name="documentPurpose"
                  value={formData.documentPurpose}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="education">Education/Study Abroad</option>
                  <option value="employment">Employment</option>
                  <option value="immigration">Immigration</option>
                  <option value="legalProceedings">Legal Proceedings</option>
                  <option value="familyReunification">Family Reunification</option>
                  <option value="business">Business/Commercial</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Country Where Document Will Be Used *</label>
                <input
                  type="text"
                  name="documentCountry"
                  value={formData.documentCountry}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="form-group mt-4">
                <div className="flex items-center">
                  <input
                    id="urgentProcessing"
                    name="urgentProcessing"
                    type="checkbox"
                    checked={formData.urgentProcessing}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="urgentProcessing" className="ml-3">
                    <span className="text-sm font-medium text-gray-700">
                      Urgent Processing (Additional fee applies)
                    </span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  Standard processing takes 5-7 business days. Urgent processing is completed within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                <FaChevronLeft className="mr-2" /> Previous
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                Continue <FaChevronRight className="ml-2" />
              </button>
            </div>
          </form>
        )}
        
        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Document Upload</h2>
            <p className="text-gray-600 mb-6">
              Please upload all required documents in PDF, JPG, or PNG format. Maximum file size is 5MB per document.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Document for Attestation *
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-grow p-2 border border-gray-300 rounded-md">
                    {formData.originalDocument ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formData.originalDocument.name} ({Math.round(formData.originalDocument.size / 1024)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, originalDocument: null})}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FaUpload className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">No file selected</span>
                      </div>
                    )}
                  </div>
                  <label htmlFor="originalDocument" className="ml-3 cursor-pointer">
                    <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
                    <input
                      id="originalDocument"
                      name="originalDocument"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required={!formData.originalDocument}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload the document that needs to be attested.
                </p>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certified Translations (if applicable)
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-grow p-2 border border-gray-300 rounded-md">
                    {formData.translations ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formData.translations.name} ({Math.round(formData.translations.size / 1024)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, translations: null})}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FaUpload className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">No file selected</span>
                      </div>
                    )}
                  </div>
                  <label htmlFor="translations" className="ml-3 cursor-pointer">
                    <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
                    <input
                      id="translations"
                      name="translations"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  If your document is not in English or the official language of the destination country, upload certified translations.
                </p>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identification Document *
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-grow p-2 border border-gray-300 rounded-md">
                    {formData.identificationDocument ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formData.identificationDocument.name} ({Math.round(formData.identificationDocument.size / 1024)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, identificationDocument: null})}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FaUpload className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">No file selected</span>
                      </div>
                    )}
                  </div>
                  <label htmlFor="identificationDocument" className="ml-3 cursor-pointer">
                    <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
                    <input
                      id="identificationDocument"
                      name="identificationDocument"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required={!formData.identificationDocument}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a valid passport, national ID card, or driver's license for identification.
                </p>
              </div>
              
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                <FaChevronLeft className="mr-2" /> Previous
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                Continue <FaChevronRight className="ml-2" />
              </button>
            </div>
          </form>
        )}
        
        {/* Step 4: Payment */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment</h2>
            <p className="text-gray-600 mb-6">Please provide your payment details to complete the application.</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Fee Summary</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Basic Attestation Fee</span>
                  <span>$50.00</span>
                </div>
                
                {formData.urgentProcessing && (
                  <div className="flex justify-between mb-2">
                    <span>Urgent Processing Fee</span>
                    <span>$30.00</span>
                  </div>
                )}
                
                <div className="flex justify-between mb-2">
                  <span>Administrative Fee</span>
                  <span>$15.00</span>
                </div>
                
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${formData.urgentProcessing ? '95.00' : '65.00'}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Payment Method</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    required
                  />
                  <label htmlFor="credit-card" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Credit Card</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="debit-card"
                    name="paymentMethod"
                    type="radio"
                    value="debit-card"
                    checked={formData.paymentMethod === 'debit-card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    required
                  />
                  <label htmlFor="debit-card" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">Debit Card</span>
                  </label>
                </div>
              </div>
            </div>
            
            {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
              <div className="grid grid-cols-1 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="XXX"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              
              <div className="flex items-center mt-3">
                <input
                  id="declarationTrue"
                  name="declarationTrue"
                  type="checkbox"
                  checked={formData.declarationTrue}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="declarationTrue" className="ml-3">
                  <span className="block text-sm font-medium text-gray-700">
                    I declare that the document submitted for attestation is genuine and contains true information.
                  </span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                <FaChevronLeft className="mr-2" /> Previous
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
              >
                Submit Application <FaChevronRight className="ml-2" />
              </button>
            </div>
          </form>
        )}
        
        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <FaRegCheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Application Submitted Successfully</h2>
            <p className="text-gray-600 mb-6">Thank you for submitting your document attestation application. Your application has been received and is being processed.</p>
            
            <div className="bg-gray-50 rounded-md p-6 mb-8 text-left">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Application Details</h3>
              
              <div className="mb-3">
                <p className="text-sm text-gray-500">Application ID</p>
                <p className="font-medium">{Math.random().toString(36).substring(2, 12).toUpperCase()}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-500">Submission Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-500">Estimated Processing Time</p>
                <p className="font-medium">
                  {formData.urgentProcessing ? '1-2 business days' : '5-7 business days'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Payment Amount</p>
                <p className="font-medium">${formData.urgentProcessing ? '95.00' : '65.00'}</p>
              </div>
            </div>
            
            <div className="mb-8 text-left">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Next Steps</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>You will receive an email confirmation of your application.</li>
                <li>Your document will be reviewed by embassy officials.</li>
                <li>You can track the status of your application in the "My Applications" section.</li>
                <li>You will be notified once your document has been attested and is ready for collection.</li>
              </ul>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/citizen/applications')}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View My Applications
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/citizen/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttestationApplication;
