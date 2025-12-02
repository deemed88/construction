
export enum UserRole {
  ADMIN = 'Admin',
  COMPANY_OWNER = 'Company Owner',
  PROJECT_MANAGER = 'Project Manager',
  TEAM_MEMBER = 'Team Member',
  CLIENT = 'Client',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export interface Project {
  id:string;
  name: string;
  location: string;
  startDate: string;
  dueDate: string;
  budget: number;
  actualCost: number;
  status: 'On Track' | 'Delayed' | 'Completed' | 'Planning';
  progress: number;
  members: User[];
  clientId?: string;
  memberPermissions?: Record<string, string[]>; // userId -> array of allowed tab IDs
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee?: User;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  audioMemoUrl?: string;
}

export interface Expense {
  id: string;
  projectId: string;
  item: string;
  category: 'Labor' | 'Materials' | 'Logistics' | 'Permits';
  cost: number;
  date: string;
  receiptUrl?: string;
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: 'Blueprint' | 'Contract' | 'Invoice' | 'Report';
  version: string;
  uploadDate: string;
  url: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  issueDate: string;
  dueDate: string;
  recipientId?: string;
}

export interface Agreement {
  id: string;
  projectId: string;
  title: string;
  status: 'Draft' | 'Active' | 'Terminated';
  clientSigneeId: string;
  url: string;
  lastUpdated: string;
}

export interface Material {
  id: string;
  projectId: string;
  name: string;
  quantity: number;
  unit: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  supplyDate: string;
  invoiceNumber: string;
  usageHistory: {
    date: string;
    quantityUsed: number;
    notes?: string;
  }[];
  visibleTo?: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  creatorId: string;
}

export type TransactionType = 'Incoming' | 'Expense';

export type TransactionCategory = 'Client Payment' | 'Labor' | 'Materials' | 'Logistics' | 'Permits' | 'Subcontractor' | 'Miscellaneous';

export interface Transaction {
  id: string;
  projectId: string;
  date: string;
  description: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  receiptUrl?: string;
  recordedById?: string;
  involvedUserIds?: string[];
  externalInvolved?: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface SchedulePhase {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  progress: number;
}

export interface ProgressReport {
  id: string;
  projectId: string;
  title: string;
  date: string;
  authorId: string;
  content: string;
  percentageComplete: number;
  photos?: string[];
}