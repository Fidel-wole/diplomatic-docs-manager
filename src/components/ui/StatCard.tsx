import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  bgColor = 'bg-white',
  textColor = 'text-gray-800'
}: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-6 border border-gray-100`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h4 className={`text-2xl font-semibold mt-1 ${textColor}`}>{value}</h4>
          
          {trend && (
            <div className="flex items-center mt-2">
              <div className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                {trend.isPositive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414l3.293 3.293A1 1 0 0012 13z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ml-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.value}%
              </span>
              <span className="text-xs ml-1 text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
