import React, { useState, Fragment, useMemo, useEffect } from 'react';
import { PlusIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { mockMaterials, mockProjects } from '../../mockData';
import { Modal } from '../Modal';
import { NewMaterialForm } from '../forms/NewMaterialForm';
import { LogUsageForm } from '../forms/LogUsageForm';
import { Material, User, UserRole } from '../../types';
import { GoogleGenAI } from '@google/genai';

const statusClasses = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Out of Stock': 'bg-red-100 text-red-800',
};

interface InventoryProps {
  projectId: string;
  currentUser: User;
}

export const Inventory: React.FC<InventoryProps> = ({ projectId, currentUser }) => {
  const project = mockProjects.find(p => p.id === projectId);
  
  const visibleMaterials = useMemo(() => {
    const initialMaterials = mockMaterials.filter(m => m.projectId === projectId);
    const privilegedRoles = [UserRole.ADMIN, UserRole.COMPANY_OWNER, UserRole.PROJECT_MANAGER];
    if (privilegedRoles.includes(currentUser.role)) {
        return initialMaterials;
    }
    // Team members only see materials they are tagged in.
    return initialMaterials.filter(m => m.visibleTo && m.visibleTo.includes(currentUser.id));
  }, [projectId, currentUser]);

  const [materials, setMaterials] = useState<Material[]>(visibleMaterials);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLogUsageModalOpen, setLogUsageModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [expandedMaterialId, setExpandedMaterialId] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMaterials(visibleMaterials);
  }, [visibleMaterials]);

  const handleAddMaterial = (materialData: any) => {
    const newMaterial: Material = {
        id: `m${Date.now()}`,
        projectId,
        ...materialData,
        status: materialData.quantity > 0 ? 'In Stock' : 'Out of Stock',
    };
    // Update mock data source to simulate persistence
    mockMaterials.push(newMaterial);
    // Update local state to reflect the change immediately
    setMaterials(prev => [...prev, newMaterial]);
    setAddModalOpen(false);
  };
  
  const handleOpenLogUsage = (material: Material) => {
    setSelectedMaterial(material);
    setLogUsageModalOpen(true);
  };

  const handleLogUsage = (usageData: { quantityUsed: number, date: string, notes: string }) => {
    if (!selectedMaterial) return;

    setMaterials(prevMaterials => prevMaterials.map(mat => {
        if (mat.id === selectedMaterial.id) {
            const newQuantity = mat.quantity - usageData.quantityUsed;
            let newStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
            if (newQuantity <= 0) {
                newStatus = 'Out of Stock';
            } else if (newQuantity < 20) { // Arbitrary low stock threshold
                newStatus = 'Low Stock';
            }
            return {
                ...mat,
                quantity: newQuantity,
                status: newStatus,
                usageHistory: [...mat.usageHistory, { ...usageData }],
            };
        }
        return mat;
    }));

    setLogUsageModalOpen(false);
    setSelectedMaterial(null);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError('');
    setAiReport('');

    if (!process.env.API_KEY) {
      setError("API key is not configured. Please set the API_KEY environment variable in your Netlify deployment settings.");
      setIsGenerating(false);
      return;
    }
      
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const today = new Date().toISOString().split('T')[0];
      const prompt = `
        You are an expert construction project inventory manager for a project in Africa.
        Analyze the following material inventory data for the project named "${project?.name}".
        Today's date is ${today}.

        Your analysis should be concise, professional, and easy to read. Provide:
        1.  **Overall Summary:** A brief overview of the inventory status.
        2.  **Urgent Risks:** Highlight any materials that are "Out of Stock" or "Low Stock" and explain the potential impact on the project schedule.
        3.  **Actionable Recommendations:** Suggest specific actions, such as which materials to re-order immediately and any items to monitor closely based on recent usage.
        4.  Format the response using markdown for clear headings and lists.

        Here is the inventory data in JSON format:
        ${JSON.stringify(materials, null, 2)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAiReport(response.text);
    } catch (err) {
      console.error("Gemini API error:", err);
      setError("Failed to generate report. Please check the API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Material">
          <NewMaterialForm 
            onClose={() => setAddModalOpen(false)} 
            onAddMaterial={handleAddMaterial}
            projectMembers={project?.members || []}
          />
      </Modal>
      {selectedMaterial && (
        <Modal isOpen={isLogUsageModalOpen} onClose={() => setLogUsageModalOpen(false)} title={`Log Usage for ${selectedMaterial.name}`}>
            <LogUsageForm material={selectedMaterial} onClose={() => setLogUsageModalOpen(false)} onLogUsage={handleLogUsage} />
        </Modal>
      )}
      <div>
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-brand-blue-100">
            <div className="flex justify-between items-start">
              <div>
                 <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <SparklesIcon className="h-6 w-6 text-brand-blue-500 mr-2" />
                    AI Inventory Analysis
                 </h3>
                 <p className="text-sm text-gray-500 mt-1">Get an intelligent summary of your stock levels and risks.</p>
              </div>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow disabled:bg-brand-blue-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : <SparklesIcon className="h-5 w-5" />}
                <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
              </button>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border min-h-[100px]">
              {isGenerating && <p className="text-gray-600 animate-pulse">Analyzing inventory data...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {aiReport && (
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiReport.replace(/\n/g, '<br />') }} />
              )}
              {!aiReport && !isGenerating && !error && <p className="text-gray-500">Your AI-generated report will appear here.</p>}
            </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Material Inventory</h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Material</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-8"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {materials.length === 0 && (
                    <tr>
                        <td colSpan={6} className="text-center py-10 text-gray-500">
                           No materials are visible to you in this project's inventory.
                        </td>
                    </tr>
                )}
                {materials.map((material) => (
                  <Fragment key={material.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedMaterialId(expandedMaterialId === material.id ? null : material.id)}>
                      <td className="pl-4">
                         {expandedMaterialId === material.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{material.quantity} {material.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[material.status]}`}>
                          {material.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <button onClick={(e) => { e.stopPropagation(); handleOpenLogUsage(material); }} className="text-brand-blue-600 hover:text-brand-blue-800">Log Usage</button>
                      </td>
                    </tr>
                    {expandedMaterialId === material.id && (
                       <tr className="bg-gray-50">
                          <td colSpan={6} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="text-sm font-bold text-gray-700 mb-2">Supply Details</h4>
                                    <div className="text-xs space-y-1 text-gray-600">
                                        <p><span className="font-semibold">Supply Date:</span> {material.supplyDate}</p>
                                        <p><span className="font-semibold">Invoice #:</span> {material.invoiceNumber}</p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="text-sm font-bold text-gray-700 mb-2">Usage History</h4>
                                    {material.usageHistory.length > 0 ? (
                                        <ul className="text-xs space-y-1 text-gray-600 max-h-24 overflow-y-auto">
                                            {material.usageHistory.map((entry, index) => (
                                               <li key={index}>
                                                  <span className="font-semibold">{entry.date}:</span> Used {entry.quantityUsed} {material.unit} {entry.notes && `(${entry.notes})`}
                                               </li>
                                            ))}
                                        </ul>
                                    ) : <p className="text-xs text-gray-500">No usage has been logged for this material yet.</p>}
                                </div>
                            </div>
                          </td>
                       </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};