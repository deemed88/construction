
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, change, changeType, icon, children, className }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md flex flex-col ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`mt-1 text-xs font-medium flex items-center ${changeColor}`}>
              {changeType === 'increase' ? '▲' : '▼'} {change}
            </div>
          )}
        </div>
        <div className="bg-brand-blue-100 text-brand-blue-600 p-3 rounded-full">
          {icon}
        </div>
      </div>
      {children && <div className="mt-4 flex-1">{children}</div>}
    </div>
  );
};
