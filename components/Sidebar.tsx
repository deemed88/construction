
import React, { useMemo } from 'react';
import { BuildingOffice2Icon, Cog6ToothIcon, HomeIcon, UserGroupIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { User, UserRole } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'projects' | 'settings') => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  currentUser: User;
}

const allNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, roles: Object.values(UserRole) },
  { id: 'projects', label: 'Projects', icon: BuildingOffice2Icon, roles: Object.values(UserRole) },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, roles: Object.values(UserRole) },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setOpen, currentUser }) => {
  
  const navItems = useMemo(() => {
    return allNavItems.filter(item => item.roles.includes(currentUser.role));
  }, [currentUser.role]);
  
  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveView(item.id as 'dashboard' | 'projects' | 'settings');
        }}
        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
          activeView === item.id
            ? 'bg-brand-blue-700 text-white shadow-md'
            : 'text-gray-300 hover:bg-brand-blue-800 hover:text-white'
        }`}
      >
        <item.icon className="h-6 w-6" />
        <span className={`ml-4 text-sm font-medium transition-opacity duration-300 ${!isOpen && 'opacity-0'}`}>{item.label}</span>
      </a>
    </li>
  );
  
  return (
    <>
      <div className={`fixed inset-y-0 left-0 bg-brand-blue-900 text-white flex flex-col z-30 transition-all duration-300 ${isOpen ? 'w-64' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'}`}>
        <div className={`flex items-center h-20 border-b border-brand-blue-800 transition-all duration-300 ${isOpen ? 'justify-between px-6' : 'justify-center px-2'}`}>
          <div className={`flex items-center ${!isOpen ? 'md:hidden' : ''}`}>
            <BuildingOffice2Icon className="h-8 w-8 text-brand-blue-300" />
            <span className={`ml-3 text-xl font-bold transition-opacity duration-300 ${!isOpen && 'opacity-0'}`}>Constructor</span>
          </div>
          
          <button onClick={() => setOpen(false)} className={`text-gray-300 hover:text-white md:hidden ${!isOpen ? 'hidden' : ''}`}>
            <XMarkIcon className="h-6 w-6" />
          </button>

          <button 
            onClick={() => setOpen(true)} 
            className={`hidden md:block text-gray-300 hover:text-white ${isOpen ? 'hidden' : ''}`}
            aria-label="Open sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <ul>
            {navItems.map((item) => <NavLink key={item.id} item={item} />)}
          </ul>
        </nav>

        <div className="px-4 py-6 border-t border-brand-blue-800">
          <div className={`flex items-center p-3 rounded-lg`}>
            <img src={currentUser.avatarUrl} alt="User" className="h-10 w-10 rounded-full" />
            <div className={`ml-4 transition-opacity duration-300 ${!isOpen && 'opacity-0'}`}>
              <p className="text-sm font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 z-20 md:hidden"></div>}
    </>
  );
};
