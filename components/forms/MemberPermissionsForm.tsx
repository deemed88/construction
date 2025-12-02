
import React, { useState, useEffect } from 'react';
import { Project, User } from '../../types';
import { ALL_PROJECT_TABS, getDefaultVisibleTabs } from '../pages/ProjectTabsConfig';

interface MemberPermissionsFormProps {
  member: User;
  project: Project;
  onSave: (userId: string, allowedTabs: string[]) => void;
  onClose: () => void;
}

export const MemberPermissionsForm: React.FC<MemberPermissionsFormProps> = ({ member, project, onSave, onClose }) => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  useEffect(() => {
    // Load existing permissions or defaults
    if (project.memberPermissions && project.memberPermissions[member.id]) {
      setSelectedTabs(project.memberPermissions[member.id]);
    } else {
      setSelectedTabs(getDefaultVisibleTabs(member.role));
    }
  }, [member, project]);

  const handleToggle = (tabId: string) => {
    setSelectedTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(member.id, selectedTabs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm text-gray-600 mb-4">
        Control which tabs <strong>{member.name}</strong> can access in this project.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[60vh] overflow-y-auto">
        {ALL_PROJECT_TABS.map(tab => (
          <div key={tab.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleToggle(tab.id)}>
            <input
              type="checkbox"
              id={`tab-${tab.id}`}
              checked={selectedTabs.includes(tab.id)}
              onChange={() => {}} // Handled by div click
              className="h-4 w-4 text-brand-blue-600 focus:ring-brand-blue-500 border-gray-300 rounded"
            />
            <div className="ml-3 flex items-center">
                <tab.icon className="h-5 w-5 text-gray-400 mr-2" />
                <label htmlFor={`tab-${tab.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                {tab.label}
                </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700"
        >
          Save Permissions
        </button>
      </div>
    </form>
  );
};
