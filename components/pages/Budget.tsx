
import React from 'react';
import { PlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { BudgetChart } from '../charts/BudgetChart';
import { DashboardCard } from '../DashboardCard';
import { CurrencyDollarIcon, BanknotesIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { mockTransactions } from '../../mockData';

const categoryColors: { [key: string]: string } = {
    'Materials': 'bg-blue-100 text-blue-800',
    'Labor': 'bg-green-100 text-green-800',
    'Logistics': 'bg-yellow-100 text-yellow-800',
    'Permits': 'bg-purple-100 text-purple-800',
    'Subcontractor': 'bg-indigo-100 text-indigo-800',
    'Miscellaneous': 'bg-gray-100 text-gray-800',
}

interface BudgetProps {
  projectId: string;
}

export const Budget: React.FC<BudgetProps> = ({ projectId }) => {
  const projectExpenses = mockTransactions.filter(e => e.projectId === projectId && e.type === 'Expense');

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <DashboardCard title="Total Budget" value="₦25,000,000" icon={<CurrencyDollarIcon className="w-6 h-6" />} />
            <DashboardCard title="Total Spent" value="₦18,750,000" icon={<BanknotesIcon className="w-6 h-6" />} />
            <DashboardCard title="Remaining Budget" value="₦6,250,000" icon={<ArrowTrendingDownIcon className="w-6 h-6" />} />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown by Category</h3>
            <BudgetChart />
        </div>

        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Recent Expenses</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    <span>Export CSV</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow">
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Expense</span>
                  </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projectExpenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[expense.category]}`}>{expense.category}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₦{expense.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {expense.receiptUrl ? (
                                        <a href={expense.receiptUrl} className="text-brand-blue-600 hover:text-brand-blue-900">View</a>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};