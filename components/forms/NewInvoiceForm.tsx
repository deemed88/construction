
import React, { useState } from 'react';

interface NewInvoiceFormProps {
  onClose: () => void;
  onAddInvoice: (invoiceData: any) => void;
}

export const NewInvoiceForm: React.FC<NewInvoiceFormProps> = ({ onClose, onAddInvoice }) => {
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        clientName: '',
        amount: '',
        issueDate: '',
        dueDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddInvoice({
            ...formData,
            amount: parseFloat(formData.amount) || 0,
        });
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number</label>
                    <input type="text" name="invoiceNumber" id="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input type="text" name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                    <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Issue Date</label>
                        <input type="date" name="issueDate" id="issueDate" value={formData.issueDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={commonInputClass} />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Create Invoice</button>
            </div>
        </form>
    );
};
