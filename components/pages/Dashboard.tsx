import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { BudgetChart } from '../charts/BudgetChart';
import { Project, Task, UserRole } from '../../types';
import { ArrowTrendingUpIcon, BuildingOfficeIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { mockProjects } from '../../mockData';

// FIX: Added projectId to each task object to satisfy the Task interface.
const mockTasks: Task[] = [
    { id: 't1', projectId: 'p1', title: 'Lay foundation for Block A', status: 'In Progress', dueDate: '2024-08-15', priority: 'High' },
    { id: 't2', projectId: 'p2', title: 'Install plumbing on 1st floor', status: 'To Do', dueDate: '2024-08-20', priority: 'Medium' },
    { id: 't3', projectId: 'p1', title: 'Client inspection and sign-off', status: 'To Do', dueDate: '2024-08-22', priority: 'High' },
    { id: 't4', projectId: 'p3', title: 'Finalize electrical wiring', status: 'Done', dueDate: '2024-08-10', priority: 'Medium' },
];

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const priorityClasses = {
        High: 'bg-red-100 text-red-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        Low: 'bg-green-100 text-green-700',
    };
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div>
                <p className="text-sm font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityClasses[task.priority]}`}>{task.priority}</span>
        </div>
    );
};

const ProjectStatusItem: React.FC<{ project: Project }> = ({ project }) => {
    const statusColor = {
        'On Track': 'bg-green-500',
        'Delayed': 'bg-red-500',
        'Completed': 'bg-blue-500',
        'Planning': 'bg-yellow-500',
    };
    return (
        <div className="py-2">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700">{project.name}</p>
                <p className="text-sm font-semibold text-gray-900">{project.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${statusColor[project.status]} h-2 rounded-full`} style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>
    );
}

export const Dashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
                title="Total Budget"
                value="₦150.5M"
                change="+5.2% vs last month"
                changeType="increase"
                icon={<CurrencyDollarIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            <DashboardCard
                title="Active Projects"
                value="12"
                change="-2 from last month"
                changeType="decrease"
                icon={<BuildingOfficeIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            <DashboardCard
                title="Tasks Due This Week"
                value="8"
                icon={<ClockIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            <DashboardCard
                title="Overall Progress"
                value="68%"
                change="+3% this week"
                changeType="increase"
                icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                className="lg:col-span-1"
            />
            
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned vs Actual Costs</h3>
                <BudgetChart />
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
                <div className="space-y-2">
                    {mockTasks.filter(t => t.status !== 'Done').slice(0, 4).map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
            
            <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Health Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {mockProjects.slice(0, 6).map(project => (
                        <ProjectStatusItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};