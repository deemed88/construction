import React, { useState, useMemo } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { Project, User, UserRole, PricingTier } from '../../types';
import { mockProjects } from '../../mockData';
import { Modal } from '../Modal';
import { NewProjectForm } from '../forms/NewProjectForm';
import { PricingPlanForm } from '../forms/PricingPlanForm';

interface ProjectsProps {
    onSelectProject: (projectId: string) => void;
    currentUser: User;
}

const ProjectCard: React.FC<{ project: Project; onSelectProject: (projectId: string) => void; }> = ({ project, onSelectProject }) => {
  const statusClasses = {
    'On Track': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Planning': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[project.status]}`}>{project.status}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{project.location}</p>
        
        <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-sm font-bold text-brand-blue-700">{project.progress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="text-gray-500">Budget</p>
                <p className="font-semibold">₦{project.budget.toLocaleString()}</p>
            </div>
             <div>
                <p className="text-gray-500">Due Date</p>
                <p className="font-semibold">{project.dueDate}</p>
            </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
                {project.members.slice(0, 4).map(member => (
                    <img key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={member.avatarUrl} alt={member.name} title={member.name} />
                ))}
                {project.members.length > 4 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white text-xs font-medium text-gray-600">
                        +{project.members.length - 4}
                    </div>
                )}
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectProject(project.id); }} className="text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">View Details</a>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, currentUser }) => {
  const [modalState, setModalState] = useState<'closed' | 'pricing' | 'form'>('closed');
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);

  const visibleProjects = useMemo(() => {
    const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];
    if (privilegedRoles.includes(currentUser.role)) {
      return mockProjects;
    }
    if (currentUser.role === UserRole.CLIENT) {
      return mockProjects.filter(p => p.clientId === currentUser.id);
    }
    return mockProjects.filter(p => p.members.some(member => member.id === currentUser.id));
  }, [currentUser]);

  const handleSelectPlan = (plan: PricingTier) => {
    setSelectedPlan(plan);
    setModalState('form');
  };

  const handleAddProject = (projectData: any) => {
    console.log("New Project Data:", projectData, "with plan:", selectedPlan?.name);
    // Here you would typically handle the form submission, e.g., by calling an API.
    setModalState('closed'); // Close modal on submission
  };
  
  const handleCloseModal = () => {
    setModalState('closed');
    setSelectedPlan(null);
  }

  const canCreateProject = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER].includes(currentUser.role);

  return (
    <>
      {modalState === 'pricing' && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Choose a Project Plan">
          <PricingPlanForm onSelectPlan={handleSelectPlan} />
        </Modal>
      )}
      {modalState === 'form' && (
        <Modal isOpen={true} onClose={handleCloseModal} title={`Create New Project (${selectedPlan?.name})`}>
          <NewProjectForm onClose={handleCloseModal} onAddProject={handleAddProject} />
        </Modal>
      )}

      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            {currentUser.role === UserRole.CLIENT || currentUser.role === UserRole.TEAM_MEMBER ? 'My Projects' : 'All Projects'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FunnelIcon className="h-5 w-5" />
              <span>Filter</span>
            </button>
            {canCreateProject && (
              <button
                onClick={() => setModalState('pricing')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Project</span>
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map(project => (
            <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
          ))}
           {visibleProjects.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">No projects to display.</h3>
                <p className="text-gray-500 mt-2">You are not currently assigned to any projects.</p>
            </div>
           )}
        </div>
      </div>
    </>
  );
};