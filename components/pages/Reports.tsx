
import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid';

interface ReportsProps {
  projectId: string;
}

export const Reports: React.FC<ReportsProps> = ({ projectId }) => {
  // The projectId prop can be used here to generate project-specific reports
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <DocumentArrowDownIcon className="h-5 w-5" />
          <span>Export All Reports</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Variance Report</h3>
          <p className="text-gray-600 text-sm">Detailed breakdown of planned vs. actual costs across all projects. Helps identify budget overruns and areas for cost savings.</p>
           <button className="mt-4 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">Generate Report</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Report</h3>
          <p className="text-gray-600 text-sm">Analyzes task completion rates by project, team member, and time period. Useful for performance reviews and identifying bottlenecks.</p>
           <button className="mt-4 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">Generate Report</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Labor Productivity Report</h3>
          <p className="text-gray-600 text-sm">Tracks hours logged versus tasks completed to measure workforce efficiency. Can be filtered by individual or team.</p>
           <button className="mt-4 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">Generate Report</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Summary Report</h3>
          <p className="text-gray-600 text-sm">Generates a client-facing summary of project progress, key milestones achieved, and budget status. Ideal for weekly updates.</p>
          <button className="mt-4 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">Generate Report</button>
        </div>
      </div>
    </div>
  );
};
