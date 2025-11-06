
import React, { useMemo } from 'react';
import { User, Project, Task, Invoice, Agreement } from '../../types';
import { mockProjects, mockTasks, mockInvoices, mockAgreements } from '../../mockData';
import { BuildingOfficeIcon, ClipboardDocumentCheckIcon, DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';

interface MemberDashboardProps {
    currentUser: User;
    onSelectProject: (projectId: string) => void;
}

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <div onClick={onClick} className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md hover:border-brand-blue-500 cursor-pointer transition-all">
        <h4 className="font-bold text-gray-800 truncate">{project.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{project.location}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-brand-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
        </div>
        <p className="text-right text-xs font-semibold text-gray-600 mt-1">{project.progress}% Complete</p>
    </div>
);

const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
        <div>
            <p className="text-sm font-medium text-gray-800">{task.title}</p>
            <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
        </div>
        <div className={`px-2 py-1 text-xs font-semibold rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{task.priority}</div>
    </div>
);

const InvoiceCard: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
    const statusClasses = {
        Paid: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Overdue: 'bg-red-100 text-red-800',
    };
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
            <div>
                <p className="text-sm font-medium text-gray-800">{invoice.invoiceNumber}</p>
                <p className="text-xs text-gray-500">Amount: ₦{invoice.amount.toLocaleString()}</p>
            </div>
            <div className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[invoice.status]}`}>{invoice.status}</div>
        </div>
    );
};

const AgreementCard: React.FC<{ agreement: Agreement }> = ({ agreement }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
        <div>
            <p className="text-sm font-medium text-gray-800">{agreement.title}</p>
            <p className="text-xs text-gray-500">Last Updated: {agreement.lastUpdated}</p>
        </div>
        <a href={agreement.url} className="text-sm font-semibold text-brand-blue-600 hover:underline">View</a>
    </div>
);


export const MemberDashboard: React.FC<MemberDashboardProps> = ({ currentUser, onSelectProject }) => {
    const userProjects = useMemo(() => {
        if (currentUser.role === 'Client') {
            return mockProjects.filter(p => p.clientId === currentUser.id);
        }
        return mockProjects.filter(p => p.members.some(m => m.id === currentUser.id));
    }, [currentUser]);

    const userTasks = useMemo(() => {
        return mockTasks.filter(t => t.assignee?.id === currentUser.id && t.status !== 'Done');
    }, [currentUser]);

    const userInvoices = useMemo(() => {
        return mockInvoices.filter(i => i.recipientId === currentUser.id);
    }, [currentUser]);

    const userAgreements = useMemo(() => {
        return mockAgreements.filter(a => a.clientSigneeId === currentUser.id);
    }, [currentUser]);


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {currentUser.name.split(' ')[0]}!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* My Projects */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><BuildingOfficeIcon className="w-6 h-6 mr-3 text-brand-blue-600" /> My Projects</h3>
                        <div className="space-y-4">
                            {userProjects.length > 0 ? userProjects.map(p => (
                                <ProjectCard key={p.id} project={p} onClick={() => onSelectProject(p.id)} />
                            )) : <p className="text-sm text-gray-500">You are not assigned to any projects yet.</p>}
                        </div>
                    </div>

                    {/* My Invoices (for Clients) */}
                    {currentUser.role === 'Client' && userInvoices.length > 0 && (
                         <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><DocumentTextIcon className="w-6 h-6 mr-3 text-brand-blue-600" /> My Invoices</h3>
                            <div className="space-y-3">
                                {userInvoices.map(i => <InvoiceCard key={i.id} invoice={i} />)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* My Open Tasks (for Team Members) */}
                    {currentUser.role === 'Team Member' && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><ClipboardDocumentCheckIcon className="w-6 h-6 mr-3 text-brand-blue-600" /> My Open Tasks</h3>
                            <div className="space-y-3">
                                {userTasks.length > 0 ? userTasks.map(t => (
                                    <TaskCard key={t.id} task={t} />
                                )) : <p className="text-sm text-gray-500">You have no open tasks.</p>}
                            </div>
                        </div>
                    )}
                    
                    {/* Agreements (for Clients) */}
                    {currentUser.role === 'Client' && userAgreements.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><FolderIcon className="w-6 h-6 mr-3 text-brand-blue-600" /> Agreements</h3>
                            <div className="space-y-3">
                                {userAgreements.map(a => <AgreementCard key={a.id} agreement={a} />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
