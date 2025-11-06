import React, { useState, useMemo } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { Transaction, User, UserRole } from '../../types';
import { mockTransactions, mockProjects, mockUsers } from '../../mockData';
import { Modal } from '../Modal';
import { NewTransactionForm } from '../forms/NewTransactionForm';
import { DashboardCard } from '../DashboardCard';

interface TransactionsProps {
  projectId: string;
  currentUser: User;
}

const categoryColors: { [key: string]: string } = {
    'Materials': 'bg-blue-100 text-blue-800',
    'Labor': 'bg-green-100 text-green-800',
    'Logistics': 'bg-yellow-100 text-yellow-800',
    'Permits': 'bg-purple-100 text-purple-800',
    'Subcontractor': 'bg-indigo-100 text-indigo-800',
    'Miscellaneous': 'bg-gray-100 text-gray-800',
    'Client Payment': 'bg-emerald-100 text-emerald-800',
}

export const Transactions: React.FC<TransactionsProps> = ({ projectId, currentUser }) => {
  const project = mockProjects.find(p => p.id === projectId);
  const [allProjectTransactions, setAllProjectTransactions] = useState<Transaction[]>(
    mockTransactions.filter(t => t.projectId === projectId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleTransactions = useMemo(() => {
    const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];
    
    let filtered;
    if (privilegedRoles.includes(currentUser.role)) {
        filtered = allProjectTransactions;
    } else if (currentUser.role === UserRole.TEAM_MEMBER) {
        filtered = allProjectTransactions.filter(t => 
            t.recordedById === currentUser.id || 
            t.involvedUserIds?.includes(currentUser.id)
        );
    } else {
        filtered = [];
    }
    return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allProjectTransactions, currentUser]);

  const { totalIncoming, totalExpenses, netBalance } = useMemo(() => {
    let incoming = 0;
    let expenses = 0;
    visibleTransactions.forEach(t => {
      if (t.type === 'Incoming') {
        incoming += t.amount;
      } else {
        expenses += t.amount;
      }
    });
    return {
      totalIncoming: incoming,
      totalExpenses: expenses,
      netBalance: incoming - expenses,
    };
  }, [visibleTransactions]);

  const handleAddTransaction = (transactionData: any) => {
    const newTransaction: Transaction = {
        id: `tr${Date.now()}`,
        projectId,
        recordedById: currentUser.id,
        ...transactionData,
    };
    mockTransactions.push(newTransaction);
    setAllProjectTransactions(prev => [...prev, newTransaction]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Transaction">
        <NewTransactionForm 
            onClose={() => setIsModalOpen(false)} 
            onAddTransaction={handleAddTransaction}
            projectMembers={project?.members || []}
        />
      </Modal>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <DashboardCard title="Total Incoming" value={`₦${totalIncoming.toLocaleString()}`} icon={<ArrowUpCircleIcon className="w-6 h-6" />} />
            <DashboardCard title="Total Expenses" value={`₦${totalExpenses.toLocaleString()}`} icon={<ArrowDownCircleIcon className="w-6 h-6" />} />
            <DashboardCard title="Net Balance" value={`₦${netBalance.toLocaleString()}`} icon={<ScaleIcon className="w-6 h-6" />} />
        </div>

        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentUser.role === UserRole.TEAM_MEMBER ? 'My Transactions' : 'All Transactions'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Transaction</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Involved</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {visibleTransactions.map((transaction) => {
                            const involvedUsers = transaction.involvedUserIds?.map(id => mockUsers.find(u => u.id === id)).filter((u): u is User => !!u) || [];
                            const externalPeople = transaction.externalInvolved || [];
                            const totalInvolved = involvedUsers.length + externalPeople.length;

                            return (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {totalInvolved > 0 ? (
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {involvedUsers.map(user => (
                                                    <span key={user.id} className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                                                        <img src={user.avatarUrl} alt={user.name} className="w-4 h-4 rounded-full mr-1.5" />
                                                        {user.name.split(' ')[0]}
                                                    </span>
                                                ))}
                                                {externalPeople.map((name, index) => (
                                                    <span key={`ext-${index}`} className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[transaction.category] || 'bg-gray-100 text-gray-800'}`}>{transaction.category}</span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${transaction.type === 'Incoming' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'Incoming' ? '+' : '-'} ₦{transaction.amount.toLocaleString()}
                                    </td>
                                </tr>
                            )
                        })}
                         {visibleTransactions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                   {currentUser.role === UserRole.TEAM_MEMBER 
                                     ? "You have not recorded or been involved in any transactions for this project yet."
                                     : "No transactions recorded for this project yet."
                                   }
                                </td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  );
};