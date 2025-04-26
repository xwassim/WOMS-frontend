import React from 'react';
import { FaEye, FaDownload, FaPrint } from 'react-icons/fa';

const ReportsCatalog = () => {
  const reports = [
    { id: 'F32DPJE349', date: 'Aujourd\'hui' },
    { id: 'F32DPJE349', date: '20/10/2024' },
    { id: 'F32DPJE349', date: '19/10/2024' },
    { id: 'F32DPJE349', date: '18/10/2024' },
    { id: 'F32DPJE349', date: '17/10/2024' },
    { id: 'F32DPJE349', date: '16/10/2024' },
    { id: 'F32DPJE349', date: '15/10/2024' },
    { id: 'F32DPJE349', date: '14/10/2024' },
    { id: 'F32DPJE349', date: '13/10/2024' },
    { id: 'F32DPJE349', date: '12/10/2024' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Catalogue des rapports</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Date de soumission</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro du rapport</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <a href='/report-overview'>
                    <button className="text-blue-600 hover:text-blue-900 flex items-center">
                      <FaEye className="mr-1" /> Aperçu
                    </button>
                    </a>
                    <button className="text-green-600 hover:text-green-900 flex items-center">
                      <FaDownload className="mr-1" /> Télécharger
                    </button>
                    <button className="text-purple-600 hover:text-purple-900 flex items-center">
                      <FaPrint className="mr-1" /> Imprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing 1 to {reports.length} of {reports.length} entries
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-gray-600 bg-gray-100">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ReportsCatalog;