import React from 'react';
import { DollarSign } from 'lucide-react';
import GaugeChart from '../charts/GaugeChart';

const CostStatusCard = ({ well }) => {
  // Calculate metrics
  const actualGlobalCost = well.actualGlobalCost;
  const plannedGlobalCost = well.planning?.plannedGlobalCost || 1000000;
  const costPercentage = Math.min( Math.round((actualGlobalCost / plannedGlobalCost) * 100));
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

// Determine color based on cost percentage
// - Green (text-green-500) for normal levels (<90%)
// - Yellow (text-yellow-500) for warning levels (90-99%)
// - Red (text-red-500) for critical levels (≥100%)
const getStatusColor = () => {
  if (costPercentage > 100) return 'text-red-500';  // #ef4444
  if (costPercentage >= 85 && costPercentage < 100) return 'text-yellow-600'; // #eab308
  return 'text-green-500';                           // #22c55e
};
// Returns color based on cost percentage threshold
// - Green (#22c55e) for normal levels (<90%)
// - Yellow (#eab308) for warning levels (90-99%)
// - Red (#ef4444) for critical levels (≥100%)
const getGaugeColor = () => {
  if (costPercentage > 100) return '#ef4444';  // Critical - red
  if (costPercentage >= 85 && costPercentage < 100) return '#eab308';   // Warning - yellow
  return '#22c55e';                            // Normal - green
};
  return (
    <div className=" rounded-xl border border-gray-200 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Cost Status</h2>
        <DollarSign className="w-5 h-5 text-blue-600" />
      </div> */}
      
      <p className={`mb-1 ${getStatusColor()} text-center font-medium`}>
        {actualGlobalCost > plannedGlobalCost 
          ? 'Budget dépassé' 
          : 'Dans les limites du budget'}
      </p>
      
      <div className="flex justify-center ">
        <GaugeChart 
          value={costPercentage} 
          color={getGaugeColor()}
          size={220}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-900">
        <span>$0</span>
        {/* <span>{formatCurrency(plannedGlobalCost * 0.5)}</span> */}
        <span>{formatCurrency(plannedGlobalCost)}</span>
      </div>
      
      {/* <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Actual Cost</p>
          <p className="text-lg font-semibold">{formatCurrency(totalCost)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Planned Cost</p>
          <p className="text-lg font-semibold">{formatCurrency(plannedCost)}</p>
        </div>
      </div> */}
    </div>
  );
};

export default CostStatusCard;