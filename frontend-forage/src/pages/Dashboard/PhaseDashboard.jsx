import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const PhaseDashboard = () => {
  const { wellId } = useParams();
  
  // Données du puit
  const wellData = {
    name: "Puit AAAA",
    site: "Site: Head / Notebook | 17 Parinés Street"
  };

  // Données des phases
  const phases = [
    {
      name: "Phase 267 x207",
      cost: "80.5 x25.5",
      days: "14 jours",
      parameters: "1 Tèc\n2,3",
      costStatus: [
        "L'état des couts est différent",
        "Les coups sont réservés",
        "L'état des couts est présenté",
        "Les coups sont réservés"
      ]
    },
    {
      name: "Phase 167 x 167",
      cost: "80.5 x22.5",
      days: "14 jours",
      costStatus: [
        "L'état des couts est différent",
        "Les coups sont réservés",
        "Les coups sont réservés"
      ]
    },
    {
      name: "Phase 172x87",
      cost: "80.5 x22.5",
      days: "14 jours",
      parameters: "1 Tèc\n2,3",
      delayStatus: [
        "L'état des couts est différent",
        "Les coups sont réservés",
        "Les coups sont réservés"
      ]
    }
  ];

  // Problèmes et solutions (exemple avec 4 premiers problèmes)
  const problems = [
    { id: 1, problem: "Problème 1 xxxxxxxxxxx", solution: "Solution prob 1 xxxxxxxxxxx" },
    { id: 2, problem: "Problème 2 xxxxxxxxxxx", solution: "Solution prob 2 xxxxxxxxxxx" },
    { id: 3, problem: "Problème 3 xxxxxxxxxxx", solution: "Solution prob 3 xxxxxxxxxxx" },
    { id: 4, problem: "Problème 4 xxxxxxxxxxx", solution: "Solution prob 4 xxxxxxxxxxx" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 font-sans">
      {/* En-tête avec bouton Retour */}
      <div className="mb-6 flex items-center">
        <Link to={`/global-dashboard/${wellId}`} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
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

      {/* Liste des phases */}
      {phases.map((phase, index) => (
        <div key={index} className="mb-8 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">{phase.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Coûts éployés:</span> {phase.cost}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Délais consommé:</span> {phase.days}
              </p>
            </div>
            
            <div>
              {phase.parameters && (
                <>
                  <h4 className="font-medium mb-1">Parlemente (paroisse):</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">{phase.parameters}</pre>
                </>
              )}
            </div>
          </div>

          {/* Etat des coûts ou délais */}
          <div className="mt-3">
            <h4 className="font-medium mb-1">
              {phase.delayStatus ? "Etat des Délais:" : "Etat des Couts:"}
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {(phase.delayStatus || phase.costStatus).map((status, i) => (
                <li key={i}>{status}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Liste des problèmes et solutions */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Listes des problèmes rencontres ainsi que leur solutions</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problèmes rencontrés
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solutions adoptés
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {problems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.problem}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.solution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Affichage des 4 premiers problèmes - <button className="text-blue-600 hover:underline">
            Voir tous les problèmes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseDashboard;