
import React, { useState, useMemo } from 'react';
import { PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { SchedulePhase, User, UserRole } from '../../types';
import { mockSchedules } from '../../mockData';
import { Modal } from '../Modal';
import { NewSchedulePhaseForm } from '../forms/NewSchedulePhaseForm';

interface ScheduleProps {
  projectId: string;
  currentUser: User;
}

const statusColors = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
};

const progressColors = {
    'Not Started': 'bg-gray-400',
    'In Progress': 'bg-blue-500',
    'Completed': 'bg-green-500',
    'Delayed': 'bg-red-500',
};

export const Schedule: React.FC<ScheduleProps> = ({ projectId, currentUser }) => {
  const [phases, setPhases] = useState<SchedulePhase[]>(
      mockSchedules.filter(s => s.projectId === projectId).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canEditSchedule = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER].includes(currentUser.role);

  const handleAddPhase = (phaseData: any) => {
    const newPhase: SchedulePhase = {
        id: `s${Date.now()}`,
        projectId,
        ...phaseData,
    };
    mockSchedules.push(newPhase);
    setPhases(prev => [...prev, newPhase].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
    setIsModalOpen(false);
  };

  const today = new Date();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Schedule Phase">
          <NewSchedulePhaseForm onClose={() => setIsModalOpen(false)} onAddPhase={handleAddPhase} />
      </Modal>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Schedule of Work</h2>
          {canEditSchedule && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Phase</span>
              </button>
          )}
        </div>

        <div className="space-y-4">
            {phases.length === 0 ? (
                 <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
                    <CalendarDaysIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-semibold">No schedule phases defined yet.</p>
                    {canEditSchedule && <p className="text-sm mt-2">Click "Add Phase" to start planning your project timeline.</p>}
                 </div>
            ) : (
                phases.map((phase, index) => {
                    const startDate = new Date(phase.startDate);
                    const endDate = new Date(phase.endDate);
                    const isCurrent = today >= startDate && today <= endDate;

                    return (
                        <div key={phase.id} className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${isCurrent ? 'border-brand-blue-400 ring-1 ring-brand-blue-100' : 'border-gray-200'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue-50 text-brand-blue-600 font-bold text-sm border border-brand-blue-100">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900">{phase.name}</h3>
                                    </div>
                                    <div className="ml-11 mt-1 flex items-center text-sm text-gray-500 space-x-4">
                                        <span>{phase.startDate} — {phase.endDate}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 ml-11 md:ml-0 flex items-center space-x-3">
                                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[phase.status]}`}>
                                        {phase.status}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-11">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-500">Progress</span>
                                    <span className="text-xs font-bold text-gray-700">{phase.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div className={`h-2.5 rounded-full transition-all duration-500 ${progressColors[phase.status]}`} style={{ width: `${phase.progress}%` }}></div>
                                </div>
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
