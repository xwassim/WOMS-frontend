import React from 'react';
import { Clock } from 'lucide-react';
import GaugeChart from '../charts/GaugeChart';

const DelayStatusCard = ({ well }) => {
  // Calculate metrics
  const actualGlobalDuration = well.actualGlobalDuration;
  const plannedGlobalDuration = well.planning?.plannedGlobalDuration;
  const delayPercentage = Math.min( Math.round((actualGlobalDuration / plannedGlobalDuration) * 100));
  const delayDays = well.delay || 0;
  
// Determine color based on delay percentage
// - Green (text-green-500/#22c55e) for normal levels (<80%)
// - Yellow (text-yellow-500/#eab308) for warning levels (80-89%)
// - Red (text-red-500/#ef4444) for critical levels (≥90%)
const getStatusColor = () => {
  if (delayPercentage > 100) return 'text-red-500';    // #ef4444
  if (delayPercentage >= 85 && delayPercentage < 100 ) return 'text-yellow-500'; // #eab308
  return 'text-green-500';                             // #22c55e
};

// Determine gauge color (matches status color thresholds)
const getGaugeColor = () => {
  if (delayPercentage > 100) return '#ef4444';    // text-red-500
  if (delayPercentage >= 85 && delayPercentage < 100 ) return '#eab308';    // text-yellow-500
  return '#22c55e';                               // text-green-500
};
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Delay Status</h2>
        <Clock className="w-5 h-5 text-blue-600" />
      </div> */}
      
      <p className={` ${getStatusColor()} text-center font-medium`}>
        {delayDays > 0 
          ? 'Retard détécté'
          : 'Dans les délais'}
      </p>
      
      <div className="flex justify-center ">
        <GaugeChart 
          value={delayPercentage} 
          color={getGaugeColor()}
          size={220}
        />
      </div>
      
      <div className=" flex justify-between font-medium text-sm text-gray-600">
        <span>0j</span>
        <span>{Math.round(plannedGlobalDuration * 0.5)}j</span>
        <span>{plannedGlobalDuration}j</span>
      </div>
      
      {/* <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Current Duration</p>
          <p className="text-lg font-semibold">{totalDuration} days</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Planned Duration</p>
          <p className="text-lg font-semibold">{plannedTotalDuration} days</p>
        </div>
      </div> */}
    </div>
  );
};

export default DelayStatusCard;