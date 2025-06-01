import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

type ActivityType = 'approval' | 'rejection' | 'update' | 'creation' | 'note';

interface ActivityItemProps {
  type: ActivityType;
  user: string;
  action: string;
  documentId?: string;
  documentType?: string;
  timestamp: string;
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'approval':
      return <FaCheckCircle className="text-green-500" />;
    case 'rejection':
      return <FaExclamationCircle className="text-red-500" />;
    case 'update':
      return <FaInfoCircle className="text-blue-500" />;
    case 'creation':
      return <FaInfoCircle className="text-yellow-500" />;
    case 'note':
      return <FaInfoCircle className="text-gray-500" />;
    default:
      return <FaInfoCircle className="text-gray-500" />;
  }
};

const ActivityItem = ({ type, user, action, documentId, documentType, timestamp }: ActivityItemProps) => {
  const icon = getActivityIcon(type);
  
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0">
      <div className="mt-1 mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <p className="text-gray-800">
            <span className="font-medium">{user}</span> {action}
            {documentId && documentType && (
              <span> <span className="font-medium">{documentId}</span> ({documentType})</span>
            )}
          </p>
        </div>
        <span className="text-xs text-gray-400">{timestamp}</span>
      </div>
    </div>
  );
};

interface ActivityFeedProps {
  activities: ActivityItemProps[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
    </div>
  );
};

export default ActivityFeed;
