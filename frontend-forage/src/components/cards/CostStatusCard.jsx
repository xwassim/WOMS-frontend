import React from 'react';
import { DollarSign } from 'lucide-react';
import GaugeChart from '../charts/GaugeChart';

const CostStatusCard = ({ well }) => {
  // Calculate metrics
  const totalCost = well.totalCost;
  const plannedCost = well.planning?.totalCost || 1000000;
  const costPercentage = Math.min(100, Math.round((totalCost / plannedCost) * 100));
  
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
  const getStatusColor = () => {
    if (costPercentage >= 90) return 'text-red-600';
    if (costPercentage >= 80) return 'text-amber-600';
    return 'text-green-600';
  };

  // Determine gauge color
  const getGaugeColor = () => {
    if (costPercentage >= 90) return '#ef4444';
    if (costPercentage >= 80) return '#eab308';
    return '#3b82f6';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Cost Status</h2>
        <DollarSign className="w-5 h-5 text-blue-600" />
      </div>
      
      <p className={`mb-4 ${getStatusColor()} font-medium`}>
        {totalCost >= plannedCost 
          ? 'Budget exceeded' 
          : 'Within budget limits'}
      </p>
      
      <div className="flex justify-center my-4">
        <GaugeChart 
          value={costPercentage} 
          color={getGaugeColor()}
          size={220}
        />
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>0</span>
        <span>{formatCurrency(plannedCost * 0.5)}</span>
        <span>{formatCurrency(plannedCost)}</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Actual Cost</p>
          <p className="text-lg font-semibold">{formatCurrency(totalCost)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Planned Cost</p>
          <p className="text-lg font-semibold">{formatCurrency(plannedCost)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostStatusCard;