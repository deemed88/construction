
import React from 'react';
import {
  BuildingOffice2Icon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CalculatorIcon,
  CheckIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  ArchiveBoxIcon,
  FolderIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  SparklesIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import { pricingTiers } from '../../mockData';


interface LandingPageProps {
  onEnterApp: () => void;
}

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

const benefits = [
    "Replace WhatsApp chaos with organized project communication",
    "Track materials and costs in real-time, not in spreadsheets",
    "Give clients transparency with live progress updates",
    "Generate professional invoices and reports instantly",
    "Scale from 1 to 100 projects without changing tools",
    "Mobile-first design for site supervisors on the go",
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


export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BuildingOffice2Icon className="h-8 w-8 text-brand-blue-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800">ConstructPro Africa</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <a 
              href="#features" 
              onClick={(e) => handleScrollTo(e, 'features')}
              className="px-5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Features
            </a>
            <button
              onClick={onEnterApp}
              className="px-5 py-2 text-sm font-medium text-brand-blue-600 rounded-lg hover:bg-brand-blue-50"
            >
              Login
            </button>
             <button
              onClick={onEnterApp}
              className="px-5 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50 via-gray-50 to-transparent" />
          <div className="container mx-auto px-6 py-20 lg:py-32 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-brand-blue-100 text-brand-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <BuildingOffice2Icon className="h-4 w-4" />
                  Built for African Construction Teams
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                  Manage Construction Projects{" "}
                  <span className="text-brand-blue-600">Smarter & Faster</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Replace spreadsheets and WhatsApp with a powerful cloud platform. 
                  Track projects, budgets, materials, and teams—all in one place.
                </p>

                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-brand-blue-600">500+</p>
                    <p className="text-sm text-gray-500">Active Projects</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-brand-blue-600">50+</p>
                    <p className="text-sm text-gray-500">Companies</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-brand-blue-600">₦2B+</p>
                    <p className="text-sm text-gray-500">Managed</p>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-200 to-indigo-200 rounded-3xl blur-3xl opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Construction project management dashboard" 
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-28 bg-gray-50">
            <div className="container mx-auto px-6 space-y-10">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    A Complete Toolkit for Modern Construction
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    From initial planning to final invoicing, ConstructPro provides a full suite of tools designed to streamline every phase of your project.
                    </p>
                </div>

                {featureList.map((category) => (
                    <div key={category.category}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-brand-blue-200">
                        {category.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.features.map(feature => (
                        <FeatureCard key={feature.title} feature={feature} />
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Why Construction Firms Choose ConstructPro
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Stop losing time and money to disorganized project management. 
                  Get visibility, control, and collaboration in one platform.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-base text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200/80">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Transform Your Projects?</h3>
                <p className="text-gray-600 mb-6">
                  Join construction teams across Nigeria, Kenya, Ghana, and South Africa who are building smarter.
                </p>
                <button onClick={onEnterApp} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-blue-600 border border-transparent rounded-lg shadow-md hover:bg-brand-blue-700 transition-colors">
                  Start Your Free Trial
                  <ArrowRightIcon className="h-5 w-5"/>
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  No credit card required • Enter Demo App Instantly
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 lg:py-28 bg-brand-blue-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Transparent Pricing for Teams of All Sizes
                    </h2>
                    <p className="text-lg text-gray-600">
                        Choose a plan that scales with your business. All plans start with a 14-day free trial.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {pricingTiers.map((tier) => (
                        <div key={tier.name} className={`bg-white rounded-xl shadow-lg border ${tier.popular ? 'border-brand-blue-500 scale-105' : 'border-gray-200'} p-8 relative flex flex-col h-full`}>
                            {tier.popular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <span className="bg-brand-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-800">{tier.name}</h3>
                            <p className="text-gray-500 mt-2 flex-grow">{tier.description}</p>
                            
                            <div className="my-8">
                                <p className="text-4xl font-extrabold text-gray-900">
                                    ₦{tier.price}
                                    <span className="text-lg font-medium text-gray-500">/ project</span>
                                </p>
                            </div>
                            
                            <button 
                                onClick={onEnterApp}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${tier.popular ? 'bg-brand-blue-600 text-white hover:bg-brand-blue-700' : 'bg-brand-blue-100 text-brand-blue-700 hover:bg-brand-blue-200'}`}
                            >
                                {tier.cta}
                            </button>
                            
                            <ul className="mt-8 space-y-4 text-sm text-gray-700">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckIcon className={`h-5 w-5 mr-3 flex-shrink-0 ${tier.popular ? 'text-brand-blue-500' : 'text-green-500'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Building Better Today
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get started in minutes. No complex setup. No technical skills required.
            </p>
            <button onClick={onEnterApp} className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-brand-blue-700 bg-white border border-transparent rounded-lg shadow-md hover:bg-gray-200 transition-colors">
              Get Started Free
              <ArrowRightIcon className="h-5 w-5"/>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BuildingOffice2Icon className="h-6 w-6 text-brand-blue-600" />
              <span className="font-bold text-lg text-gray-800">ConstructPro Africa</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ConstructPro Africa. Built for African construction teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
