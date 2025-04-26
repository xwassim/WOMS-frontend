import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OperatorView = () => {
  const navigate = useNavigate();
  const drillingSites = [
    {
      id: 1,
      wellName: 'Puit A',
      siteName: 'Hassi Messaoud',
      endDate: 'May 25, 2023',
      status: 'On going',
      statusColor: 'bg-yellow-500',
      progress: 88
    },
    {
      id: 2,
      wellName: 'Puit B',
      siteName: 'Nelisan mando',
      endDate: 'Jun 20, 2023',
      status: 'Delayed',
      statusColor: 'bg-red-500',
      progress: 88
    },
    {
      id: 3,
      wellName: 'Puit B',
      siteName: 'Tiruvelly priya',
      endDate: 'July 13, 2023',
      status: 'At risk',
      statusColor: 'bg-orange-500',
      progress: 88
    },
    {
      id: 4,
      wellName: 'Puit B',
      siteName: 'Matte hannery',
      endDate: 'Dec 20, 2023',
      status: 'Completed',
      statusColor: 'bg-green-500',
      progress: 88
    },
    {
      id: 5,
      wellName: 'Puit C',
      siteName: 'Sukumar rao',
      endDate: 'Mar 15, 2024',
      status: 'Completed',
      statusColor: 'bg-green-500',
      progress: 88
    },
    {
      id: 6,
      wellName: 'Puit C',
      siteName: 'Tiruvelly priya',
      endDate: 'July 13, 2023',
      status: 'Completed',
      statusColor: 'bg-green-500',
      progress: 88
    },
    {
      id: 7,
      wellName: 'Puit C',
      siteName: 'Matte hannery',
      endDate: 'Dec 20, 2023',
      status: 'Completed',
      statusColor: 'bg-green-500',
      progress: 88
    }
  ];

  const handleViewGlobalDashboard = (wellId) => {
    navigate(`/global-dashboard/${wellId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Liste des sites de forages</h1>
        <div className="flex space-x-4">
          <Link
            to="/add-new-forage"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <span>+ Ajouter un forage</span>
          </Link>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Rechercher..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Filtrer
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Puit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du site</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de fin prevu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drillingSites.map((site) => (
              <tr key={site.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{site.wellName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{site.siteName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{site.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${site.statusColor.replace('bg-', 'bg-opacity-40 bg-')}`} 
                      style={{ width: `${site.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{site.progress}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${site.statusColor} text-white`}>
                    {site.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewGlobalDashboard(site.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Dashboard
                    </button>
                    <Link
                      to={`/phase-dashboard/${site.id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      Détails
                    </Link>
                    <Link
                      to="/drilling-planning"
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Planning
                    </Link>
                    <Link
                      to="/reports-catalog"
                      className="text-orange-600 hover:text-orange-900"
                    >
                      Rapports
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing 1 to {drillingSites.length} of {drillingSites.length} entries
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

export default OperatorView;