import React from 'react';
import { DollarSign, Clock, BarChart3, Layers } from 'lucide-react';
import DrillView from '../specs/DrillView';

const GlobalOverviewCard = ({ well }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate metrics
  const totalCost = well.totalCost;
  const plannedCost = well.planning?.totalCost || totalCost;
  const costVariance = totalCost - plannedCost;
  const costVariancePercentage = Math.round((costVariance / plannedCost) * 100);
  
  const totalDuration = well.totalDuration;
  const plannedDuration = well.planning?.totalDuration || totalDuration;
  const delayDays = well.delay || 0;
  
  // Get phases with progress info
  const activePhases = well.phases.filter(phase => phase.progress > 0);
  const completedPhases = well.phases.filter(phase => phase.progress === 100).length;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 ">Vue Globale</h2>
      <div className="my-3">
        
        <div className="flex flex-wrap gap-2">
          {well.phases.map((phase, index) => (
            <div 
              key={index}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                phase.status === 'completed-good' ? 'bg-green-100 text-green-800' : 
                phase.status === 'completed-bad' ? 'bg-orange-100 text-orange-800' : 
                phase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'
              }`}
            >
              {phase.name}
            </div>
          ))}
        </div>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Overview */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Cost Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Current Cost</p>
              <p className="text-lg font-bold">{formatCurrency(totalCost)}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Planned Budget</p>
              <p className="text-lg font-bold">{formatCurrency(plannedCost)}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Variance</p>
              <p className={`text-sm font-medium ${costVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {costVariance > 0 ? '+' : ''}{formatCurrency(costVariance)} ({costVariancePercentage}%)
              </p>
            </div>
          </div>
        </div>
        
        {/* Time Overview */}
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Time Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Days Elapsed</p>
              <p className="text-lg font-bold">{totalDuration} days</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Planned Duration</p>
              <p className="text-lg font-bold">{plannedDuration} days</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Delay</p>
              <p className={`text-sm font-medium ${delayDays > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {delayDays > 0 ? `+${delayDays} days` : 'On schedule'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Progress Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Overall Progress</p>
              <div className="mt-1 relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {well.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div 
                    style={{ width: `${well.progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Phases Completed</p>
              <p className="text-lg font-bold">{completedPhases} / {well.phases.length}</p>
            </div>
          </div>
        </div>
        
        {/* Team Overview */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Layers className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Team Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Supervisor</p>
              <p className="text-base font-medium">{well.team.supervisor}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Drilling Engineer</p>
              <p className="text-base font-medium">{well.team.drillingEngineer}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Crew Size</p>
              <p className="text-lg font-bold">{well.team.crewMembers} members</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phases */}
     
    </div>
  );
};

export default GlobalOverviewCard;