
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { User, UserRole } from '../../types';
import { mockProjects } from '../../mockData';
import { Modal } from '../Modal';
import { AddProjectMemberForm } from '../forms/AddProjectMemberForm';

const roleClasses: { [key in UserRole]: string } = {
    [UserRole.ADMIN]: 'bg-red-100 text-red-800',
    [UserRole.COMPANY_OWNER]: 'bg-purple-100 text-purple-800',
    [UserRole.PROJECT_MANAGER]: 'bg-blue-100 text-blue-800',
    [UserRole.TEAM_MEMBER]: 'bg-green-100 text-green-800',
    [UserRole.CLIENT]: 'bg-yellow-100 text-yellow-800',
};

interface ProjectTeamProps {
    projectId: string;
    currentUser: User;
}

export const ProjectTeam: React.FC<ProjectTeamProps> = ({ projectId, currentUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const project = mockProjects.find(p => p.id === projectId);
    const [members, setMembers] = useState<User[]>(project?.members || []);

    const handleAddMember = (memberData: any) => {
        const newUser: User = {
            id: `u${Date.now()}`,
            avatarUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/50/50`,
            ...memberData,
        };
        setMembers(prev => [...prev, newUser]);
        setIsModalOpen(false);
    };

    const handleRemoveMember = (memberIdToRemove: string) => {
        const memberToRemove = members.find(m => m.id === memberIdToRemove);
        if (!memberToRemove) return;

        if (window.confirm(`Are you sure you want to remove ${memberToRemove.name} from this project?`)) {
            setMembers(prev => prev.filter(member => member.id !== memberIdToRemove));
        }
    };

    const canManageTeam = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER].includes(currentUser.role);

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Member to Project">
                <AddProjectMemberForm onClose={() => setIsModalOpen(false)} onAddMember={handleAddMember} />
            </Modal>
            <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Project Team</h2>
                    {canManageTeam && (
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
                            >
                                <PlusIcon className="h-5 w-5" />
                                <span>Add Member</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {members.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[user.role]}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                             {canManageTeam && user.id !== currentUser.id ? (
                                                <button
                                                    onClick={() => handleRemoveMember(user.id)}
                                                    className="text-red-600 hover:text-red-800 font-semibold"
                                                >
                                                    Remove
                                                </button>
                                            ) : (
                                               <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
