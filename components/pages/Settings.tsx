
import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
        <p className="text-gray-600">
          This is the settings page. Configuration options for your account and the application will be available here in a future update.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">Account Actions</h3>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div>
                <p className="font-medium text-gray-800">Logout</p>
                <p className="text-sm text-gray-500">Sign out of your ConstructPro Africa account.</p>
            </div>
            <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
            </button>
        </div>
      </div>

    </div>
  );
};
