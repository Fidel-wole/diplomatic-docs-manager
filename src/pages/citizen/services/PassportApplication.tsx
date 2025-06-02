// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FaCheck, 
//   FaUpload, 
//   FaChevronLeft,
//   FaChevronRight,
//   FaExclamationTriangle
// } from 'react-icons/fa';

// // Multi-step form for passport application
// const PassportApplication = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
//   const [formData, setFormData] = useState({
//     // Personal Information
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     dateOfBirth: '',
//     placeOfBirth: '',
//     gender: '',
//     nationality: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     phoneNumber: '',
//     email: '',
    
//     // Passport Information
//     passportType: 'regular', // regular, diplomatic, official, etc.
//     applicationReason: 'new', // new, renewal, replacement, etc.
//     previousPassportNumber: '',
//     previousPassportIssueDate: '',
//     previousPassportExpiryDate: '',
    
//     // Documents
//     photoId: null as File | null,
//     birthCertificate: null as File | null,
//     proofOfResidence: null as File | null,
//     previousPassport: null as File | null,
    
//     // Payment
//     paymentMethod: '',
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
    
//     // Terms
//     agreeToTerms: false,
//     declarationTrue: false,
//   });

//   // Validation rules
//   const validateField = (name: string, value: any): string => {
//     switch (name) {
//       case 'firstName':
//       case 'lastName':
//         return value.trim() === '' ? 'This field is required' : '';
        
//       case 'email':
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (value.trim() === '') return 'Email is required';
//         if (!emailRegex.test(value)) return 'Please enter a valid email address';
//         return '';
        
//       case 'phoneNumber':
//         const phoneRegex = /^\+?[0-9\s\-()]{8,}$/;
//         if (value.trim() === '') return 'Phone number is required';
//         if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
//         return '';
        
//       case 'dateOfBirth':
//         if (value === '') return 'Date of birth is required';
//         const dob = new Date(value);
//         const today = new Date();
//         const age = today.getFullYear() - dob.getFullYear();
//         if (age < 0) return 'Invalid date of birth';
//         if (age < 18) return 'Applicant must be at least 18 years old';
//         if (age > 120) return 'Invalid date of birth';
//         return '';
        
//       case 'gender':
//       case 'nationality':
//       case 'address':
//       case 'city':
//       case 'country':
//         return value.trim() === '' ? 'This field is required' : '';
        
//       case 'zipCode':
//         const zipRegex = /^[0-9a-zA-Z\s\-]{3,10}$/;
//         if (value.trim() === '') return 'Zip/Postal code is required';
//         if (!zipRegex.test(value)) return 'Please enter a valid zip/postal code';
//         return '';
        
//       case 'passportType':
//       case 'applicationReason':
//         return value === '' ? 'This selection is required' : '';
        
//       case 'previousPassportNumber':
//         if (formData.applicationReason === 'renewal' || formData.applicationReason === 'replacement') {
//           return value.trim() === '' ? 'Previous passport number is required' : '';
//         }
//         return '';
        
//       case 'photoId':
//       case 'birthCertificate':
//       case 'proofOfResidence':
//         return value === null ? 'This document is required' : '';
        
//       case 'previousPassport':
//         if (formData.applicationReason === 'renewal' || formData.applicationReason === 'replacement') {
//           return value === null ? 'Previous passport document is required' : '';
//         }
//         return '';
        
//       case 'paymentMethod':
//         return value === '' ? 'Please select a payment method' : '';
        
//       case 'cardNumber':
//         const cardNumberRegex = /^[0-9]{15,16}$/;
//         if (formData.paymentMethod === 'credit-card') {
//           if (value.trim() === '') return 'Card number is required';
//           if (!cardNumberRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid card number';
//         }
//         return '';
        
//       case 'cardName':
//         if (formData.paymentMethod === 'credit-card') {
//           return value.trim() === '' ? 'Name on card is required' : '';
//         }
//         return '';
        
//       case 'expiryDate':
//         const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
//         if (formData.paymentMethod === 'credit-card') {
//           if (value.trim() === '') return 'Expiry date is required';
//           if (!expiryRegex.test(value)) return 'Please use MM/YY format';
          
//           // Check if card is expired
//           const [month, year] = value.split('/');
//           const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
//           if (expiryDate < new Date()) return 'Card has expired';
//         }
//         return '';
        
//       case 'cvv':
//         const cvvRegex = /^[0-9]{3,4}$/;
//         if (formData.paymentMethod === 'credit-card') {
//           if (value.trim() === '') return 'CVV is required';
//           if (!cvvRegex.test(value)) return 'Please enter a valid CVV';
//         }
//         return '';
        
//       case 'agreeToTerms':
//       case 'declarationTrue':
//         return value === false ? 'You must agree to proceed' : '';
        
//       default:
//         return '';
//     }
//   };
  
//   // Validate entire step
//   const validateStep = (step: number): boolean => {
//     let newErrors: Record<string, string> = {};
//     let isValid = true;
    
//     switch (step) {
//       case 1:
//         // Personal information validation
//         const personalFields = [
//           'firstName', 'lastName', 'dateOfBirth', 'placeOfBirth', 'gender', 
//           'nationality', 'address', 'city', 'state', 'zipCode', 'country', 
//           'phoneNumber', 'email'
//         ];
        
//         personalFields.forEach(field => {
//           const error = validateField(field, formData[field as keyof typeof formData]);
//           if (error) {
//             newErrors[field] = error;
//             isValid = false;
//           }
//         });
//         break;
        
//       case 2:
//         // Passport information validation
//         const passportFields = [
//           'passportType', 'applicationReason'
//         ];
        
//         if (formData.applicationReason === 'renewal' || formData.applicationReason === 'replacement') {
//           passportFields.push('previousPassportNumber', 'previousPassportIssueDate', 'previousPassportExpiryDate');
//         }
        
//         passportFields.forEach(field => {
//           const error = validateField(field, formData[field as keyof typeof formData]);
//           if (error) {
//             newErrors[field] = error;
//             isValid = false;
//           }
//         });
//         break;
        
//       case 3:
//         // Document validation
//         const documentFields = ['photoId', 'birthCertificate', 'proofOfResidence'];
        
//         if (formData.applicationReason === 'renewal' || formData.applicationReason === 'replacement') {
//           documentFields.push('previousPassport');
//         }
        
//         documentFields.forEach(field => {
//           const error = validateField(field, formData[field as keyof typeof formData]);
//           if (error) {
//             newErrors[field] = error;
//             isValid = false;
//           }
//         });
//         break;
        
//       case 4:
//         // Payment validation
//         const paymentFields = ['paymentMethod'];
        
//         if (formData.paymentMethod === 'credit-card') {
//           paymentFields.push('cardNumber', 'cardName', 'expiryDate', 'cvv');
//         }
        
//         paymentFields.forEach(field => {
//           const error = validateField(field, formData[field as keyof typeof formData]);
//           if (error) {
//             newErrors[field] = error;
//             isValid = false;
//           }
//         });
//         break;
        
//       case 5:
//         // Terms validation
//         ['agreeToTerms', 'declarationTrue'].forEach(field => {
//           const error = validateField(field, formData[field as keyof typeof formData]);
//           if (error) {
//             newErrors[field] = error;
//             isValid = false;
//           }
//         });
//         break;
//     }
    
//     setFormErrors(newErrors);
//     return isValid;
//   };

//   // Handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target as HTMLInputElement;
//     const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
//     setTouchedFields({
//       ...touchedFields,
//       [name]: true,
//     });
    
//     const newFormData = {
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     };
    
//     setFormData(newFormData);
    
//     // Validate field on change
//     const fieldError = validateField(name, type === 'checkbox' ? checked : value);
//     setFormErrors({
//       ...formErrors,
//       [name]: fieldError
//     });
//   };

//   // Handle file uploads
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
    
//     setTouchedFields({
//       ...touchedFields,
//       [name]: true,
//     });
    
//     if (files && files.length > 0) {
//       setFormData({
//         ...formData,
//         [name]: files[0]
//       });
      
//       // Clear error for this field
//       setFormErrors({
//         ...formErrors,
//         [name]: ''
//       });
//     }
//   };

//   // Handle step navigation
//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(currentStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//     window.scrollTo(0, 0);
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (validateStep(currentStep)) {
//       // Here you would typically send the form data to your backend API
//       console.log('Form submitted:', formData);
      
//       // Move to the success step
//       nextStep();
//     }
//   };

//   // Get current step progress percentage
//   const getProgressPercentage = () => {
//     return ((currentStep - 1) / 4) * 100;
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Progress Bar */}
//       <div className="mb-8">
//         <div className="relative pt-1">
//           <div className="flex mb-2 items-center justify-between">
//             <div>
//               <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
//                 Step {currentStep} of 5
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="text-xs font-semibold inline-block text-primary-600">
//                 {getProgressPercentage()}%
//               </span>
//             </div>
//           </div>
//           <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
//             <div
//               style={{ width: `${getProgressPercentage()}%` }}
//               className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
//             ></div>
//           </div>
//         </div>
        
//         {/* Step Indicator */}
//         <div className="flex justify-between">
//           <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
//             <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
//               currentStep > 1 ? 'bg-primary-500 border-primary-500 text-white' : 
//               currentStep === 1 ? 'border-primary-500 text-primary-600' : 
//               'border-gray-300'
//             }`}>
//               {currentStep > 1 ? <FaCheck className="h-4 w-4" /> : '1'}
//             </div>
//             <span className="text-xs mt-1">Personal Info</span>
//           </div>
          
//           <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
//             <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
//               currentStep > 2 ? 'bg-primary-500 border-primary-500 text-white' : 
//               currentStep === 2 ? 'border-primary-500 text-primary-600' : 
//               'border-gray-300'
//             }`}>
//               {currentStep > 2 ? <FaCheck className="h-4 w-4" /> : '2'}
//             </div>
//             <span className="text-xs mt-1">Passport Details</span>
//           </div>
          
//           <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
//             <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
//               currentStep > 3 ? 'bg-primary-500 border-primary-500 text-white' : 
//               currentStep === 3 ? 'border-primary-500 text-primary-600' : 
//               'border-gray-300'
//             }`}>
//               {currentStep > 3 ? <FaCheck className="h-4 w-4" /> : '3'}
//             </div>
//             <span className="text-xs mt-1">Documents</span>
//           </div>
          
//           <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-primary-600' : 'text-gray-400'}`}>
//             <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
//               currentStep > 4 ? 'bg-primary-500 border-primary-500 text-white' : 
//               currentStep === 4 ? 'border-primary-500 text-primary-600' : 
//               'border-gray-300'
//             }`}>
//               {currentStep > 4 ? <FaCheck className="h-4 w-4" /> : '4'}
//             </div>
//             <span className="text-xs mt-1">Payment</span>
//           </div>
          
//           <div className={`flex flex-col items-center ${currentStep >= 5 ? 'text-primary-600' : 'text-gray-400'}`}>
//             <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
//               currentStep === 5 ? 'bg-primary-500 border-primary-500 text-white' : 
//               'border-gray-300'
//             }`}>
//               {currentStep === 5 ? <FaCheck className="h-4 w-4" /> : '5'}
//             </div>
//             <span className="text-xs mt-1">Confirmation</span>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* Step 1: Personal Information */}
//         {currentStep === 1 && (
//           <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
//             <p className="text-gray-600 mb-6">Please provide your personal details as they appear on your official documents.</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.firstName && touchedFields.firstName && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.firstName}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
//                 <input
//                   type="text"
//                   name="middleName"
//                   value={formData.middleName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.lastName && touchedFields.lastName && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.lastName}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.dateOfBirth && touchedFields.dateOfBirth && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.dateOfBirth}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth *</label>
//                 <input
//                   type="text"
//                   name="placeOfBirth"
//                   value={formData.placeOfBirth}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.placeOfBirth && touchedFields.placeOfBirth && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.placeOfBirth}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                   <option value="prefer_not_to_say">Prefer not to say</option>
//                 </select>
//                 {formErrors.gender && touchedFields.gender && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.gender}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
//                 <input
//                   type="text"
//                   name="nationality"
//                   value={formData.nationality}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.nationality && touchedFields.nationality && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.nationality}
//                   </p>
//                 )}
//               </div>
//             </div>
            
//             <h3 className="text-lg font-medium mt-6 mb-3 text-gray-800">Contact Information</h3>
            
//             <div className="grid grid-cols-1 gap-4">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//                 {formErrors.address && touchedFields.address && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.address}
//                   </p>
//                 )}
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.city && touchedFields.city && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.city}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.state && touchedFields.state && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.state}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code *</label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.zipCode && touchedFields.zipCode && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.zipCode}
//                     </p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.country && touchedFields.country && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.country}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.phoneNumber && touchedFields.phoneNumber && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.phoneNumber}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 flex justify-end">
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
//               >
//                 Continue <FaChevronRight className="ml-2" />
//               </button>
//             </div>
//           </form>
//         )}
        
//         {/* Step 2: Passport Information */}
//         {currentStep === 2 && (
//           <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Passport Information</h2>
//             <p className="text-gray-600 mb-6">Please provide details about the passport you're applying for.</p>
            
//             <div className="grid grid-cols-1 gap-4">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Passport Type *</label>
//                 <select
//                   name="passportType"
//                   value={formData.passportType}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 >
//                   <option value="regular">Regular Passport</option>
//                   <option value="diplomatic">Diplomatic Passport</option>
//                   <option value="official">Official/Service Passport</option>
//                   <option value="emergency">Emergency Passport</option>
//                 </select>
//                 {formErrors.passportType && touchedFields.passportType && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.passportType}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Application Reason *</label>
//                 <select
//                   name="applicationReason"
//                   value={formData.applicationReason}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 >
//                   <option value="new">New Passport</option>
//                   <option value="renewal">Renewal</option>
//                   <option value="replacement">Replacement (Lost/Damaged)</option>
//                   <option value="pages">Additional Pages</option>
//                   <option value="name_change">Name Change</option>
//                 </select>
//                 {formErrors.applicationReason && touchedFields.applicationReason && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.applicationReason}
//                   </p>
//                 )}
//               </div>
//             </div>
            
//             {formData.applicationReason !== 'new' && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium mb-3 text-gray-800">Previous Passport Information</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="form-group">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Previous Passport Number</label>
//                     <input
//                       type="text"
//                       name="previousPassportNumber"
//                       value={formData.previousPassportNumber}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required={formData.applicationReason !== 'new'}
//                     />
//                     {formErrors.previousPassportNumber && touchedFields.previousPassportNumber && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                         {formErrors.previousPassportNumber}
//                       </p>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
//                     <input
//                       type="date"
//                       name="previousPassportIssueDate"
//                       value={formData.previousPassportIssueDate}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required={formData.applicationReason !== 'new'}
//                     />
//                     {formErrors.previousPassportIssueDate && touchedFields.previousPassportIssueDate && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                         {formErrors.previousPassportIssueDate}
//                       </p>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
//                     <input
//                       type="date"
//                       name="previousPassportExpiryDate"
//                       value={formData.previousPassportExpiryDate}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required={formData.applicationReason !== 'new'}
//                     />
//                     {formErrors.previousPassportExpiryDate && touchedFields.previousPassportExpiryDate && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                         {formErrors.previousPassportExpiryDate}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             <div className="mt-8 flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
//               >
//                 <FaChevronLeft className="mr-2" /> Previous
//               </button>
              
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
//               >
//                 Continue <FaChevronRight className="ml-2" />
//               </button>
//             </div>
//           </form>
//         )}
        
//         {/* Step 3: Document Upload */}
//         {currentStep === 3 && (
//           <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Document Upload</h2>
//             <p className="text-gray-600 mb-6">Please upload the required documents. Files should be in JPG, PNG, or PDF format and not exceed 5MB each.</p>
            
//             <div className="grid grid-cols-1 gap-6">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Passport Photo (Recent, 2x2 inches) *</label>
//                 <div className="mt-1 flex items-center">
//                   <div className="flex-grow p-2 border border-gray-300 rounded-md">
//                     {formData.photoId ? (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           {formData.photoId.name} ({Math.round(formData.photoId.size / 1024)} KB)
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => setFormData({...formData, photoId: null})}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <FaUpload className="text-gray-400 mr-2" />
//                         <span className="text-sm text-gray-500">No file selected</span>
//                       </div>
//                     )}
//                   </div>
//                   <label htmlFor="photoId" className="ml-3 cursor-pointer">
//                     <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
//                     <input
//                       id="photoId"
//                       name="photoId"
//                       type="file"
//                       className="sr-only"
//                       accept="image/jpeg,image/png,application/pdf"
//                       onChange={handleFileChange}
//                       required={!formData.photoId}
//                     />
//                   </label>
//                 </div>
//                 {formErrors.photoId && touchedFields.photoId && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.photoId}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Birth Certificate or National ID *</label>
//                 <div className="mt-1 flex items-center">
//                   <div className="flex-grow p-2 border border-gray-300 rounded-md">
//                     {formData.birthCertificate ? (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           {formData.birthCertificate.name} ({Math.round(formData.birthCertificate.size / 1024)} KB)
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => setFormData({...formData, birthCertificate: null})}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <FaUpload className="text-gray-400 mr-2" />
//                         <span className="text-sm text-gray-500">No file selected</span>
//                       </div>
//                     )}
//                   </div>
//                   <label htmlFor="birthCertificate" className="ml-3 cursor-pointer">
//                     <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
//                     <input
//                       id="birthCertificate"
//                       name="birthCertificate"
//                       type="file"
//                       className="sr-only"
//                       accept="image/jpeg,image/png,application/pdf"
//                       onChange={handleFileChange}
//                       required={!formData.birthCertificate}
//                     />
//                   </label>
//                 </div>
//                 {formErrors.birthCertificate && touchedFields.birthCertificate && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.birthCertificate}
//                   </p>
//                 )}
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Proof of Residence *</label>
//                 <div className="mt-1 flex items-center">
//                   <div className="flex-grow p-2 border border-gray-300 rounded-md">
//                     {formData.proofOfResidence ? (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           {formData.proofOfResidence.name} ({Math.round(formData.proofOfResidence.size / 1024)} KB)
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => setFormData({...formData, proofOfResidence: null})}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <FaUpload className="text-gray-400 mr-2" />
//                         <span className="text-sm text-gray-500">No file selected</span>
//                       </div>
//                     )}
//                   </div>
//                   <label htmlFor="proofOfResidence" className="ml-3 cursor-pointer">
//                     <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
//                     <input
//                       id="proofOfResidence"
//                       name="proofOfResidence"
//                       type="file"
//                       className="sr-only"
//                       accept="image/jpeg,image/png,application/pdf"
//                       onChange={handleFileChange}
//                       required={!formData.proofOfResidence}
//                     />
//                   </label>
//                 </div>
//                 {formErrors.proofOfResidence && touchedFields.proofOfResidence && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                     {formErrors.proofOfResidence}
//                   </p>
//                 )}
//               </div>
              
//               {formData.applicationReason !== 'new' && (
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Previous Passport (First and Last Pages) *
//                   </label>
//                   <div className="mt-1 flex items-center">
//                     <div className="flex-grow p-2 border border-gray-300 rounded-md">
//                       {formData.previousPassport ? (
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-gray-500">
//                             {formData.previousPassport.name} ({Math.round(formData.previousPassport.size / 1024)} KB)
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => setFormData({...formData, previousPassport: null})}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex items-center">
//                           <FaUpload className="text-gray-400 mr-2" />
//                           <span className="text-sm text-gray-500">No file selected</span>
//                         </div>
//                       )}
//                     </div>
//                     <label htmlFor="previousPassport" className="ml-3 cursor-pointer">
//                       <span className="px-3 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300">Browse</span>
//                       <input
//                         id="previousPassport"
//                         name="previousPassport"
//                         type="file"
//                         className="sr-only"
//                         accept="image/jpeg,image/png,application/pdf"
//                         onChange={handleFileChange}
//                         required={formData.applicationReason !== 'new' && !formData.previousPassport}
//                       />
//                     </label>
//                   </div>
//                   {formErrors.previousPassport && touchedFields.previousPassport && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.previousPassport}
//                     </p>
//                   )}
//                 </div>
//               )}
              
//             </div>
            
//             <div className="mt-8 flex justify-between">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
//               >
//                 <FaChevronLeft className="mr-2" /> Previous
//               </button>
              
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
//               >
//                 Continue <FaChevronRight className="ml-2" />
//               </button>
//             </div>
//           </form>
//         )}
        
//         {/* Step 4: Payment */}
//         {currentStep === 4 && (
//           <form onSubmit={handleSubmit}>
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment</h2>
//             <p className="text-gray-600 mb-6">Please provide your payment details to complete the application.</p>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-3 text-gray-800">Fee Summary</h3>
//               <div className="bg-gray-50 p-4 rounded-md">
//                 <div className="flex justify-between mb-2">
//                   <span>Application Processing Fee</span>
//                   <span>$120.00</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Administrative Fee</span>
//                   <span>$30.00</span>
//                 </div>
//                 <div className="border-t border-gray-300 my-2"></div>
//                 <div className="flex justify-between font-semibold">
//                   <span>Total</span>
//                   <span>$150.00</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-3 text-gray-800">Payment Method</h3>
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="flex items-center">
//                   <input
//                     id="credit-card"
//                     name="paymentMethod"
//                     type="radio"
//                     value="credit-card"
//                     checked={formData.paymentMethod === 'credit-card'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                     required
//                   />
//                   <label htmlFor="credit-card" className="ml-3">
//                     <span className="block text-sm font-medium text-gray-700">Credit Card</span>
//                   </label>
//                 </div>
                
//                 <div className="flex items-center">
//                   <input
//                     id="debit-card"
//                     name="paymentMethod"
//                     type="radio"
//                     value="debit-card"
//                     checked={formData.paymentMethod === 'debit-card'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                     required
//                   />
//                   <label htmlFor="debit-card" className="ml-3">
//                     <span className="block text-sm font-medium text-gray-700">Debit Card</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
            
//             {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     placeholder="XXXX XXXX XXXX XXXX"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.cardNumber && touchedFields.cardNumber && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.cardNumber}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={formData.cardName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                   {formErrors.cardName && touchedFields.cardName && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                       {formErrors.cardName}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="form-group">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date *</label>
//                     <input
//                       type="text"
//                       name="expiryDate"
//                       value={formData.expiryDate}
//                       onChange={handleInputChange}
//                       placeholder="MM/YY"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required
//                     />
//                     {formErrors.expiryDate && touchedFields.expiryDate && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                         {formErrors.expiryDate}
//                       </p>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
//                     <input
//                       type="text"
//                       name="cvv"
//                       value={formData.cvv}
//                       onChange={handleInputChange}
//                       placeholder="XXX"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                       required
//                     />
//                     {formErrors.cvv && touchedFields.cvv && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <FaExclamationTriangle className="mr-2 h-4 w-4" />
//                         {formErrors.cvv}
//                       </p>
//                     )}
//                   </div>
//                 </div>
           