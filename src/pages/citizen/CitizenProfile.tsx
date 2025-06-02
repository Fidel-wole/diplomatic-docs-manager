import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEdit, 
  FaPassport, 
  FaFileAlt, 
  FaIdCard, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe,
  FaDownload,
  FaClock,
  FaCheck
} from 'react-icons/fa';

// Profile information interface
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  profileImage: string | null;
}

// Recent application interface
interface RecentApplication {
  id: string;
  type: string;
  status: string;
  submittedDate: string;
  reference: string;
}

// Document interface
interface UserDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate?: string;
  verified: boolean;
}

// Appointment interface
interface Appointment {
  id: string;
  purpose: string;
  date: string;
  time: string;
  status: string;
}

const CitizenProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    // Simulate loading profile data from API or local storage
    setLoading(true);
    
    // Get user data from localStorage
    const userString = localStorage.getItem('citizenUser');
    
    // Simulate API delay
    setTimeout(() => {
      if (userString) {
        try {
          const userData = JSON.parse(userString);
          
          // Create profile object from user data
          setProfile({
            id: userData.id || 'CIT-1234567',
            firstName: userData.firstName || 'John',
            lastName: userData.lastName || 'Doe',
            email: userData.email || 'john.doe@example.com',
            phoneNumber: userData.phoneNumber || '+1 555-123-4567',
            address: userData.address || '123 Main Street',
            city: userData.city || 'New York',
            state: userData.state || 'NY',
            zipCode: userData.zipCode || '10001',
            country: userData.country || 'United States',
            dateOfBirth: userData.dateOfBirth || '1985-01-15',
            nationality: userData.nationality || 'American',
            passportNumber: userData.passportNumber || 'P12345678',
            passportExpiryDate: userData.passportExpiryDate || '2028-01-15',
            profileImage: userData.profileImage || null
          });
          
          // Sample recent applications
          setRecentApplications([
            {
              id: 'APP-78901',
              type: 'Passport Renewal',
              status: 'In Progress',
              submittedDate: '2023-05-15',
              reference: 'REF-2023-05-78901'
            },
            {
              id: 'APP-56789',
              type: 'Document Attestation',
              status: 'Completed',
              submittedDate: '2023-03-10',
              reference: 'REF-2023-03-56789'
            },
            {
              id: 'APP-45678',
              type: 'Emergency Travel Certificate',
              status: 'Approved',
              submittedDate: '2023-01-22',
              reference: 'REF-2023-01-45678'
            }
          ]);
          
          // Sample documents
          setDocuments([
            {
              id: 'DOC-12345',
              name: 'Passport',
              type: 'Identification',
              uploadDate: '2022-11-05',
              expiryDate: '2028-01-15',
              verified: true
            },
            {
              id: 'DOC-23456',
              name: 'Birth Certificate',
              type: 'Identification',
              uploadDate: '2022-11-05',
              verified: true
            },
            {
              id: 'DOC-34567',
              name: 'Proof of Address',
              type: 'Utility Bill',
              uploadDate: '2022-12-15',
              expiryDate: '2023-12-15',
              verified: true
            }
          ]);
          
          // Sample appointments
          setAppointments([
            {
              id: 'APT-12345',
              purpose: 'Passport Collection',
              date: '2023-06-15',
              time: '10:30 AM',
              status: 'Scheduled'
            }
          ]);
          
        } catch (error) {
          console.error('Failed to parse user data', error);
        }
      }
      
      setLoading(false);
    }, 1000);
  }, []);
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <section className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 border-2 border-primary-300 overflow-hidden">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <FaUser className="h-10 w-10" />
                )}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{profile?.firstName} {profile?.lastName}</h1>
                <p className="text-sm text-gray-500">Citizen ID: {profile?.id}</p>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <FaGlobe className="mr-1" /> {profile?.nationality}
                </div>
              </div>
            </div>
            <Link to="/citizen/settings" className="btn-secondary flex items-center">
              <FaEdit className="mr-2" /> Edit Profile
            </Link>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{profile?.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="mt-1 text-sm text-gray-900">{profile?.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaCalendarAlt className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p className="mt-1 text-sm text-gray-900">{profile?.dateOfBirth && formatDate(profile.dateOfBirth)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile?.address}, {profile?.city}, {profile?.state} {profile?.zipCode}, {profile?.country}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaPassport className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Passport Number</p>
                  <p className="mt-1 text-sm text-gray-900">{profile?.passportNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaClock className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Passport Expiry Date</p>
                  <p className="mt-1 text-sm text-gray-900">{profile?.passportExpiryDate && formatDate(profile.passportExpiryDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Applications */}
      <section className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-primary-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
            <Link to="/citizen/applications" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View All
            </Link>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {recentApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {application.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.submittedDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link to={`/citizen/applications/${application.id}`} className="text-primary-600 hover:text-primary-800 mr-4">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaFileAlt className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">Start a new application to see it here.</p>
              <div className="mt-6">
                <Link to="/citizen/applications" className="btn-primary">
                  New Application
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Documents */}
      <section className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-primary-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">My Documents</h2>
            <Link to="/citizen/settings?tab=documents" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Manage Documents
            </Link>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document) => (
                <div key={document.id} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                          <FaIdCard className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
                        <p className="text-xs text-gray-500">{document.type}</p>
                      </div>
                    </div>
                    {document.verified && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheck className="mr-1 h-3 w-3" /> Verified
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Uploaded on:</span>
                      <span>{formatDate(document.uploadDate)}</span>
                    </div>
                    {document.expiryDate && (
                      <div className="flex justify-between">
                        <span>Expires on:</span>
                        <span>{formatDate(document.expiryDate)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-primary-600 hover:text-primary-800 text-sm flex items-center">
                      <FaDownload className="mr-1 h-3 w-3" /> Download
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaIdCard className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">Upload your documents for verification.</p>
              <div className="mt-6">
                <Link to="/citizen/settings?tab=documents" className="btn-primary">
                  Upload Documents
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Upcoming Appointments */}
      <section className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-primary-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Schedule New Appointment
            </button>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(appointment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-800 mr-4">
                          View Details
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Schedule an appointment for in-person services.</p>
              <div className="mt-6">
                <button className="btn-primary">
                  Schedule Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CitizenProfile;
