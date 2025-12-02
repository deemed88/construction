
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { User, UserRole, ProgressReport } from '../../types';
import { mockProgressReports, mockProjects, mockUsers } from '../../mockData';
import { Modal } from '../Modal';
import { NewProgressReportForm } from '../forms/NewProgressReportForm';

interface ProgressReportsProps {
  projectId: string;
  currentUser: User;
}

export const ProgressReports: React.FC<ProgressReportsProps> = ({ projectId, currentUser }) => {
  const [reports, setReports] = useState<ProgressReport[]>(
      mockProgressReports.filter(r => r.projectId === projectId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const project = mockProjects.find(p => p.id === projectId);

  // Allow PMs, Team Members, and Admins/Owners to add reports. Clients are read-only.
  const canAddReport = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER, UserRole.TEAM_MEMBER].includes(currentUser.role);

  const handleAddReport = (reportData: any) => {
    const newReport: ProgressReport = {
        id: `pr${Date.now()}`,
        projectId,
        authorId: currentUser.id,
        ...reportData,
    };
    mockProgressReports.push(newReport);
    setReports(prev => [newReport, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Progress Report">
          <NewProgressReportForm 
            onClose={() => setIsModalOpen(false)} 
            onAddReport={handleAddReport} 
            currentProgress={project?.progress || 0}
          />
      </Modal>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Progress Reports</h2>
          {canAddReport && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Report</span>
              </button>
          )}
        </div>

        <div className="space-y-6">
            {reports.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-md text-center text-gray-500">
                    <p className="text-lg font-semibold">No progress reports have been posted yet.</p>
                    {canAddReport && <p className="text-sm mt-2">Post the first update to keep everyone informed.</p>}
                </div>
            ) : (
                reports.map((report) => {
                    const author = mockUsers.find(u => u.id === report.authorId);
                    return (
                        <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full ring-2 ring-white" src={author?.avatarUrl} alt={author?.name} />
                                        <div className="ml-3">
                                            <p className="text-sm font-semibold text-gray-900">{author?.name}</p>
                                            <p className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {report.percentageComplete}% Complete
                                    </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{report.content}</p>

                                {report.photos && report.photos.length > 0 && (
                                    <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
                                        {report.photos.map((photo, index) => (
                                            <img key={index} src={photo} alt={`Report attachment ${index + 1}`} className="h-32 w-auto rounded-lg shadow-sm border border-gray-200" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
      </div>
    </>
  );
};
