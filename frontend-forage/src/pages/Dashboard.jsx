import { useState } from 'react';
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  // États et données existants
  const [data, setData] = useState({
    costValue: 95,
    costStatus: 'Dangerous',
    delayValue: 30,
    delayStatus: 'Excellent',
    lastUpdate: '10-10-2025'
  });

  // Nouvelles données pour les graphiques
  const historicalData = [
    { month: 'Jan', cost: 65, delay: 25 },
    { month: 'Fév', cost: 85, delay: 30 },
    { month: 'Mar', cost: 95, delay: 35 },
    { month: 'Avr', cost: 75, delay: 20 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: name.includes('Value') ? parseInt(value) : value
    }));
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Forage Dashboard</h1>

      {/* Section de contrôle existante */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {/* ... (garder le même code de contrôle) */}
      </div>

      {/* Indicateurs principaux existants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ... (garder les mêmes cartes d'indicateurs) */}
      </div>

      {/* Nouveaux graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Graphique en ligne combiné */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-4">Historique des indicateurs</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cost"
                  name="Coût (%)"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="delay"
                  name="Délai (%)"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diagramme en barres comparatif */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-4">Comparaison mensuelle</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="cost"
                  name="Coût"
                  fill="#ff4d4f"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="delay"
                  name="Délai"
                  fill="#1890ff"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Répartition des coûts</h3>
          <div className="flex items-center justify-between">
            <span>Main d'œuvre</span>
            <span className="font-semibold text-red-500">45%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Équipement</span>
            <span className="font-semibold text-blue-500">30%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Logistique</span>
            <span className="font-semibold text-green-500">25%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Objectifs</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Coût max:</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="flex justify-between">
              <span>Délai max:</span>
              <span className="font-semibold">25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Dernière mise à jour</h3>
          <p className="text-lg font-semibold text-gray-600">
            {data.lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;