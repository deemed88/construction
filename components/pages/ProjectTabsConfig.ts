
import { UserRole } from '../../types';
import { 
    BuildingOffice2Icon, PresentationChartLineIcon, CalendarDaysIcon, 
    ClipboardDocumentListIcon, CurrencyDollarIcon, ArrowsRightLeftIcon, 
    ArchiveBoxIcon, FolderIcon, DocumentDuplicateIcon, UserGroupIcon, 
    PencilSquareIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';

export const ALL_PROJECT_TABS = [
    { id: 'overview', label: 'Overview', icon: BuildingOffice2Icon },
    { id: 'progress-reports', label: 'Progress Reports', icon: PresentationChartLineIcon },
    { id: 'schedule', label: 'Schedule', icon: CalendarDaysIcon },
    { id: 'tasks', label: 'Tasks', icon: ClipboardDocumentListIcon },
    { id: 'budget', label: 'Budget', icon: CurrencyDollarIcon },
    { id: 'transactions', label: 'Transactions', icon: ArrowsRightLeftIcon },
    { id: 'inventory', label: 'Inventory', icon: ArchiveBoxIcon },
    { id: 'documents', label: 'Documents', icon: FolderIcon },
    { id: 'invoices', label: 'Invoices', icon: DocumentDuplicateIcon },
    { id: 'team', label: 'Team', icon: UserGroupIcon },
    { id: 'notepad', label: 'Notepad', icon: PencilSquareIcon },
    { id: 'reports', label: 'Analytics', icon: ChartBarIcon },
];

export const getDefaultVisibleTabs = (role: UserRole): string[] => {
    const allTabIds = ALL_PROJECT_TABS.map(t => t.id);
    
    if (role === UserRole.CLIENT) {
        // Clients typically don't see internal budget details or task management chaos
        return allTabIds.filter(id => !['budget', 'transactions', 'tasks'].includes(id));
    }
    
    if (role === UserRole.TEAM_MEMBER) {
        // Team members usually don't need to see the full high-level budget
        return allTabIds.filter(id => !['budget'].includes(id));
    }

    // Admin, Company Owner, Project Manager see everything by default
    return allTabIds; 
};
