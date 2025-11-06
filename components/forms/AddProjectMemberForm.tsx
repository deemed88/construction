
import React, { useState } from 'react';
import { UserRole } from '../../types';

interface AddProjectMemberFormProps {
  onClose: () => void;
  onAddMember: (memberData: any) => void;
}

export const AddProjectMemberForm: React.FC<AddProjectMemberFormProps> = ({ onClose, onAddMember }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: UserRole.TEAM_MEMBER,
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Exclude confirmPassword from the submitted data
        const { confirmPassword, ...memberData } = formData;
        onAddMember(memberData);
    };

    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange} className={commonInputClass}>
                        {Object.values(UserRole).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className={commonInputClass} minLength={8} />
                </div>
                 <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={commonInputClass} minLength={8} />
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Member</button>
            </div>
        </form>
    );
};
