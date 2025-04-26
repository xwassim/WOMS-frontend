import React from 'react';

const ReportOverview = () => {
  const operations = [
    { start: '00:00', end: '03:00', description: 'Cont picked up 5" DP and racked in the mast, total stand 5" DP =31' },
    { start: '03:00', end: '05:00', description: 'Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2' },
    { start: '05:00', end: '24:00', description: 'Spud B1-96/01 @05:00 and drilled 26" hole section' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DAILY DRILLING REPORT : N °2</h1>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Well name</p>
            <p className="font-semibold">Site A</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">09/15/2013</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Depth @ 24h</p>
            <p className="font-semibold">59 ft</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Progress</p>
            <p className="font-semibold">17 ft in 19h</p>
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
              {operations.map((op, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.start}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.end}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{op.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-sm italic text-gray-500">*Very hard formation</div>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">AFTER MIDNIGHT</h2>
        <div className="mb-4">
          <h3 className="font-medium">Control:</h3>
          <p className="text-gray-700">Cont drilling 26" hole section f/59' t/62'</p>
          <p className="text-sm italic text-gray-500">*Very hard formation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Planned Operation</h3>
          <p>Continue Drilling 26" Section</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Daily Cost</h3>
          <p>55 664,54 US$</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Cumulative Cost</h3>
          <p>1 253 094,54 US$</p>
        </div>
      </div>
    </div>
  );
};

export default ReportOverview;