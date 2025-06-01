import { useState } from 'react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { 
  FaExclamationTriangle, 
  FaSearch, 
  FaPassport,
  FaPlus,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationCircle
} from 'react-icons/fa';

// Sample data for lost passport cases
const sampleLostPassports = [
  {
    id: 'LP-2025-001',
    applicantName: 'James Wilson',
    passportNumber: 'AB1234567',
    reportDate: '2025-05-28',
    lostLocation: 'New York, USA',
    status: 'Under Investigation',
    replacementId: 'P-2025-0132',
    priority: 'High',
    details: 'Lost while traveling. Police report filed.'
  },
  {
    id: 'LP-2025-002',
    applicantName: 'Maria Rodriguez',
    passportNumber: 'CD5678901',
    reportDate: '2025-05-25',
    lostLocation: 'Los Angeles, USA',
    status: 'Verified',
    replacementId: 'P-2025-0145',
    priority: 'Medium',
    details: 'Stolen from hotel room. Police case #LA-2025-5678.'
  },
  {
    id: 'LP-2025-003',
    applicantName: 'Robert Johnson',
    passportNumber: 'EF9012345',
    reportDate: '2025-05-20',
    lostLocation: 'Chicago, USA',
    status: 'Replacement Issued',
    replacementId: 'P-2025-0121',
    priority: 'Medium',
    details: 'Lost during commute. No police report.'
  },
  {
    id: 'LP-2025-004',
    applicantName: 'Sophia Martinez',
    passportNumber: 'GH3456789',
    reportDate: '2025-05-15',
    lostLocation: 'Miami, USA',
    status: 'Completed',
    replacementId: 'P-2025-0098',
    priority: 'Low',
    details: 'Lost passport found and returned to owner.'
  },
  {
    id: 'LP-2025-005',
    applicantName: 'William Brown',
    passportNumber: 'IJ7890123',
    reportDate: '2025-05-30',
    lostLocation: 'Washington DC, USA',
    status: 'Reported',
    replacementId: null,
    priority: 'High',
    details: 'Passport possibly stolen from car. No witnesses.'
  },
  {
    id: 'LP-2025-006',
    applicantName: 'Emma Davis',
    passportNumber: 'KL2345678',
    reportDate: '2025-05-29',
    lostLocation: 'Boston, USA',
    status: 'Under Investigation',
    replacementId: null,
    priority: 'High',
    details: 'Lost during international travel. Urgent replacement needed.'
  }
];

const LostPassport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [results, setResults] = useState(sampleLostPassports);
  const [selectedCase, setSelectedCase] = useState<typeof sampleLostPassports[0] | null>(null);

  // Handle search and filtering
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter based on search term and status
    const filtered = sampleLostPassports.filter(passport => {
      const matchesSearch = 
        searchTerm === '' || 
        passport.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passport.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passport.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || passport.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
    
    setResults(filtered);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reported':
        return 'bg-yellow-100 text-yellow-800';
      case 'under investigation':
        return 'bg-blue-100 text-blue-800';
      case 'verified':
        return 'bg-purple-100 text-purple-800';
      case 'replacement issued':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const reportedCount = sampleLostPassports.filter(p => p.status === 'Reported').length;
  const investigationCount = sampleLostPassports.filter(p => p.status === 'Under Investigation').length;
  const verifiedCount = sampleLostPassports.filter(p => p.status === 'Verified' || p.status === 'Replacement Issued').length;
  const completedCount = sampleLostPassports.filter(p => p.status === 'Completed').length;

  // Handle case selection for details view
  const handleCaseSelect = (caseData: typeof sampleLostPassports[0]) => {
    setSelectedCase(caseData);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lost Passport Reports</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            Export Data
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={12} />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Newly Reported"
          value={reportedCount}
          icon={<FaExclamationCircle size={24} className="text-yellow-500" />}
          bgColor="bg-yellow-50"
        />
        <StatCard
          title="Under Investigation"
          value={investigationCount}
          icon={<FaHourglassHalf size={24} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Verified & Processing"
          value={verifiedCount}
          icon={<FaCheckCircle size={24} className="text-green-500" />}
          bgColor="bg-green-50"
        />
        <StatCard
          title="Completed Cases"
          value={completedCount}
          icon={<FaFileAlt size={24} className="text-gray-500" />}
          bgColor="bg-gray-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, passport number, or case ID..."
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="md:w-48">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="reported">Reported</option>
                  <option value="under investigation">Under Investigation</option>
                  <option value="verified">Verified</option>
                  <option value="replacement issued">Replacement Issued</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <button type="submit" className="btn-primary md:w-32">
                Search
              </button>
            </form>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Lost Passport Cases</h2>
              <span className="text-gray-500 text-sm">{results.length} cases found</span>
            </div>

            {results.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {results.map((caseData) => (
                  <div 
                    key={caseData.id}
                    onClick={() => handleCaseSelect(caseData)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedCase?.id === caseData.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <FaExclamationTriangle className={`mt-1 mr-3 ${
                          caseData.priority === 'High' ? 'text-red-500' : 
                          caseData.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                        }`} />
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{caseData.applicantName}</h3>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-600">{caseData.passportNumber}</span>
                          </div>
                          <p className="text-sm text-gray-500">{caseData.id} - Reported on {caseData.reportDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(caseData.status)}`}>
                          {caseData.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(caseData.priority)}`}>
                          {caseData.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No lost passport cases found matching your search criteria.
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <div className="text-gray-500 text-sm">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{results.length}</span> of <span className="font-medium">{results.length}</span> cases
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

        <div className="lg:col-span-1">
          <Card>
            {selectedCase ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Case Details</h2>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(selectedCase.status)}`}>
                    {selectedCase.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-gray-500 text-xs">Case ID</div>
                        <div className="font-medium">{selectedCase.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Report Date</div>
                        <div className="font-medium">{selectedCase.reportDate}</div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">Priority</div>
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(selectedCase.priority)}`}>
                      {selectedCase.priority} Priority
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Applicant Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <div className="text-gray-500 text-xs">Full Name</div>
                        <div className="font-medium">{selectedCase.applicantName}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Passport Number</div>
                        <div className="flex items-center space-x-2">
                          <FaPassport className="text-gray-400" size={14} />
                          <span className="font-medium">{selectedCase.passportNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Incident Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <div className="text-gray-500 text-xs">Lost/Stolen Location</div>
                        <div className="font-medium">{selectedCase.lostLocation}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Details</div>
                        <div className="text-sm">{selectedCase.details}</div>
                      </div>
                    </div>
                  </div>

                  {selectedCase.replacementId && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Replacement Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div>
                          <div className="text-gray-500 text-xs">Replacement Passport ID</div>
                          <div className="font-medium">{selectedCase.replacementId}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row gap-3">
                    <button className="btn-primary flex-1">
                      Update Status
                    </button>
                    {!selectedCase.replacementId && selectedCase.status !== 'Completed' && (
                      <button className="btn-secondary flex-1">
                        Issue Replacement
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FaExclamationTriangle size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="mb-2">No case selected</p>
                <p className="text-sm">Select a case from the list to view details</p>
              </div>
            )}
          </Card>

          <Card className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white rounded-full">
                    <FaPlus size={14} className="text-primary-500" />
                  </div>
                  <div>
                    <div className="font-medium">New Lost Passport Report</div>
                    <div className="text-xs">Create a new lost passport case</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white rounded-full">
                    <FaPassport size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Issue Replacement Passport</div>
                    <div className="text-xs">Start replacement passport process</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white rounded-full">
                    <FaFileAlt size={14} className="text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium">Generate Police Report</div>
                    <div className="text-xs">Create report for law enforcement</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white rounded-full">
                    <FaSearch size={14} className="text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-medium">Case Lookup</div>
                    <div className="text-xs">Search through all past cases</div>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LostPassport;
