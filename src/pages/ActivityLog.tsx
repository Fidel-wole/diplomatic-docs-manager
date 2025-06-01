import { useState } from 'react';
import Card from '../components/ui/Card';
import { FaCalendarAlt, FaFilter, FaDownload } from 'react-icons/fa';
import ActivityFeed from '../components/dashboard/ActivityFeed';

type ActivityType = 'approval' | 'rejection' | 'update' | 'creation' | 'note';

interface ActivityItem {
  id: string;
  type: ActivityType;
  user: string;
  action: string;
  documentId?: string;
  documentType?: string;
  timestamp: string;
  details?: string;
  ipAddress?: string;
  date: string;
}

// Sample activity data
const sampleActivities: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'approval',
    user: 'John Doe',
    action: 'approved passport application',
    documentId: 'APP-2025-0123',
    documentType: 'Passport',
    timestamp: '10 minutes ago',
    details: 'All documents verified and approved for processing',
    ipAddress: '192.168.1.45',
    date: '2025-05-31'
  },
  {
    id: 'ACT-002',
    type: 'creation',
    user: 'Jane Smith',
    action: 'created new ETC document',
    documentId: 'ETC-2025-0456',
    documentType: 'Emergency Travel Certificate',
    timestamp: '45 minutes ago',
    details: 'Emergency travel certificate issued for medical emergency',
    ipAddress: '192.168.1.23',
    date: '2025-05-31'
  },
  {
    id: 'ACT-003',
    type: 'update',
    user: 'Mark Johnson',
    action: 'updated attestation document',
    documentId: 'ATT-2025-0789',
    documentType: 'Attestation',
    timestamp: '2 hours ago',
    details: 'Updated applicant contact information and document status',
    ipAddress: '192.168.1.87',
    date: '2025-05-31'
  },
  {
    id: 'ACT-004',
    type: 'rejection',
    user: 'Sarah Williams',
    action: 'rejected verification request',
    documentId: 'VER-2025-0321',
    documentType: 'Verification',
    timestamp: '3 hours ago',
    details: 'Missing required supporting documentation for verification',
    ipAddress: '192.168.1.32',
    date: '2025-05-31'
  },
  {
    id: 'ACT-005',
    type: 'note',
    user: 'Robert Brown',
    action: 'added note to application',
    documentId: 'NOL-2025-1234',
    documentType: 'No Objection Letter',
    timestamp: '5 hours ago',
    details: 'Applicant notified of additional documentation requirements',
    ipAddress: '192.168.1.56',
    date: '2025-05-31'
  },
  {
    id: 'ACT-006',
    type: 'update',
    user: 'Emily Davis',
    action: 'updated user permissions',
    timestamp: '1 day ago',
    details: 'Modified role permissions for verification officers',
    ipAddress: '192.168.1.78',
    date: '2025-05-30'
  },
  {
    id: 'ACT-007',
    type: 'approval',
    user: 'Michael Wilson',
    action: 'approved NOL request',
    documentId: 'NOL-2025-5678',
    documentType: 'No Objection Letter',
    timestamp: '1 day ago',
    details: 'No objection letter approved and issued to applicant',
    ipAddress: '192.168.1.92',
    date: '2025-05-30'
  },
  {
    id: 'ACT-008',
    type: 'creation',
    user: 'Jessica Miller',
    action: 'created new user account',
    timestamp: '2 days ago',
    details: 'New user account created for passport officer',
    ipAddress: '192.168.1.64',
    date: '2025-05-29'
  },
  {
    id: 'ACT-009',
    type: 'rejection',
    user: 'David Taylor',
    action: 'rejected attestation request',
    documentId: 'ATT-2025-9012',
    documentType: 'Attestation',
    timestamp: '2 days ago',
    details: 'Document authenticity could not be verified',
    ipAddress: '192.168.1.37',
    date: '2025-05-29'
  },
  {
    id: 'ACT-010',
    type: 'update',
    user: 'Sophia Martinez',
    action: 'updated system settings',
    timestamp: '3 days ago',
    details: 'Updated email notification templates for application status changes',
    ipAddress: '192.168.1.15',
    date: '2025-05-28'
  }
];

const ActivityLog = () => {
  const [dateFilter, setDateFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activities, setActivities] = useState<ActivityItem[]>(sampleActivities);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  // Get unique users for the filter
  const uniqueUsers = Array.from(new Set(sampleActivities.map(activity => activity.user)));
  
  const handleFilterChange = () => {
    let filtered = [...sampleActivities];
    
    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(activity => activity.date === dateFilter);
    }
    
    // Apply user filter
    if (userFilter) {
      filtered = filtered.filter(activity => activity.user === userFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === typeFilter);
    }
    
    setActivities(filtered);
  };

  const toggleActivityDetails = (activityId: string) => {
    if (expandedActivity === activityId) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(activityId);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Activity Log</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center gap-2">
            <FaDownload size={14} />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="approval">Approvals</option>
              <option value="rejection">Rejections</option>
              <option value="creation">Creations</option>
              <option value="update">Updates</option>
              <option value="note">Notes</option>
            </select>
          </div>
          
          <button
            onClick={handleFilterChange}
            className="btn-primary flex items-center h-10 gap-2"
          >
            <FaFilter size={14} />
            <span>Apply Filters</span>
          </button>
        </div>
      </Card>

      <Card title="Activity Timeline">
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {activities.length} entries
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-start">
                  <div className="flex-1">
                    <ActivityFeed activities={[{
                      type: activity.type,
                      user: activity.user,
                      action: activity.action,
                      documentId: activity.documentId,
                      documentType: activity.documentType,
                      timestamp: activity.timestamp
                    }]} />
                  </div>

                  <button
                    onClick={() => toggleActivityDetails(activity.id)}
                    className="text-sm text-primary-600 hover:text-primary-800 ml-4"
                  >
                    {expandedActivity === activity.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {expandedActivity === activity.id && (
                  <div className="mt-3 bg-gray-50 p-4 rounded-lg text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 mb-1">Activity ID:</p>
                        <p className="font-medium">{activity.id}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-600 mb-1">IP Address:</p>
                        <p className="font-medium">{activity.ipAddress || 'N/A'}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-600 mb-1">Date & Time:</p>
                        <p className="font-medium">{activity.date} ({activity.timestamp})</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-600 mb-1">User:</p>
                        <p className="font-medium">{activity.user}</p>
                      </div>
                      
                      {activity.documentId && (
                        <div>
                          <p className="text-gray-600 mb-1">Document:</p>
                          <p className="font-medium">{activity.documentId} ({activity.documentType})</p>
                        </div>
                      )}
                    </div>
                    
                    {activity.details && (
                      <div className="mt-3">
                        <p className="text-gray-600 mb-1">Details:</p>
                        <p className="font-medium">{activity.details}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No activities found matching your filters.
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="text-gray-500 text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{activities.length}</span> of <span className="font-medium">{sampleActivities.length}</span> activities
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

export default ActivityLog;
