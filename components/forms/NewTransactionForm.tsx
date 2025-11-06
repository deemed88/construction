import React, { useState } from 'react';
import { TransactionCategory, TransactionType, User, UserRole } from '../../types';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface NewTransactionFormProps {
  onClose: () => void;
  onAddTransaction: (transactionData: any) => void;
  projectMembers: User[];
}

export const NewTransactionForm: React.FC<NewTransactionFormProps> = ({ onClose, onAddTransaction, projectMembers }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'Expense' as TransactionType,
        category: 'Materials' as TransactionCategory,
        amount: '',
    });
    const [involvedUserIds, setInvolvedUserIds] = useState<string[]>([]);
    const [externalNameInput, setExternalNameInput] = useState('');
    const [externalNames, setExternalNames] = useState<string[]>([]);


    const expenseCategories: TransactionCategory[] = ['Materials', 'Labor', 'Logistics', 'Permits', 'Subcontractor', 'Miscellaneous'];
    const incomingCategories: TransactionCategory[] = ['Client Payment'];

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as TransactionType;
        setFormData(prev => ({
            ...prev,
            type: newType,
            // Reset category when type changes
            category: newType === 'Expense' ? 'Materials' : 'Client Payment',
        }));
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInvolvedChange = (memberId: string) => {
        setInvolvedUserIds(prev => 
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const handleAddExternalName = () => {
        if (externalNameInput.trim() && !externalNames.includes(externalNameInput.trim())) {
            setExternalNames(prev => [...prev, externalNameInput.trim()]);
            setExternalNameInput('');
        }
    };
    
    const handleRemoveExternalName = (indexToRemove: number) => {
        setExternalNames(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTransaction({
            ...formData,
            amount: parseFloat(formData.amount) || 0,
            involvedUserIds: involvedUserIds.length > 0 ? involvedUserIds : undefined,
            externalInvolved: externalNames.length > 0 ? externalNames : undefined,
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";
    const taggableMembers = projectMembers.filter(m => m.role !== UserRole.CLIENT);

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className={commonInputClass} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select name="type" id="type" value={formData.type} onChange={handleTypeChange} className={commonInputClass}>
                            <option value="Expense">Expense</option>
                            <option value="Incoming">Incoming</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" id="category" value={formData.category} onChange={handleChange} className={commonInputClass}>
                            {(formData.type === 'Expense' ? expenseCategories : incomingCategories).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                        <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className={commonInputClass} placeholder="e.g., 50000" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={commonInputClass} />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Involved Team Members (Optional)</label>
                    <div className="mt-1 space-y-2 border border-gray-200 rounded-md p-2 max-h-32 overflow-y-auto">
                        {taggableMembers.map(member => (
                            <div key={member.id} className="flex items-center">
                                <input
                                    id={`member-${member.id}`}
                                    name="involvedUserIds"
                                    type="checkbox"
                                    checked={involvedUserIds.includes(member.id)}
                                    onChange={() => handleInvolvedChange(member.id)}
                                    className="h-4 w-4 text-brand-blue-600 border-gray-300 rounded focus:ring-brand-blue-500"
                                />
                                <label htmlFor={`member-${member.id}`} className="ml-3 text-sm text-gray-700">{member.name} <span className="text-xs text-gray-400">({member.role})</span></label>
                            </div>
                        ))}
                         {taggableMembers.length === 0 && (
                            <p className="text-xs text-gray-500 p-2">No other team members on this project to tag.</p>
                         )}
                    </div>
                </div>
                <div>
                    <label htmlFor="externalName" className="block text-sm font-medium text-gray-700">External Person (Optional)</label>
                     <div className="mt-1 flex rounded-md shadow-sm">
                        <input 
                          type="text" 
                          name="externalName" 
                          id="externalName" 
                          value={externalNameInput}
                          onChange={(e) => setExternalNameInput(e.target.value)}
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm border-gray-300" 
                          placeholder="e.g., Tunde's Plumbing Co."
                        />
                        <button 
                           type="button"
                           onClick={handleAddExternalName}
                           className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 focus:border-brand-blue-500"
                        >
                          Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {externalNames.map((name, index) => (
                            <span key={index} className="inline-flex items-center py-1 pl-2.5 pr-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                                {name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExternalName(index)}
                                    className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
                                >
                                    <XMarkIcon className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Transaction</button>
            </div>
        </form>
    );
};