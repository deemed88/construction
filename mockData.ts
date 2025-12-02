

import { Project, User, UserRole, Task, Expense, Document, Invoice, Agreement, Material, Note, Transaction, PricingTier, SchedulePhase, ProgressReport } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Adebayo Adekunle', email: 'adebayo.adekunle@constructor.com', avatarUrl: 'https://picsum.photos/id/10/50/50', role: UserRole.PROJECT_MANAGER },
  { id: 'u2', name: 'Chinwe Okoro', email: 'chinwe.okoro@constructor.com', avatarUrl: 'https://picsum.photos/id/11/50/50', role: UserRole.COMPANY_OWNER },
  { id: 'u3', name: 'Kwame Mensah', email: 'kwame.mensah@constructor.com', avatarUrl: 'https://picsum.photos/id/12/50/50', role: UserRole.CLIENT },
  { id: 'u4', name: 'Fatima Aliyu', email: 'fatima.aliyu@constructor.com', avatarUrl: 'https://picsum.photos/id/13/50/50', role: UserRole.PROJECT_MANAGER },
  { id: 'u5', name: 'Jide Sowore', email: 'jide.sowore@constructor.com', avatarUrl: 'https://picsum.photos/id/14/50/50', role: UserRole.ADMIN },
  { id: 'u6', name: 'Efe Abiola', email: 'efe.abiola@constructor.com', avatarUrl: 'https://picsum.photos/id/15/50/50', role: UserRole.TEAM_MEMBER },
  { id: 'u7', name: 'Ngozi Eze', email: 'ngozi.eze@client.com', avatarUrl: 'https://picsum.photos/id/16/50/50', role: UserRole.CLIENT },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Lekki Luxury Apartments',
    location: 'Lagos, Nigeria',
    startDate: '2024-03-01',
    dueDate: '2025-06-30',
    budget: 50000000,
    actualCost: 35000000,
    status: 'On Track',
    progress: 65,
    members: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3], mockUsers[4], mockUsers[5]],
    clientId: 'u7',
  },
  {
    id: 'p2',
    name: 'Accra Office Complex',
    location: 'Accra, Ghana',
    startDate: '2024-05-15',
    dueDate: '2025-02-28',
    budget: 35000000,
    actualCost: 20000000,
    status: 'On Track',
    progress: 45,
    members: [mockUsers[1], mockUsers[3]],
  },
  {
    id: 'p3',
    name: 'Nairobi Tech Hub',
    location: 'Nairobi, Kenya',
    startDate: '2024-02-01',
    dueDate: '2024-12-31',
    budget: 20000000,
    actualCost: 22500000,
    status: 'Delayed',
    progress: 80,
    members: [mockUsers[0], mockUsers[2], mockUsers[4], mockUsers[5]],
  },
  {
    id: 'p4',
    name: 'Residential Estate Phase 2',
    location: 'Abuja, Nigeria',
    startDate: '2023-11-01',
    dueDate: '2024-09-30',
    budget: 45000000,
    actualCost: 44000000,
    status: 'Completed',
    progress: 100,
    members: [mockUsers[0], mockUsers[1], mockUsers[4]],
  },
  {
    id: 'p5',
    name: 'Cape Town Waterfront Hotel',
    location: 'Cape Town, SA',
    startDate: '2024-08-01',
    dueDate: '2026-01-31',
    budget: 80000000,
    actualCost: 5000000,
    status: 'Planning',
    progress: 10,
    members: [mockUsers[1], mockUsers[2], mockUsers[3]],
  },
   {
    id: 'p6',
    name: 'Ikeja Shopping Mall Extension',
    location: 'Lagos, Nigeria',
    startDate: '2024-06-01',
    dueDate: '2025-03-31',
    budget: 60000000,
    actualCost: 15000000,
    status: 'On Track',
    progress: 25,
    members: [mockUsers[0], mockUsers[2], mockUsers[3], mockUsers[4]],
  },
];

export const mockTasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Design initial blueprints', status: 'Done', assignee: mockUsers[0], dueDate: '2024-07-20', priority: 'High' },
  { id: 't2', projectId: 'p1', title: 'Secure construction permits', status: 'In Progress', assignee: mockUsers[1], dueDate: '2024-08-05', priority: 'High' },
  { id: 't3', projectId: 'p1', title: 'Hire plumbing subcontractor', status: 'To Do', dueDate: '2024-08-15', priority: 'Medium' },
  { id: 't8', projectId: 'p1', title: 'Conduct site safety audit', status: 'To Do', assignee: mockUsers[5], dueDate: '2024-08-25', priority: 'Medium' },
  { id: 't4', projectId: 'p2', title: 'Order foundation materials', status: 'In Progress', assignee: mockUsers[4], dueDate: '2024-08-10', priority: 'Medium' },
  { id: 't5', projectId: 'p2', title: 'Prepare site for excavation', status: 'To Do', dueDate: '2024-08-12', priority: 'High' },
  { id: 't6', projectId: 'p3', title: 'Finalize electrical plan', status: 'To Do', assignee: mockUsers[0], dueDate: '2024-08-20', priority: 'Low' },
  { id: 't9', projectId: 'p3', title: 'Install HVAC ducting', status: 'In Progress', assignee: mockUsers[5], dueDate: '2024-08-30', priority: 'High' },
  { id: 't7', projectId: 'p4', title: 'Complete client brief', status: 'Done', dueDate: '2024-07-15', priority: 'Medium' },
];

export const mockExpenses: Expense[] = [
  { id: 'e1', projectId: 'p1', item: 'Cement Bags (500)', category: 'Materials', cost: 250000, date: '2024-08-01', receiptUrl: '#' },
  { id: 'e2', projectId: 'p1', item: 'Foundation Labor', category: 'Labor', cost: 150000, date: '2024-08-02' },
  { id: 'e3', projectId: 'p2', item: 'Excavator Rental', category: 'Logistics', cost: 80000, date: '2024-08-02', receiptUrl: '#' },
  { id: 'e4', projectId: 'p3', item: 'Steel Rebar (2 tons)', category: 'Materials', cost: 450000, date: '2024-08-03' },
  { id: 'e5', projectId: 'p3', item: 'City Building Permit', category: 'Permits', cost: 50000, date: '2024-08-04', receiptUrl: '#' },
];

export const mockDocuments: Document[] = [
  { id: 'd1', projectId: 'p1', name: 'Main_Building_Blueprint.pdf', type: 'Blueprint', version: 'v2.1', uploadDate: '2024-07-28', url: '#' },
  { id: 'd2', projectId: 'p1', name: 'Client_Contract_Signed.pdf', type: 'Contract', version: 'v1.0', uploadDate: '2024-07-15', url: '#' },
  { id: 'd3', projectId: 'p2', name: 'Electrical_Wiring_Plan.dwg', type: 'Blueprint', version: 'v1.3', uploadDate: '2024-07-29', url: '#' },
  { id: 'd4', projectId: 'p2', name: 'July_Progress_Report.docx', type: 'Report', version: 'v1.0', uploadDate: '2024-08-01', url: '#' },
  { id: 'd5', projectId: 'p4', name: 'Final_Invoice_INV-001.pdf', type: 'Invoice', version: 'v1.0', uploadDate: '2024-07-20', url: '#' },
];

export const mockInvoices: Invoice[] = [
  { id: 'inv1', projectId: 'p1', invoiceNumber: 'INV-001', clientName: 'Urban Developers Ltd.', amount: 1250000, status: 'Paid', issueDate: '2024-07-15', dueDate: '2024-07-30' },
  { id: 'inv2', projectId: 'p2', invoiceNumber: 'INV-002', clientName: 'Coastal Properties', amount: 3500000, status: 'Pending', issueDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 'inv3', projectId: 'p3', invoiceNumber: 'INV-003', clientName: 'GreenScape Homes', amount: 850000, status: 'Paid', issueDate: '2024-07-20', dueDate: '2024-08-05' },
  { id: 'inv4', projectId: 'p1', invoiceNumber: 'INV-004', clientName: 'Urban Developers Ltd.', amount: 2100000, status: 'Overdue', issueDate: '2024-07-10', dueDate: '2024-07-25', recipientId: 'u7' },
];

export const mockAgreements: Agreement[] = [
    { id: 'a1', projectId: 'p1', title: 'Main Construction Contract', status: 'Active', clientSigneeId: 'u7', url: '#', lastUpdated: '2024-03-01' },
    { id: 'a2', projectId: 'p1', title: 'Non-Disclosure Agreement', status: 'Active', clientSigneeId: 'u7', url: '#', lastUpdated: '2024-02-25' },
    { id: 'a3', projectId: 'p3', title: 'Sub-contractor Agreement', status: 'Draft', clientSigneeId: 'u3', url: '#', lastUpdated: '2024-08-05' },
];

export const mockMaterials: Material[] = [
  { 
    id: 'm1', 
    projectId: 'p1', 
    name: 'Cement (Dangote)', 
    quantity: 180, 
    unit: 'bags', 
    supplier: 'Dangote Cement Plc', 
    status: 'In Stock',
    supplyDate: '2024-08-01',
    invoiceNumber: 'INV-CM-08-001',
    usageHistory: [
      { date: '2024-08-03', quantityUsed: 10, notes: 'Foundation pouring' },
      { date: '2024-08-04', quantityUsed: 10, notes: 'Foundation pouring' }
    ],
    visibleTo: ['u1', 'u6'],
  },
  { 
    id: 'm2', 
    projectId: 'p1', 
    name: 'Sand', 
    quantity: 15, 
    unit: 'tons', 
    supplier: 'Local Suppliers Inc.', 
    status: 'Low Stock',
    supplyDate: '2024-08-02',
    invoiceNumber: 'INV-SD-08-005',
    usageHistory: [],
  },
  { 
    id: 'm3', 
    projectId: 'p1', 
    name: '12mm Rebar', 
    quantity: 500, 
    unit: 'lengths', 
    supplier: 'Iron & Steel Co.', 
    status: 'In Stock',
    supplyDate: '2024-07-28',
    invoiceNumber: 'INV-RB-07-113',
    usageHistory: [],
    visibleTo: ['u6'],
  },
  { 
    id: 'm4', 
    projectId: 'p2', 
    name: 'Glass Panels', 
    quantity: 0, 
    unit: 'units', 
    supplier: 'GlassWorld', 
    status: 'Out of Stock',
    supplyDate: '2024-07-20',
    invoiceNumber: 'INV-GL-07-041',
    usageHistory: [],
  },
  { 
    id: 'm5', 
    projectId: 'p2', 
    name: 'Aluminum Framing', 
    quantity: 250, 
    unit: 'meters', 
    supplier: 'AluMetals Ltd.', 
    status: 'In Stock',
    supplyDate: '2024-08-01',
    invoiceNumber: 'INV-AL-08-002',
    usageHistory: [],
  },
  { 
    id: 'm6', 
    projectId: 'p3', 
    name: 'CAT-6 Ethernet Cable', 
    quantity: 420, 
    unit: 'meters', 
    supplier: 'TechCabling Solutions', 
    status: 'Low Stock',
    supplyDate: '2024-07-15',
    invoiceNumber: 'INV-ET-07-098',
    usageHistory: [
      { date: '2024-08-01', quantityUsed: 80, notes: 'Wiring for 1st floor' }
    ],
    visibleTo: ['u6'],
  },
];

export const mockNotes: Record<string, Note[]> = {
  'p1': [
    { 
      id: 'n1p1', 
      title: 'Supplier Follow-up', 
      content: 'Need to confirm the new supplier for the glass panels. The previous quote from GlassWorld was too high. Get two alternative quotes by EOW.', 
      lastUpdated: '2024-08-05T10:00:00Z',
      creatorId: 'u1',
    },
    { 
      id: 'n2p1', 
      title: 'Structural Engineer Notes', 
      content: 'Follow up with the structural engineer about the revised drawings for the rooftop terrace. Client wants to see them before the meeting on the 15th.', 
      lastUpdated: '2024-08-04T11:25:00Z',
      creatorId: 'u4',
    },
    { 
      id: 'n3p1', 
      title: 'My Private Note', 
      content: 'This note is only for me, Efe Abiola.', 
      lastUpdated: '2024-08-06T09:00:00Z',
      creatorId: 'u6',
    }
  ],
  'p2': [
    { 
      id: 'n1p2', 
      title: 'Client Meeting Prep', 
      content: 'Client meeting scheduled for next week to discuss phase 2.\n\n- Prepare presentation slides on progress.\n- Finalize budget variance report.\n- Get updated timeline from the site supervisor.', 
      lastUpdated: '2024-08-04T14:30:00Z',
      creatorId: 'u1'
    }
  ],
};

export const mockTransactions: Transaction[] = [
  // Project p1
  { id: 'tr1', projectId: 'p1', date: '2024-07-15', description: 'Initial client payment', type: 'Incoming', category: 'Client Payment', amount: 12500000, recordedById: 'u1' },
  { id: 'tr2', projectId: 'p1', date: '2024-08-01', description: 'Cement Bags (500)', type: 'Expense', category: 'Materials', amount: 250000, receiptUrl: '#', recordedById: 'u6' },
  { id: 'tr3', projectId: 'p1', date: '2024-08-02', description: 'Foundation Labor Payment', type: 'Expense', category: 'Labor', amount: 150000, recordedById: 'u1', involvedUserIds: ['u6'] },
  { id: 'tr4', projectId: 'p1', date: '2024-08-05', description: 'Payment to Plumbing Subcontractor', type: 'Expense', category: 'Subcontractor', amount: 750000, recordedById: 'u1', externalInvolved: ['Tunde\'s Plumbing Co.'] },

  // Project p2
  { id: 'tr5', projectId: 'p2', date: '2024-08-01', description: 'Milestone 1 Payment', type: 'Incoming', category: 'Client Payment', amount: 3500000, recordedById: 'u4' },
  { id: 'tr6', projectId: 'p2', date: '2024-08-02', description: 'Excavator Rental', type: 'Expense', category: 'Logistics', amount: 80000, receiptUrl: '#', recordedById: 'u4' },

  // Project p3
  { id: 'tr7', projectId: 'p3', date: '2024-08-03', description: 'Steel Rebar (2 tons)', type: 'Expense', category: 'Materials', amount: 450000, recordedById: 'u6' },
  { id: 'tr8', projectId: 'p3', date: '2024-08-04', description: 'City Building Permit', type: 'Expense', category: 'Permits', amount: 50000, receiptUrl: '#', recordedById: 'u1', involvedUserIds: ['u6'] },
  { id: 'tr9', projectId: 'p3', date: '2024-08-06', description: 'Milestone 3 Payment', type: 'Incoming', category: 'Client Payment', amount: 2000000, recordedById: 'u1' },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Small / Mini Project',
    price: '15,000',
    description: 'Ideal for small-scale projects with a compact team.',
    features: [
      '1 Project',
      'Up to 15 Team Members',
      'Core Project Management',
      'Inventory Management',
      '5GB Document Storage',
      'Standard Reporting',
    ],
    cta: 'Choose Plan',
    popular: false
  },
  {
    name: 'Medium Project',
    price: '30,000',
    description: 'Perfect for standard projects requiring a larger team.',
    features: [
      '1 Project',
      'Up to 30 Team Members',
      'Core Project Management',
      'Inventory Management',
      '10GB Document Storage',
      'Standard Reporting',
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Big Project',
    price: '50,000',
    description: 'For large-scale projects with extensive teams and requirements.',
    features: [
      '1 Project',
      '30+ Team Members',
      'Core Project Management',
      'Inventory Management',
      '20GB Document Storage',
      'Standard Reporting',
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export const mockSchedules: SchedulePhase[] = [
  // Project 1: Lekki Luxury Apartments
  { id: 's1', projectId: 'p1', name: 'Site Clearing & Preparation', startDate: '2024-03-01', endDate: '2024-03-15', status: 'Completed', progress: 100 },
  { id: 's2', projectId: 'p1', name: 'Foundation Work', startDate: '2024-03-16', endDate: '2024-04-30', status: 'Completed', progress: 100 },
  { id: 's3', projectId: 'p1', name: 'Structural Framework - Ground Floor', startDate: '2024-05-01', endDate: '2024-06-15', status: 'Completed', progress: 100 },
  { id: 's4', projectId: 'p1', name: 'Structural Framework - 1st Floor', startDate: '2024-06-16', endDate: '2024-08-15', status: 'In Progress', progress: 60 },
  { id: 's5', projectId: 'p1', name: 'Roofing & Exterior', startDate: '2024-08-16', endDate: '2024-10-30', status: 'Not Started', progress: 0 },
  { id: 's6', projectId: 'p1', name: 'Internal Finishing', startDate: '2024-11-01', endDate: '2025-04-30', status: 'Not Started', progress: 0 },
  { id: 's7', projectId: 'p1', name: 'Final Inspection & Handover', startDate: '2025-05-01', endDate: '2025-06-30', status: 'Not Started', progress: 0 },

  // Project 3: Nairobi Tech Hub (Delayed)
  { id: 's8', projectId: 'p3', name: 'Site Survey & Planning', startDate: '2024-02-01', endDate: '2024-02-28', status: 'Completed', progress: 100 },
  { id: 's9', projectId: 'p3', name: 'Foundation & Basement', startDate: '2024-03-01', endDate: '2024-05-15', status: 'Completed', progress: 100 },
  { id: 's10', projectId: 'p3', name: 'Steel Structure Erection', startDate: '2024-05-16', endDate: '2024-07-31', status: 'Delayed', progress: 70 },
  { id: 's11', projectId: 'p3', name: 'HVAC & Electrical Installation', startDate: '2024-08-01', endDate: '2024-10-31', status: 'In Progress', progress: 10 },
];

export const mockProgressReports: ProgressReport[] = [
  {
    id: 'pr1',
    projectId: 'p1',
    title: 'Weekly Site Update - Foundation Phase',
    date: '2024-04-10',
    authorId: 'u1',
    content: 'Foundation pouring is 80% complete. Weather has been favorable. Material delivery for next week confirmed.',
    percentageComplete: 65,
    photos: ['https://picsum.photos/id/1/200/150', 'https://picsum.photos/id/2/200/150']
  },
  {
    id: 'pr2',
    projectId: 'p1',
    title: 'Monthly Progress Meeting Summary',
    date: '2024-05-01',
    authorId: 'u4',
    content: 'Meeting with the client went well. Approved the new structural changes for the ground floor. Delays in steel delivery might impact the timeline by 2 days.',
    percentageComplete: 70,
  }
];