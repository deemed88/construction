import React, { useState } from 'react';
import { Project, User, UserRole } from '../../types';
import { mockProjects } from '../../mockData';
import { ArrowLeftIcon, BuildingOffice2Icon, UserGroupIcon, ChartBarIcon, ClipboardDocumentListIcon, CurrencyDollarIcon, DocumentDuplicateIcon, FolderIcon, ArchiveBoxIcon, PencilSquareIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { Tasks } from './Tasks';
import { Budget } from './Budget';
import { Documents } from './Documents';
import { Invoices } from './Invoices';
import { Reports } from './Reports';
import { ProjectTeam } from './ProjectTeam';
import { Inventory } from './Inventory';
import { Notepad } from './Notepad';
import { Transactions } from './Transactions';

// A simple Project Overview component
const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div><p><span className="font-semibold text-gray-500">Location:</span> {project.location}</p></div>
            <div><p><span className="font-semibold text-gray-500">Status:</span> {project.status}</p></div>
            <div><p><span className="font-semibold text-gray-500">Start Date:</span> {project.startDate}</p></div>
            <div><p><span className="font-semibold text-gray-500">End Date:</span> {project.endDate}</p></div>
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

type SubPage = 'overview' | 'tasks' | 'budget' | 'transactions' | 'inventory' | 'documents' | 'invoices' | 'reports' | 'team' | 'notepad';

const subNavItemsOriginal: { id: SubPage, label: string, icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: BuildingOffice2Icon },
    { id: 'tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
    { id: 'budget', label: 'Budget', icon: CurrencyDollarIcon },
    { id: 'transactions', label: 'Transactions', icon: ArrowsRightLeftIcon },
    { id: 'inventory', label: 'Inventory', icon: ArchiveBoxIcon },
    { id: 'documents', label: 'Documents', icon: FolderIcon },
    { id: 'invoices', label: 'Invoices', icon: DocumentDuplicateIcon },
    { id: 'team', label: 'Team', icon: UserGroupIcon },
    { id: 'notepad', label: 'Notepad', icon: PencilSquareIcon },
    { id: 'reports', label: 'Reports', icon: ChartBarIcon },
];

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, currentUser }) => {
    const [activeSubPage, setActiveSubPage] = useState<SubPage>('overview');
    const project = mockProjects.find(p => p.id === projectId);

    const subNavItems = subNavItemsOriginal.filter(item => {
        // Rules for CLIENT
        if (currentUser.role === UserRole.CLIENT) {
            if (item.id === 'budget' || item.id === 'transactions' || item.id === 'tasks') {
                return false;
            }
        }
        // Rules for TEAM_MEMBER
        if (currentUser.role === UserRole.TEAM_MEMBER) {
            if (item.id === 'budget') {
                return false;
            }
        }
        return true;
    });

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

    const renderSubPage = () => {
        switch (activeSubPage) {
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