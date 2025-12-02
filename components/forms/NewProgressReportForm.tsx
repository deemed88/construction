
import React, { useState } from 'react';

interface NewProgressReportFormProps {
  onClose: () => void;
  onAddReport: (reportData: any) => void;
  currentProgress: number;
}

export const NewProgressReportForm: React.FC<NewProgressReportFormProps> = ({ onClose, onAddReport, currentProgress }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
        percentageComplete: currentProgress.toString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddReport({
            ...formData,
            percentageComplete: parseInt(formData.percentageComplete, 10),
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Report Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={commonInputClass} placeholder="e.g., Weekly Site Update" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={commonInputClass} />
                    </div>
                     <div>
                        <label htmlFor="percentageComplete" className="block text-sm font-medium text-gray-700">Project Progress (%)</label>
                        <input type="number" name="percentageComplete" id="percentageComplete" value={formData.percentageComplete} onChange={handleChange} min="0" max="100" required className={commonInputClass} />
                    </div>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Report Content</label>
                    <textarea 
                        name="content" 
                        id="content" 
                        rows={5} 
                        value={formData.content} 
                        onChange={handleChange} 
                        required 
                        className={commonInputClass} 
                        placeholder="Describe progress, issues encountered, milestones achieved..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Photos (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-blue-600 hover:text-brand-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue-500">
                                    <span>Upload photos</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Post Report</button>
            </div>
        </form>
    );
};
