import React, { useState, useMemo, useRef } from 'react';
import { Task, User, UserRole } from '../../types';
import { PlusIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { EllipsisHorizontalIcon, PaperClipIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { mockTasks, mockUsers } from '../../mockData';
import { Modal } from '../Modal';
import { NewTaskForm } from '../forms/NewTaskForm';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const priorityClasses = {
        High: 'bg-red-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-green-500',
    };
    const audioRef = useRef<HTMLAudioElement>(null);

    const playAudio = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent card drag from starting
        if (audioRef.current) {
            audioRef.current.play().catch(error => console.error("Audio play failed:", error));
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4 cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-800">{task.title}</h4>
                <button className="text-gray-400 hover:text-gray-600">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
                <span className={`w-3 h-3 rounded-full mr-2 ${priorityClasses[task.priority]}`}></span>
                <span>{task.priority} Priority</span>
                <span className="mx-2">·</span>
                <span>Due: {task.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                     <span className="flex items-center"><ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-1" /> 2</span>
                     <span className="flex items-center"><PaperClipIcon className="w-4 h-4 mr-1" /> 3</span>
                     {task.audioMemoUrl && (
                        <>
                            <button onClick={playAudio} title="Play voice memo" className="flex items-center text-brand-blue-600 hover:text-brand-blue-800">
                                <PlayCircleIcon className="w-5 h-5" />
                            </button>
                            <audio ref={audioRef} src={task.audioMemoUrl} className="hidden" />
                        </>
                     )}
                </div>
                {task.assignee ? (
                    <img src={task.assignee.avatarUrl} alt={task.assignee.name} title={task.assignee.name} className="w-8 h-8 rounded-full ring-2 ring-white" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed border-gray-400"></div>
                )}
            </div>
        </div>
    );
};

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    status: 'To Do' | 'In Progress' | 'Done';
    onAddTaskClick: (status: 'To Do' | 'In Progress' | 'Done') => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, status, onAddTaskClick }) => {
    const statusClasses = {
        'To Do': 'border-t-yellow-400',
        'In Progress': 'border-t-blue-500',
        'Done': 'border-t-green-500',
    };
    return (
        <div className={`bg-gray-100 rounded-lg p-4 w-full md:w-1/3 flex-shrink-0 border-t-4 ${statusClasses[status]}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold text-gray-700">{title}</h3>
                <span className="text-sm font-semibold text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">{tasks.length}</span>
            </div>
            <div>
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
            <button
                onClick={() => onAddTaskClick(status)}
                className="w-full flex items-center justify-center p-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-md"
            >
                <PlusIcon className="h-4 w-4 mr-1"/> Add Task
            </button>
        </div>
    );
}

interface TasksProps {
  projectId: string;
  currentUser: User;
}

export const Tasks: React.FC<TasksProps> = ({ projectId, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTaskStatus, setModalTaskStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [taskTrigger, setTaskTrigger] = useState(0);
  
  const projectTasks = useMemo(() => {
    const allTasks = mockTasks.filter(t => t.projectId === projectId);
    const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];

    if (privilegedRoles.includes(currentUser.role)) {
      return allTasks;
    }
    
    // For Team Members and Clients, show only their assigned tasks
    return allTasks.filter(task => task.assignee?.id === currentUser.id);
  }, [projectId, currentUser, taskTrigger]);

  const handleAddTaskClick = (status: 'To Do' | 'In Progress' | 'Done') => {
    setModalTaskStatus(status);
    setIsModalOpen(true);
  };
  
  const handleAddTask = (taskData: any) => {
    const newTask: Task = {
        id: `t-${Date.now()}`,
        projectId: projectId,
        title: taskData.title,
        status: modalTaskStatus,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        assignee: taskData.assigneeId ? mockUsers.find(u => u.id === taskData.assigneeId) : undefined,
        audioMemoUrl: taskData.audioMemoUrl,
    };
    mockTasks.push(newTask);
    setTaskTrigger(t => t + 1); // Trigger re-render
    setIsModalOpen(false);
  };

  return (
    <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add New Task to "${modalTaskStatus}"`}>
            <NewTaskForm onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />
        </Modal>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <TaskColumn title="To Do" status="To Do" tasks={projectTasks.filter(t => t.status === 'To Do')} onAddTaskClick={handleAddTaskClick} />
            <TaskColumn title="In Progress" status="In Progress" tasks={projectTasks.filter(t => t.status === 'In Progress')} onAddTaskClick={handleAddTaskClick} />
            <TaskColumn title="Done" status="Done" tasks={projectTasks.filter(t => t.status === 'Done')} onAddTaskClick={handleAddTaskClick} />
        </div>
    </>
  );
};