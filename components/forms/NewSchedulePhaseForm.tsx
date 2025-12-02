
import React, { useState } from 'react';

interface NewSchedulePhaseFormProps {
  onClose: () => void;
  onAddPhase: (phaseData: any) => void;
}

export const NewSchedulePhaseForm: React.FC<NewSchedulePhaseFormProps> = ({ onClose, onAddPhase }) => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        status: 'Not Started',
        progress: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddPhase({
            ...formData,
            progress: parseInt(formData.progress.toString(), 10) || 0,
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Phase Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={commonInputClass} placeholder="e.g., Foundation Work" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status" id="status" value={formData.status} onChange={handleChange} className={commonInputClass}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress (%)</label>
                         <input type="number" name="progress" id="progress" value={formData.progress} onChange={handleChange} min="0" max="100" required className={commonInputClass} />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Phase</button>
            </div>
        </form>
    );
};
