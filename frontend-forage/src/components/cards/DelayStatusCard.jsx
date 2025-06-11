import React from 'react';
import { Clock } from 'lucide-react';
import GaugeChart from '../charts/GaugeChart';

const DelayStatusCard = ({ well }) => {
  // Calculate metrics
  const totalDuration = well.totalDuration;
  const plannedDuration = well.planning?.totalDuration;
  const delayPercentage = Math.min(100, Math.round((totalDuration / plannedDuration) * 100));
  const delayDays = well.delay || 0;
  
  // Determine color based on delay percentage
  const getStatusColor = () => {
    if (delayPercentage >= 90) return 'text-red-600';
    if (delayPercentage >= 80) return 'text-amber-600';
    return 'text-green-600';
  };

  // Determine gauge color
  const getGaugeColor = () => {
    if (delayPercentage >= 90) return '#ef4444';
    if (delayPercentage >= 80) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Delay Status</h2>
        <Clock className="w-5 h-5 text-blue-600" />
      </div>
      
      <p className={`mb-4 ${getStatusColor()} font-medium`}>
        {delayDays > 0 
          ? 'Schedule delay detected' 
          : 'On schedule'}
      </p>
      
      <div className="flex justify-center my-4">
        <GaugeChart 
          value={delayPercentage} 
          color={getGaugeColor()}
          size={220}
        />
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>0d</span>
        <span>{Math.round(plannedDuration * 0.5)}d</span>
        <span>{plannedDuration}d</span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Current Duration</p>
          <p className="text-lg font-semibold">{totalDuration} days</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Planned Duration</p>
          <p className="text-lg font-semibold">{plannedDuration} days</p>
        </div>
      </div>
    </div>
  );
};

export default DelayStatusCard;