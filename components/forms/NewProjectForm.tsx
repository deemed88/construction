import React, { useState } from 'react';

interface NewProjectFormProps {
  onClose: () => void;
  onAddProject: (projectData: any) => void;
}

export const NewProjectForm: React.FC<NewProjectFormProps> = ({ onClose, onAddProject }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        startDate: '',
        dueDate: '',
        budget: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProject({
            ...formData,
            budget: parseFloat(formData.budget) || 0,
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                </div>
                 <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget (₦)</label>
                    <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleChange} required className={commonInputClass} placeholder="e.g., 50000000" />
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Create Project</button>
            </div>
        </form>
    );
};