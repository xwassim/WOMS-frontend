import React, { useState } from 'react';
import { AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';

const CriticalProblemsCard = ({ well }) => {
  const [expanded, setExpanded] = useState(null);
  
  // Find critical problems (severity 3)
  const criticalProblems = well.phases.flatMap(phase => 
    phase.dailyReports.flatMap(report => 
      report.problems?.filter(problem => problem.severity === 3) || []
    )
  );
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Critical Problems</h2>
        <AlertOctagon className="w-5 h-5 text-red-600" />
      </div>
      
      {criticalProblems.length > 0 ? (
        <>
          <p className="text-red-600 font-medium mb-4">
            {criticalProblems.length} critical issue{criticalProblems.length !== 1 ? 's' : ''}
          </p>
          
          <div className="space-y-3">
            {criticalProblems.map((problem, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-200"
              >
                <div 
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="font-medium">{problem.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{formatDate(problem.dateReported || '')}</span>
                    {expanded === index ? 
                      <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    }
                  </div>
                </div>
                
                {expanded === index && (
                  <div className="p-3 bg-white border-t border-gray-200 animate-fadeIn">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Type:</span> {problem.type}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Phase:</span> {problem.phase}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Status:</span>{' '}
                      <span className={problem.status === 'Resolved' ? 'text-green-600' : 'text-amber-600'}>
                        {problem.status}
                      </span>
                    </p>
                    
                    {problem.impact && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.impact.delay > 0 && (
                          <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded">
                            +{problem.impact.delay} days delay
                          </span>
                        )}
                        {problem.impact.cost > 0 && (
                          <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
                            +${problem.impact.cost.toLocaleString()} cost
                          </span>
                        )}
                      </div>
                    )}
                    
                    {problem.solutions && problem.solutions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Solutions:</p>
                        <ul className="text-xs text-gray-600 list-disc list-inside">
                          {problem.solutions.map((solution, idx) => (
                            <li key={idx}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500">
          <p className="text-center">No critical problems detected</p>
          <p className="text-sm text-center mt-2">All systems operating within normal parameters</p>
        </div>
      )}
    </div>
  );
};

export default CriticalProblemsCard;