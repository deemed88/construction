
import React from 'react';
import {
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  ArchiveBoxIcon,
  FolderIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  PencilSquareIcon,
  ChartBarIcon,
  SparklesIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';

const featureList = [
  {
    category: 'Project Management',
    features: [
      {
        icon: BuildingOffice2Icon,
        title: 'Centralized Project Dashboard',
        description: 'Get a high-level overview of all your projects, their progress, health, and key metrics in one place.',
      },
      {
        icon: ClipboardDocumentListIcon,
        title: 'Kanban Task Boards',
        description: 'Organize project tasks visually with "To Do", "In Progress", and "Done" columns. Assign members, set due dates, and prioritize work.',
      },
    ],
  },
  {
    category: 'Financial Control',
    features: [
      {
        icon: CurrencyDollarIcon,
        title: 'Budget Tracking',
        description: 'Set project budgets and monitor actual spending against planned costs with clear visualizations and breakdowns.',
      },
      {
        icon: ArrowsRightLeftIcon,
        title: 'Transaction Logging',
        description: 'Record all incoming payments and outgoing expenses. Tag involved team members for complete financial transparency.',
      },
      {
        icon: DocumentDuplicateIcon,
        title: 'Invoicing',
        description: 'Create and manage client invoices directly within the project, tracking their status from pending to paid.',
      },
    ],
  },
  {
    category: 'Resource & Team Management',
    features: [
       {
        icon: ArchiveBoxIcon,
        title: 'Inventory Management',
        description: 'Track materials, quantities, suppliers, and log usage history to prevent stockouts and manage resources efficiently.',
      },
      {
        icon: UserGroupIcon,
        title: 'Team & Role Management',
        description: 'Invite members, assign roles (Admin, Manager, Team Member, Client), and control permissions for secure access.',
      },
      {
        icon: FolderIcon,
        title: 'Document Storage',
        description: 'Upload, organize, and share essential project documents like blueprints, contracts, and reports securely.',
      },
    ],
  },
  {
    category: 'Collaboration & Productivity',
    features: [
      {
        icon: PencilSquareIcon,
        title: 'Private Notepads',
        description: 'Each team member gets a private, project-specific notepad to jot down ideas, reminders, and personal to-dos.',
      },
      {
        icon: MicrophoneIcon,
        title: 'Voice-to-Text Tasks',
        description: 'Add tasks on the go by recording a voice memo. Our AI transcribes it directly into the task title and saves the audio.',
      },
    ],
  },
  {
      category: 'Analytics & Reporting',
      features: [
        {
          icon: ChartBarIcon,
          title: 'Standard Reports',
          description: 'Access pre-built reports for cost variance, task completion, and labor productivity to gain insights into project performance.',
        },
        {
          icon: SparklesIcon,
          title: 'AI-Powered Inventory Analysis',
          description: 'Leverage AI to get an intelligent summary of your inventory status, identify urgent risks, and receive actionable recommendations.',
        },
    ]
  }
];

const FeatureCard: React.FC<{ feature: { icon: React.ElementType, title: string, description: string } }> = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 hover:shadow-lg hover:border-brand-blue-300 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-brand-blue-100 text-brand-blue-600 p-3 rounded-lg">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          ConstructPro Africa Features
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A complete suite of tools designed to streamline every phase of your construction project.
        </p>
      </div>

      {featureList.map((category) => (
        <div key={category.category}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-brand-blue-200">
            {category.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.features.map(feature => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
