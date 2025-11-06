import React, { useState } from 'react';
import { User, UserRole } from '../../types';

interface NewMaterialFormProps {
  onClose: () => void;
  onAddMaterial: (materialData: any) => void;
  projectMembers: User[];
}

export const NewMaterialForm: React.FC<NewMaterialFormProps> = ({ onClose, onAddMaterial, projectMembers }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        unit: '',
        supplier: '',
        supplyDate: '',
        invoiceNumber: '',
    });
    const [visibleTo, setVisibleTo] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVisibilityChange = (memberId: string) => {
        setVisibleTo(prev => 
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddMaterial({
            ...formData,
            quantity: parseInt(formData.quantity, 10) || 0,
            usageHistory: [],
            visibleTo: visibleTo.length > 0 ? visibleTo : undefined,
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";
    const taggableMembers = projectMembers.filter(m => m.role !== UserRole.CLIENT);

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Material Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={commonInputClass} placeholder="e.g., Cement Bags" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className={commonInputClass} placeholder="e.g., 500" />
                    </div>
                    <div>
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
                        <input type="text" name="unit" id="unit" value={formData.unit} onChange={handleChange} required className={commonInputClass} placeholder="e.g., bags, tons" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
                    <input type="text" name="supplier" id="supplier" value={formData.supplier} onChange={handleChange} required className={commonInputClass} placeholder="e.g., Dangote Cement Plc" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="supplyDate" className="block text-sm font-medium text-gray-700">Supply Date</label>
                        <input type="date" name="supplyDate" id="supplyDate" value={formData.supplyDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                    <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number</label>
                        <input type="text" name="invoiceNumber" id="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required className={commonInputClass} placeholder="e.g., INV-001" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Visible To (Optional)</label>
                    <p className="text-xs text-gray-500 mb-2">If no one is selected, only managers will see this item.</p>
                    <div className="mt-2 space-y-2 border border-gray-200 rounded-md p-2 max-h-32 overflow-y-auto">
                        {taggableMembers.map(member => (
                            <div key={member.id} className="flex items-center">
                                <input
                                    id={`member-${member.id}`}
                                    name="visibleTo"
                                    type="checkbox"
                                    checked={visibleTo.includes(member.id)}
                                    onChange={() => handleVisibilityChange(member.id)}
                                    className="h-4 w-4 text-brand-blue-600 border-gray-300 rounded focus:ring-brand-blue-500"
                                />
                                <label htmlFor={`member-${member.id}`} className="ml-3 text-sm text-gray-700">{member.name}</label>
                            </div>
                        ))}
                         {taggableMembers.length === 0 && (
                            <p className="text-xs text-gray-500 p-2">No other team members on this project to tag.</p>
                         )}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Material</button>
            </div>
        </form>
    );
};