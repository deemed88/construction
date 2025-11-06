
import React, { useState } from 'react';
import { mockUsers } from '../../mockData';
import { User } from '../../types';

interface NewTaskFormProps {
  onClose: () => void;
  onAddTask: (taskData: any) => void;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose, onAddTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        assigneeId: '',
        dueDate: '',
        priority: 'Medium'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(formData);
    };
    
    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700">Assign To</label>
                    <select name="assigneeId" id="assigneeId" value={formData.assigneeId} onChange={handleChange} className={commonInputClass}>
                        <option value="">Unassigned</option>
                        {mockUsers.map((user: User) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={commonInputClass} />
                </div>
                 <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className={commonInputClass}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Task</button>
            </div>
        </form>
    );
};
