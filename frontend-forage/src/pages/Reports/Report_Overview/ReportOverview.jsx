import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../../data/data';

const ReportOverview = () => {
  const { wellId, phaseId, reportId } = useParams(); // Now getting phaseId from URL

  // Find the well, phase, and report in your data
  const well = data.drillWells.find(w => w.id === Number(wellId));
  const phase = well?.phases.find(p => p.id === Number(phaseId));
  const report = phase?.dailyReports.find(r => r.id === Number(reportId));

  if (!phase) {
    return <div className="bg-white rounded-lg shadow p-6 text-red-500">Phase not found</div>;
  }

  if (!report) {
    return <div className="bg-white rounded-lg shadow p-6 text-red-500">Report not found</div>;
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DAILY DRILLING REPORT</h1>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Well name</p>
            <p className="font-semibold">{well.name}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{formatDate(report.date)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Depth</p>
            <p className="font-semibold">{report.depth} ft</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Progress</p>
            <p className="font-semibold">
              {report.progress} ft in {report.timeSpent}h
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Operation Description</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.operations?.map((op, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {op.startTime || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {op.endTime || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {op.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {report.formation && (
          <div className="mt-2 text-sm italic text-gray-500">
            *{report.formation}
          </div>
        )}
      </div>

      {report.problems?.length > 0 && (
        <div className="border-t pt-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">PROBLEMS REPORTED</h2>
          <div className="space-y-3">
            {report.problems.map((problem, index) => (
              <div key={index} className="bg-red-50 p-3 rounded-lg">
                <h3 className="font-medium text-red-800">{problem.name}</h3>
                <p className="text-gray-700">Type: {problem.type}</p>
                <p className="text-gray-700">Severity: {problem.severity}</p>
                {problem.solutions?.length > 0 && (
                  <div className="mt-1">
                    <p className="text-sm font-medium">Solutions:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {problem.solutions.map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Phase</h3>
          <p>{phase.name}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Daily Cost</h3>
          <p>{report.dailyCost?.toLocaleString('en-US')} US$</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Equipment Used</h3>
          <div className="text-sm">
            {report.equipmentUsed?.join(', ') || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOverview;