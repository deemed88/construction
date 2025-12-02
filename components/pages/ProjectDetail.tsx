
import React, { useState } from 'react';
import { Project, User, UserRole } from '../../types';
import { mockProjects } from '../../mockData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Tasks } from './Tasks';
import { Budget } from './Budget';
import { Documents } from './Documents';
import { Invoices } from './Invoices';
import { Reports } from './Reports';
import { ProjectTeam } from './ProjectTeam';
import { Inventory } from './Inventory';
import { Notepad } from './Notepad';
import { Transactions } from './Transactions';
import { Schedule } from './Schedule';
import { ProgressReports } from './ProgressReports';
import { ALL_PROJECT_TABS, getDefaultVisibleTabs } from './ProjectTabsConfig';

// A simple Project Overview component
const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div><p><span className="font-semibold text-gray-500">Location:</span> {project.location}</p></div>
            <div><p><span className="font-semibold text-gray-500">Status:</span> {project.status}</p></div>
            <div><p><span className="font-semibold text-gray-500">Start Date:</span> {project.startDate}</p></div>
            <div><p><span className="font-semibold text-gray-500">Due Date:</span> {project.dueDate}</p></div>
            <div><p><span className="font-semibold text-gray-500">Budget:</span> ₦{project.budget.toLocaleString()}</p></div>
            <div><p><span className="font-semibold text-gray-500">Actual Cost:</span> ₦{project.actualCost.toLocaleString()}</p></div>
        </div>
        <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-sm font-bold text-brand-blue-700">{project.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>
    </div>
);

interface ProjectDetailProps {
    projectId: string;
    onBack: () => void;
    currentUser: User;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, currentUser }) => {
    const [activeSubPage, setActiveSubPage] = useState<string>('overview');
    const project = mockProjects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">Project not found.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700">
                    Go Back
                </button>
            </div>
        );
    }

    // Determine visible tabs based on permissions
    const visibleTabIds = project.memberPermissions?.[currentUser.id] ?? getDefaultVisibleTabs(currentUser.role);
    const subNavItems = ALL_PROJECT_TABS.filter(item => visibleTabIds.includes(item.id));

    // Ensure activeSubPage is valid, else fallback to overview or first available
    if (!visibleTabIds.includes(activeSubPage) && visibleTabIds.length > 0) {
        // If 'overview' is available, default to it, otherwise first available
        if (visibleTabIds.includes('overview')) {
            setActiveSubPage('overview');
        } else {
            setActiveSubPage(visibleTabIds[0]);
        }
    }

    const renderSubPage = () => {
        switch (activeSubPage) {
            case 'progress-reports': return <ProgressReports projectId={projectId} currentUser={currentUser} />;
            case 'schedule': return <Schedule projectId={projectId} currentUser={currentUser} />;
            case 'tasks': return <Tasks projectId={projectId} currentUser={currentUser} />;
            case 'budget': return <Budget projectId={projectId} />;
            case 'transactions': return <Transactions projectId={projectId} currentUser={currentUser} />;
            case 'inventory': return <Inventory projectId={projectId} currentUser={currentUser} />;
            case 'documents': return <Documents projectId={projectId} />;
            case 'invoices': return <Invoices projectId={projectId} />;
            case 'reports': return <Reports projectId={projectId} />;
            case 'team': return <ProjectTeam projectId={projectId} currentUser={currentUser} />;
            case 'notepad': return <Notepad projectId={projectId} currentUser={currentUser} />;
            case 'overview':
            default:
                return <ProjectOverview project={project} />;
        }
    };
    
    return (
        <div>
            <div className="mb-6">
                <button onClick={onBack} className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to All Projects
                </button>
                <div className="bg-white rounded-xl shadow-md p-4">
                    <nav className="flex flex-wrap items-center gap-x-2 gap-y-2">
                         {subNavItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSubPage(item.id)}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSubPage === item.id ? 'bg-brand-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                               <item.icon className="h-5 w-5 mr-2" />
                               {item.label}
                            </button>
                         ))}
                    </nav>
                </div>
            </div>
            {renderSubPage()}
        </div>
    );
};
