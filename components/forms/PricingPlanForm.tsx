import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { pricingTiers } from '../../mockData';
import { PricingTier } from '../../types';

interface PricingPlanFormProps {
  onSelectPlan: (plan: PricingTier) => void;
}

export const PricingPlanForm: React.FC<PricingPlanFormProps> = ({ onSelectPlan }) => {
  return (
    <div className="space-y-4">
        <p className="text-sm text-gray-600">Select a plan that best fits your new project's needs.</p>
        {pricingTiers.map((tier) => (
            <div key={tier.name} className={`rounded-lg border p-4 transition-all duration-300 hover:shadow-lg hover:border-brand-blue-400 flex flex-col ${tier.popular ? 'border-brand-blue-500 border-2 -m-px' : 'border-gray-200'}`}>
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">{tier.name}</h3>
                    <p className="text-gray-500 mt-1 text-sm">{tier.description}</p>
                    <div className="my-4">
                        <p className="text-3xl font-extrabold text-gray-900">
                            ₦{tier.price}
                            <span className="text-base font-medium text-gray-500"> / project</span>
                        </p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700 max-h-32 overflow-y-auto pr-2">
                        {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <CheckIcon className="h-5 w-5 mr-2 flex-shrink-0 text-green-500" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button 
                    onClick={() => onSelectPlan(tier)}
                    className="w-full mt-6 py-2.5 rounded-lg font-semibold transition-colors bg-brand-blue-600 text-white hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                >
                    Select Plan
                </button>
            </div>
        ))}
    </div>
  );
};