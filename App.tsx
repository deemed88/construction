
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/pages/Dashboard';
import { Projects } from './components/pages/Projects';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { mockProjects, mockUsers } from './mockData';
import { Settings } from './components/pages/Settings';
import { LandingPage } from './components/pages/LandingPage';
import { User, UserRole } from './types';
import { MemberDashboard } from './components/pages/MemberDashboard';

const App: React.FC = () => {
  const [isAppEntered, setAppEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[4]); // Default to Admin
  const [activeView, setActiveView] = useState<'dashboard' | 'projects' | 'settings'>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const handleNavClick = (view: 'dashboard' | 'projects' | 'settings') => {
    setActiveView(view);
    setSelectedProjectId(null);
  };

  const handleSelectProject = (projectId: string) => {
    setActiveView('projects');
    setSelectedProjectId(projectId);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };
  
  const handleEnterApp = () => {
    setAppEntered(true);
  };

  const handleLogout = () => {
    setAppEntered(false);
  };

  const renderView = () => {
    if (selectedProjectId) {
      return <ProjectDetail projectId={selectedProjectId} onBack={handleBackToProjects} currentUser={currentUser} />;
    }
    switch (activeView) {
      case 'dashboard':
        const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];
        return privilegedRoles.includes(currentUser.role) 
            ? <Dashboard /> 
            : <MemberDashboard currentUser={currentUser} onSelectProject={handleSelectProject} />;
      case 'projects':
        return <Projects onSelectProject={handleSelectProject} currentUser={currentUser} />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };
  
  const getTitle = () => {
    if (selectedProjectId) {
      const project = mockProjects.find(p => p.id === selectedProjectId);
      return project ? project.name : 'Project Details';
    }
    const viewTitles = {
      dashboard: 'Dashboard',
      projects: 'Projects',
      settings: 'Settings',
    };
    return viewTitles[activeView];
  };

  if (!isAppEntered) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleNavClick} 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen}
        currentUser={currentUser}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'}`}>
        <Header 
          title={getTitle()} 
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          allUsers={mockUsers}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
