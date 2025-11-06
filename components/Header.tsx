
import React from 'react';
import { BellIcon, MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { User, UserRole } from '../types';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  allUsers: User[];
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick, currentUser, setCurrentUser, allUsers }) => {
  
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = allUsers.find(u => u.id === event.target.value);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <header className="bg-white shadow-sm h-20 flex-shrink-0">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-w-0">
            <button onClick={onMenuClick} className="text-gray-500 mr-4 focus:outline-none">
              <Bars3Icon className="h-6 w-6"/>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 truncate">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
            />
          </div>
          
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center">
            <img src={currentUser.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full" />
            <div className="ml-3 hidden sm:block">
               <div className="relative">
                  <select 
                    onChange={handleUserChange} 
                    value={currentUser.id}
                    className="text-sm font-semibold text-gray-900 pr-8 appearance-none bg-transparent border-none focus:ring-0 cursor-pointer"
                  >
                   {allUsers.map(user => (
                     <option key={user.id} value={user.id}>{user.name}</option>
                   ))}
                  </select>
                   <ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
               </div>
              <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
