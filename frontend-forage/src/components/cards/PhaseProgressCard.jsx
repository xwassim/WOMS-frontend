import React from 'react';
import { Activity } from 'lucide-react';

const PhaseProgressCard = ({ well }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not started';
    return new Date(dateString).toLocaleDateString();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Get status text color
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'In Progress':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Phase Progress</h2>
        <Activity className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="mt-4 space-y-4">
        {well.phases.map((phase, index) => (
          <div key={index} className="relative">
            {/* Phase info */}
            <div className="flex mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(phase.status)} mr-3`}>
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">{phase.name}</h3>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Start: {formatDate(phase.startDate)}</span>
                  <span>End: {formatDate(phase.endDate)}</span>
                </div>
              </div>
              <div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusTextColor(phase.status)} bg-opacity-10 ${getStatusColor(phase.status)}`}>
                  {phase.status}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="ml-9 mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getStatusColor(phase.status)}`} 
                  style={{ width: `${phase.progress}%`, transition: 'width 1s ease-in-out' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-600">{phase.progress}% complete</span>
                {phase.totalCost > 0 && (
                  <span className="font-medium text-gray-700">
                    ${phase.totalCost.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            
            {/* Connector line */}
            {index < well.phases.length - 1 && (
              <div className="absolute top-6 left-3 w-0.5 bg-gray-200 h-12 z-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseProgressCard;