import React from 'react';
import { PieChart } from 'lucide-react';
import DonutChart from '../charts/DonutChart';

const ProblemDistributionCard = ({ well }) => {
  // Calculate problem distribution by severity
  const calculateProblemDistribution = () => {
    const allProblems = well.phases.flatMap(phase => 
      phase.dailyReports.flatMap(report => report.problems || [])
    );
    
    const severityCounts = [0, 0, 0];
    allProblems.forEach(problem => {
      if (problem.severity >= 1 && problem.severity <= 3) {
        severityCounts[problem.severity - 1]++;
      }
    });
    
    const totalProblems = severityCounts.reduce((sum, count) => sum + count, 0);
    
    return {
      data: [
        { id: 0, value: severityCounts[2], label: 'Critical (3)', color: '#3C50E0' },
        { id: 1, value: severityCounts[1], label: 'Medium (2)', color: '#1C2434' },
        { id: 2, value: severityCounts[0], label: 'Minor (1)', color: '#3ECE80' }
      ],
      total: totalProblems
    };
  };

  const problemDistribution = calculateProblemDistribution();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Problem Distribution</h2>
        <PieChart className="w-5 h-5 text-blue-600" />
      </div>
      
      {problemDistribution.total > 0 ? (
        <>
          <div className="flex justify-center my-4">
            <DonutChart data={problemDistribution.data} size={220} />
          </div>
          
          <div className="mt-4 space-y-2">
            {problemDistribution.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{item.value}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({problemDistribution.total > 0 
                      ? Math.round((item.value / problemDistribution.total) * 100) 
                      : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500 h-[250px]">
          <p className="text-center">No problems reported</p>
          <p className="text-sm text-center mt-2">Operations running smoothly</p>
        </div>
      )}
    </div>
  );
};

export default ProblemDistributionCard;