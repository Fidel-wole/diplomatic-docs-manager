import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaUserShield, 
  FaUniversity, 
  FaUserGraduate,
  FaSearch, 
  FaFilter,
  FaPlus,
  FaGraduationCap,
  FaCertificate,
  FaRegFilePdf,
  FaClipboardList
} from 'react-icons/fa';

// Sample verification applications data
const sampleVerifications = [
  {
    id: 'VER-2025-0001',
    applicantName: 'Jonathan Harris',
    documentType: 'University Degree',
    institution: 'Stanford University',
    country: 'United States',
    submissionDate: '2025-05-22',
    status: 'Verified',
    verificationDate: '2025-05-28',
    type: 'Verification'
  },
  {
    id: 'VER-2025-0002',
    applicantName: 'Elizabeth Mitchell',
    documentType: 'Professional Certification',
    institution: 'Chartered Financial Analyst Institute',
    country: 'United States',
    submissionDate: '2025-05-24',
    status: 'Under Review',
    verificationDate: null,
    type: 'Verification'
  },
  {
    id: 'EQU-2025-0003',
    applicantName: 'Mohammed Al-Farsi',
    documentType: 'Engineering Degree',
    institution: 'Technical University of Munich',
    country: 'Germany',
    submissionDate: '2025-05-26',
    status: 'Equalization Complete',
    verificationDate: '2025-05-29',
    type: 'Equalization'
  },
  {
    id: 'VER-2025-0004',
    applicantName: 'Grace Thompson',
    documentType: 'Medical Degree',
    institution: 'University of Toronto',
    country: 'Canada',
    submissionDate: '2025-05-25',
    status: 'Verification in Progress',
    verificationDate: null,
    type: 'Verification'
  },
  {
    id: 'EQU-2025-0005',
    applicantName: 'David Rodriguez',
    documentType: 'Law Degree',
    institution: 'University of Barcelona',
    country: 'Spain',
    submissionDate: '2025-05-27',
    status: 'Equalization in Progress',
    verificationDate: null,
    type: 'Equalization'
  },
  {
    id: 'VER-2025-0006',
    applicantName: 'Sofia Rossi',
    documentType: 'University Diploma',
    institution: 'University of Rome',
    country: 'Italy',
    submissionDate: '2025-05-28',
    status: 'Pending Additional Documents',
    verificationDate: null,
    type: 'Verification'
  },
  {
    id: 'EQU-2025-0007',
    applicantName: 'John Smith',
    documentType: 'Bachelor in Business',
    institution: 'London Business School',
    country: 'United Kingdom',
    submissionDate: '2025-05-29',
    status: 'External Review',
    verificationDate: null,
    type: 'Equalization'
  },
  {
    id: 'VER-2025-0008',
    applicantName: 'Nadia Patel',
    documentType: 'PhD Certificate',
    institution: 'McGill University',
    country: 'Canada',
    submissionDate: '2025-05-30',
    status: 'Verification in Progress',
    verificationDate: null,
    type: 'Verification'
  },
  {
    id: 'EQU-2025-0009',
    applicantName: 'Thomas Lee',
    documentType: 'Master of Science',
    institution: 'National University of Singapore',
    country: 'Singapore',
    submissionDate: '2025-05-31',
    status: 'Pending Review',
    verificationDate: null,
    type: 'Equalization'
  }
];


const VerificationEqualization = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [applications, setApplications] = useState(sampleVerifications);

  // Apply filters
  const handleFilter = () => {
    let filtered = [...sampleVerifications];
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase().includes(statusFilter.toLowerCase()));
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(app => app.type.toLowerCase() === typeFilter.toLowerCase());
    }
    
    setApplications(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setApplications(sampleVerifications);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    if (status.toLowerCase().includes('verified') || status.toLowerCase().includes('complete')) {
      return 'bg-green-100 text-green-800';
    } else if (status.toLowerCase().includes('progress')) {
      return 'bg-blue-100 text-blue-800';
    } else if (status.toLowerCase().includes('review')) {
      return 'bg-purple-100 text-purple-800';
    } else if (status.toLowerCase().includes('pending')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status.toLowerCase().includes('rejected')) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  // Type badge styling
  const getTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'verification':
        return 'bg-blue-100 text-blue-800';
      case 'equalization':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const completed = sampleVerifications.filter(app => 
    app.status.toLowerCase().includes('verified') || 
    app.status.toLowerCase().includes('complete')
  ).length;
  
  const inProgress = sampleVerifications.filter(app => 
    app.status.toLowerCase().includes('progress') || 
    app.status.toLowerCase().includes('review') || 
    app.status.toLowerCase().includes('pending')
  ).length;
  
  const verificationCount = sampleVerifications.filter(app => app.type === 'Verification').length;
  const equalizationCount = sampleVerifications.filter(app => app.type === 'Equalization').length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Verification / Equalization</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center gap-2">
            <FaRegFilePdf size={14} />
            <span>Export Report</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={12} />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Verifications"
          value={verificationCount}
          icon={<FaUserShield size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Equalizations"
          value={equalizationCount}
          icon={<FaGraduationCap size={24} className="text-purple-500" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Completed"
          value={completed}
          icon={<FaCertificate size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          icon={<FaClipboardList size={24} className="text-yellow-500" />}
          bgColor="bg-yellow-50"
        />
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="complete">Equalization Complete</option>
              <option value="progress">In Progress</option>
              <option value="review">Under Review</option>
              <option value="pending">Pending Documents</option>
            </select>
          </div>
          
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="verification">Verification</option>
              <option value="equalization">Equalization</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleFilter}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <FaFilter size={14} />
              <span>Filter</span>
            </button>
            <button
              onClick={resetFilters}
              className="btn-secondary px-3"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Applications</h2>
          <span className="text-gray-500 text-sm">{applications.length} applications found</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Reference ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Institution</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Submission Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-medium">{application.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(application.type)}`}>
                        {application.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{application.applicantName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {application.documentType === 'University Degree' && <FaGraduationCap size={14} className="mr-2 text-blue-500" />}
                        {application.documentType === 'PhD Certificate' && <FaGraduationCap size={14} className="mr-2 text-blue-500" />}
                        {application.documentType === 'Professional Certification' && <FaCertificate size={14} className="mr-2 text-green-500" />}
                        {application.documentType === 'Engineering Degree' && <FaUserGraduate size={14} className="mr-2 text-orange-500" />}
                        {application.documentType === 'Medical Degree' && <FaUserGraduate size={14} className="mr-2 text-red-500" />}
                        <span>{application.documentType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <FaUniversity size={14} className="mr-2 text-gray-500" />
                        <span className="text-xs md:text-sm">{application.institution}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{application.country}</td>
                    <td className="px-4 py-3">{application.submissionDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-800">
                          View
                        </button>
                        {!application.status.toLowerCase().includes('verified') && 
                         !application.status.toLowerCase().includes('complete') && (
                          <button className="text-gray-600 hover:text-gray-800">
                            Update
                          </button>
                        )}
                        {(application.status.toLowerCase().includes('verified') || 
                          application.status.toLowerCase().includes('complete')) && (
                          <button className="text-green-600 hover:text-green-800">
                            Certificate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    No applications found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{applications.length}</span> of <span className="font-medium">{sampleVerifications.length}</span> applications
          </div>
          
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary-50 text-primary-600 border border-primary-100 font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerificationEqualization;
