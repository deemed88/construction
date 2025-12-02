
import React, { useMemo } from 'react';
import { DashboardCard } from '../DashboardCard';
import { Project, Task, User, UserRole } from '../../types';
import { BuildingOfficeIcon, ClockIcon, FolderIcon } from '@heroicons/react/24/outline';
import { mockProjects, mockTasks } from '../../mockData';

const TaskItem: React.FC<{ task: Task; projectName?: string }> = ({ task, projectName }) => {
    const priorityClasses = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        Low: 'bg-green-100 text-green-700',
    };
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div>
                <p className="text-sm font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-brand-blue-600 font-medium">{projectName}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityClasses[task.priority]}`}>{task.priority}</span>
        </div>
    );
};

const ProjectStatusItem: React.FC<{ project: Project }> = ({ project }) => {
    const statusClasses = {
        'On Track': 'bg-green-100 text-green-800',
        'Delayed': 'bg-red-100 text-red-800',
        'Completed': 'bg-blue-100 text-blue-800',
        'Planning': 'bg-yellow-100 text-yellow-800',
    };
    
    return (
        <div className="py-3 border-b border-gray-100 last:border-0">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 overflow-hidden">
                    <p className="text-sm font-medium text-gray-700 truncate">{project.name}</p>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${statusClasses[project.status]}`}>
                        {project.status}
                    </span>
                </div>
                <p className="text-sm font-bold text-brand-blue-700">{project.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>
    );
}

interface DashboardProps {
    currentUser: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
    // Logic matching Projects.tsx to ensure counts are consistent across tabs
    const visibleProjects = useMemo(() => {
        const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];
        if (privilegedRoles.includes(currentUser.role)) {
            return mockProjects;
        }
        if (currentUser.role === UserRole.CLIENT) {
            return mockProjects.filter(p => p.clientId === currentUser.id);
        }
        return mockProjects.filter(p => p.members.some(member => member.id === currentUser.id));
    }, [currentUser]);

    const allProjectsCount = visibleProjects.length;
    // Active Projects: same with the number of project in the project board that is still on going
    const activeProjectsCount = visibleProjects.filter(p => p.status !== 'Completed').length;
    
    // Tasks filtered by visible projects
    const tasksDueCount = mockTasks.filter(t => t.status !== 'Done' && visibleProjects.some(p => p.id === t.projectId)).length;

    // Upcoming Tasks: indicate the project the task is under
    const upcomingTasks = useMemo(() => {
        return mockTasks
            .filter(t => t.status !== 'Done' && visibleProjects.some(p => p.id === t.projectId))
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 5)
            .map(t => ({
                ...t,
                projectName: visibleProjects.find(p => p.id === t.projectId)?.name
            }));
    }, [visibleProjects]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
                title="All Projects"
                value={allProjectsCount.toString()}
                icon={<FolderIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            <DashboardCard
                title="Active Projects"
                value={activeProjectsCount.toString()}
                icon={<BuildingOfficeIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            <DashboardCard
                title="Tasks Due"
                value={tasksDueCount.toString()}
                icon={<ClockIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Upcoming Tasks */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
                    <div className="space-y-2">
                        {upcomingTasks.map(task => (
                            <TaskItem key={task.id} task={task} projectName={task.projectName} />
                        ))}
                        {upcomingTasks.length === 0 && <p className="text-gray-500 text-sm">No upcoming tasks.</p>}
                    </div>
                </div>
                
                 {/* Project Health Overview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Health Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {visibleProjects.map(project => (
                            <ProjectStatusItem key={project.id} project={project} />
                        ))}
                         {visibleProjects.length === 0 && <p className="text-gray-500 text-sm">No projects to display.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
