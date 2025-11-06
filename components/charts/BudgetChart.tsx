
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Labor', planned: 40000, actual: 38000 },
  { name: 'Materials', planned: 70000, actual: 75000 },
  { name: 'Logistics', planned: 20000, actual: 18000 },
  { name: 'Permits', planned: 5000, actual: 5000 },
  { name: 'Subcontractors', planned: 50000, actual: 52000 },
];

export const BudgetChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `₦${Number(value) / 1000}k`} tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => `₦${value.toLocaleString()}`} 
            cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}
          />
          <Legend wrapperStyle={{fontSize: "14px"}} />
          <Bar dataKey="planned" fill="#93c5fd" name="Planned Budget" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" fill="#1d4ed8" name="Actual Cost" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
