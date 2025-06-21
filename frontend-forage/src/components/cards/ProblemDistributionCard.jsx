import React, { useState, useEffect } from 'react';
import { PieChart, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import DonutChart from '../charts/DonutChart';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProblemDistributionCard = () => {
  const { wellId } = useParams();
  const [distributionType, setDistributionType] = useState('severity');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [showPhaseDropdown, setShowPhaseDropdown] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [well, setWell] = useState(null);

  // Types de problèmes prédéfinis
  const predefinedTypes = ["Technique", "Logistique", "Sécurité", "Personnel", "Environnement"];

  // Récupérer les données du puits et les problèmes depuis l'API
  useEffect(() => {
    const fetchWellAndProblems = async () => {
      try {
        setLoading(true);
        // Fetch well data
        const wellResponse = await axios.get(`http://localhost:9090/api/drillwells/${wellId}`);
        setWell(wellResponse.data);
        
        // Fetch problems
        console.log("Fetching problems for well ID:", wellId);
        const response = await axios.get(`http://localhost:9090/api/problemes/drillwell/${wellId}`);
        console.log("API Response:", response);
        console.log("Problems data:", response.data);
        setProblems(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response,
          status: err.response?.status,
          data: err.response?.data
        });
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };

    fetchWellAndProblems();
  }, [wellId]);

  // Obtenir toutes les phases pour le menu déroulant
  const allPhases = well?.phases?.map(phase => ({
    id: phase.id,
    name: phase.name
  })) || [];

  // Calculer la distribution des problèmes selon le type sélectionné et la phase
  const calculateProblemDistribution = () => {
    // Filtrer les problèmes par phase sélectionnée si différent de 'all'
    const filteredProblems = problems.filter(problem => 
      selectedPhase === 'all' || problem.dailyReport?.phase?.id === selectedPhase
    );

    if (distributionType === 'severity') {
      // Compter par gravité
      const severityCounts = {
        'Critique': 0,
        'Moyenne': 0,
        'Mineure': 0
      };

      filteredProblems.forEach(problem => {
        if (problem.gravite === 3) severityCounts['Critique']++;
        else if (problem.gravite === 2) severityCounts['Moyenne']++;
        else if (problem.gravite === 1) severityCounts['Mineure']++;
      });

      const totalProblems = Object.values(severityCounts).reduce((sum, count) => sum + count, 0);
      
      return {
        data: [
          { id: 0, value: severityCounts['Critique'], label: 'Critique', color: '#d80003' },
          { id: 1, value: severityCounts['Moyenne'], label: 'Moyenne', color: '#ffb200' },
          { id: 2, value: severityCounts['Mineure'], label: 'Mineure', color: '#55e80d' }
        ],
        total: totalProblems,
        title: selectedPhase === 'all' 
          ? 'Répartition des problèmes par gravité' 
          : `Répartition des problèmes par gravité`
      };
    } else {
      // Compter par type
      const typeCounts = {};
      let otherTypesCount = 0;
      
      filteredProblems.forEach(problem => {
        const type = problem.type || 'Non spécifié';
        if (predefinedTypes.includes(type)) {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        } else {
          otherTypesCount++;
        }
      });

      // Trier les types prédéfinis par quantité (décroissant)
      const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1]);

      // Ajouter la catégorie "Autres types" s'il y en a
      if (otherTypesCount > 0) {
        sortedTypes.push(['Autres types', otherTypesCount]);
      }

      // Générer des couleurs distinctes pour chaque type
      const typeColors = [
        '#3C50E0', '#1C2434', '#3ECE80', '#F44336', '#9C27B0',
        '#FF9800', '#607D8B', '#795548', '#E91E63', '#00BCD4'
      ];

      const totalProblems = filteredProblems.length;
      
      return {
        data: sortedTypes.map(([type, count], index) => ({
          id: index,
          value: count,
          label: type,
          color: typeColors[index % typeColors.length]
        })),
        total: totalProblems,
        title: selectedPhase === 'all' 
          ? 'Répartition des problèmes par type' 
          : `Répartition des problèmes par type`
      };
    }
  };

  const problemDistribution = calculateProblemDistribution();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center h-[250px]">
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center h-[250px]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800">{problemDistribution.title}</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button
              onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-md"
            >
              {selectedPhase === 'all' ? 'Toutes les phases' : well?.phases.find(p => p.id === selectedPhase)?.name || 'Sélectionner une phase'}
              {showPhaseDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showPhaseDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  onClick={() => {
                    setSelectedPhase('all');
                    setShowPhaseDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedPhase === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Toutes les phases
                </button>
                {allPhases.map(phase => (
                  <button
                    key={phase.id}
                    onClick={() => {
                      setSelectedPhase(phase.id);
                      setShowPhaseDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedPhase === phase.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {phase.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setDistributionType('severity')}
            className={`px-3 py-1 text-md rounded-md ${distributionType === 'severity' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-700'}`}
          >
            Par gravité
          </button>
          <button
            onClick={() => setDistributionType('type')}
            className={`px-3 py-1 text-md rounded-md ${distributionType === 'type' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-700'}`}
          >
            Par type
          </button>
        </div>
      </div>
      
      {problemDistribution.total > 0 ? (
        <>
          <div className="flex justify-center my-4">
            <DonutChart data={problemDistribution.data} size={220} />
          </div>
          
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {problemDistribution.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-md text-gray-700">{item.label}</span>
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
          <p className="text-center">
            {selectedPhase === 'all' 
              ? 'Aucun problème signalé' 
              : `Aucun problème signalé dans cette phase`}
          </p>
          <p className="text-sm text-center mt-2">Opérations en cours sans problème</p>
        </div>
      )}
    </div>
  );
};

export default ProblemDistributionCard;