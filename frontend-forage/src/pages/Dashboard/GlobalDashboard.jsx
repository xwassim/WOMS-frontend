import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const GlobalDashboard = () => {
  const { wellId } = useParams();
  
  // Données du puit
  const wellData = {
    name: "Puit AAAA",
    site: "Site Hasai Mestabadi, 17 Patrick Street",
    lastUpdated: "10-10-2025",
    costStatus: "L'état des couts est",
    delayStatus: "L'état des délais est",
    criticalProblems: [
      { code: "VR1.3", value: "1 56", variation: "+6.05%" },
      { code: "VR2.1", value: "1 56" }
    ],
    cost: "$1,324",
    delay: "+5j",
    phases: ["drilling 26°x20°", "drilling 16°x13°"]
  };

  // Données de répartition des problèmes
  const problemDistribution = {
    phase: "Phase 26°x20°",
    severity1: "20%",
    severity2: "60%",
    severity3: "20%"
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 font-sans">
      {/* En-tête avec bouton Retour */}
      <div className="mb-6 flex items-center">
        <Link to="/operator-view" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
          <FiArrowLeft className="mr-1" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Retour</h1>
        </div>
      </div>

      {/* Titre du puit */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{wellData.name}</h2>
        <p className="text-gray-600">{wellData.site}</p>
      </div>

      {/* Section Etat des Coûts Globaux */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Etat des Couts Globaux</h3>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>{wellData.costStatus}</strong><br />
            <span className="text-sm">Mis à jour le {wellData.lastUpdated}</span>
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
          <div 
            className="bg-blue-600 h-6 rounded-full flex items-center justify-end"
            style={{ width: '60%' }}
          >
            <span className="text-white text-xs mr-2">60%</span>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>0</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>

      {/* Section Etat des Délais Globaux */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Etat des Delais Globaux</h3>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>{wellData.delayStatus}</strong><br />
            <span className="text-sm">Mis à jour le {wellData.lastUpdated}</span>
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
          <div 
            className="bg-green-600 h-6 rounded-full flex items-center justify-end"
            style={{ width: '75%' }}
          >
            <span className="text-white text-xs mr-2">75%</span>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>0</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>

      {/* Grille de 2 colonnes pour les sections inférieures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Problèmes de gravité 3 */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Problèmes de gravité 3</h3>
          
          <div className="mb-3">
            <h4 className="font-medium text-red-600">Problèmes sans solutions</h4>
          </div>
          
          {wellData.criticalProblems.map((problem, index) => (
            <div key={index} className="mb-3 pb-3 border-b">
              <h4 className="font-medium">{problem.code}</h4>
              <p className="text-gray-700">{problem.value}</p>
              {problem.variation && (
                <p className="text-red-600">{problem.variation}</p>
              )}
            </div>
          ))}
        </div>

        {/* Répartition des problèmes */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Répartitions des problèmes selon leurs gravité</h3>
          
          <div className="mb-4">
            <h4 className="font-medium">{problemDistribution.phase}</h4>
            <div className="flex mt-2">
              <div 
                className="bg-red-500 h-4" 
                style={{ width: `${problemDistribution.severity1}` }}
              ></div>
              <div 
                className="bg-yellow-500 h-4" 
                style={{ width: `${problemDistribution.severity2}` }}
              ></div>
              <div 
                className="bg-green-500 h-4" 
                style={{ width: `${problemDistribution.severity3}` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>{problemDistribution.severity1}</span>
              <span>{problemDistribution.severity2}</span>
              <span>{problemDistribution.severity3}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Problèmes de gravité 1</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Problèmes de gravité 2</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Problèmes de gravité 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vision globale */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Vision globale sur les couts et les délais</h3>
        
        <div className="grid grid-cols-3 gap-4 text-center mb-3">
          <div>
            <p className="text-2xl font-bold">{wellData.cost}</p>
            <p className="text-sm text-gray-600">Couts</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{wellData.delay}</p>
            <p className="text-sm text-gray-600">Délais</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$1.2M</p>
            <p className="text-sm text-gray-600">Couts et délais prévisionnel</p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6">
          {wellData.phases.map((phase, index) => (
            <span key={index} className="text-sm text-gray-700">{phase}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalDashboard;