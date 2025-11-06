
import React, { useState } from 'react';
import { Material } from '../../types';

interface LogUsageFormProps {
  material: Material;
  onClose: () => void;
  onLogUsage: (usageData: { quantityUsed: number; date: string; notes: string }) => void;
}

export const LogUsageForm: React.FC<LogUsageFormProps> = ({ material, onClose, onLogUsage }) => {
    const [formData, setFormData] = useState({
        quantityUsed: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const quantity = parseInt(formData.quantityUsed, 10);
        if (isNaN(quantity) || quantity <= 0 || quantity > material.quantity) {
            alert(`Please enter a valid quantity. It must be a number between 1 and the available stock of ${material.quantity}.`);
            return;
        }
        onLogUsage({
            quantityUsed: quantity,
            date: formData.date,
            notes: formData.notes
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600">Current Stock: <span className="font-bold">{material.quantity} {material.unit}</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantityUsed" className="block text-sm font-medium text-gray-700">Quantity Used</label>
                        <input 
                          type="number" 
                          name="quantityUsed" 
                          id="quantityUsed" 
                          value={formData.quantityUsed} 
                          onChange={handleChange} 
                          required 
                          className={commonInputClass} 
                          max={material.quantity}
                          min="1"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Use</label>
                        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={commonInputClass} />
                    </div>
                </div>
                 <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                    <textarea 
                      name="notes" 
                      id="notes" 
                      value={formData.notes} 
                      onChange={handleChange} 
                      rows={3}
                      className={commonInputClass} 
                      placeholder="e.g., Used for foundation of Block A" 
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Log Usage</button>
            </div>
        </form>
    );
};