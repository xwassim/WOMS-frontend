import React, { useState, useEffect } from 'react';
import { AlertOctagon, ChevronDown, ChevronUp, Filter, Check } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const CriticalProblemsCard = () => {
  const { wellId } = useParams();
  const location = useLocation();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [filters, setFilters] = useState({
    scope: 'all',
    phase: 'all',
    severity: 'all',
    type: 'all',
    withSolutions: true
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fonction pour convertir la gravité numérique en texte
  const getSeverityText = (severity) => {
    switch (severity) {
      case 1: return 'Mineure';
      case 2: return 'Moyenne';
      case 3: return 'Critique';
      default: return 'Non spécifiée';
    }
  };

  // Fonction pour obtenir la classe de couleur en fonction de la gravité
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 1: return 'text-green-600';
      case 2: return 'text-amber-600';
      case 3: return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Fonction pour obtenir la classe de couleur du point en fonction de la gravité
  const getSeverityDotColor = (severity) => {
    switch (severity) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    console.log('Location:', location);
    console.log('Pathname:', location.pathname);
    
    // Extract ID from the URL path
    

    const fetchProblems = async () => {
      if (!wellId) {
        console.error('No well ID found in URL');
        setError('No well ID found in URL');
        setLoading(false);
        return;
      }

      console.log('Fetching problems for well ID:', wellId);
      try {
        setLoading(true);
        console.log('Making API request to:', `http://localhost:9090/api/problemes/drillwell/${wellId}`);
        
        const response = await axios.get(`http://localhost:9090/api/problemes/drillwell/${wellId}`);
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        
        if (!response.data) {
          console.error('No data received from API');
          throw new Error('No data received from API');
        }

        if (!Array.isArray(response.data)) {
          console.error('Received data is not an array:', response.data);
          throw new Error('Invalid data format received');
        }

        console.log('Setting problems state with:', response.data);
        setProblems(response.data);
        setError(null);
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          response: err.response,
          status: err.response?.status,
          data: err.response?.data
        });
        setError(`Failed to load problems: ${err.message}`);
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    fetchProblems();
  }, [location.pathname]); // Changed dependency to location.pathname

  // Log when problems state changes
  useEffect(() => {
    console.log('Problems state updated:', problems);
  }, [problems]);

  // Log when filters change
  useEffect(() => {
    console.log('Filters updated:', filters);
  }, [filters]);

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3C50E0]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center justify-center h-40 text-red-600">
          <AlertOctagon className="w-8 h-8 mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    console.log('No problems available');
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <p>No problems available</p>
        </div>
      </div>
    );
  }

  // Log filtered problems
  const filteredProblems = problems.filter(problem => {
    console.log('Problem data:', {
      name: problem.name,
      severity: problem.severity,
      type: problem.type,
      phaseName: problem.phaseName
    });
    const matches = (
      (filters.scope === 'all' || problem.phaseName === filters.phase) &&
      (filters.severity === 'all' || problem.severity === parseInt(filters.severity)) &&
      (filters.type === 'all' || problem.type === filters.type) &&
      (!filters.withSolutions || (problem.solutions && problem.solutions.length > 0))
    );
    return matches;
  });

  console.log('Filtered problems:', filteredProblems);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // Options pour les filtres
  const severityOptions = [
    { value: 1, label: 'Mineure' },
    { value: 2, label: 'Moyenne' },
    { value: 3, label: 'Critique' }
  ];
  const typeOptions = [...new Set(problems.map(p => p.type))].filter(Boolean);
  const phaseOptions = [...new Set(problems.map(p => p.phaseName))].filter(Boolean);

  // Log available severities
  console.log('Available severities in data:', [...new Set(problems.map(p => p.severity))]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-800">Liste des problèmes</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-white gap-1 px-3 py-1 bg-[#3C50E0] rounded-md text-md"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
          <AlertOctagon className="w-5 h-5 text-red-600" />
        </div>
      </div>

      {/* Panneau de filtres */}
      {showFilters && (
        <div className="mb-4 p-4 bg-[#ededed] rounded-lg animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtre scope */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portée</label>
              <select
                value={filters.scope}
                onChange={(e) => setFilters({...filters, scope: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Toutes les phases</option>
                <option value="phase">Par phase</option>
              </select>
            </div>

            {/* Filtre phase */}
            {filters.scope === 'phase' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                <select
                  value={filters.phase}
                  onChange={(e) => setFilters({...filters, phase: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Toutes</option>
                  {phaseOptions.map((phase, i) => (
                    <option key={i} value={phase}>{phase}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Filtre gravité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gravité</label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({...filters, severity: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Toutes</option>
                {severityOptions.map((sev) => (
                  <option key={sev.value} value={sev.value}>{sev.label}</option>
                ))}
              </select>
            </div>

            {/* Filtre type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous</option>
                {typeOptions.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtre solutions */}
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              id="withSolutions"
              checked={filters.withSolutions}
              onChange={(e) => setFilters({...filters, withSolutions: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="withSolutions" className="text-sm text-gray-700">
              Uniquement avec solutions
            </label>
          </div>
        </div>
      )}

      {/* Résumé des filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.scope === 'phase' && filters.phase !== 'all' && (
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            Phase: {filters.phase}
          </span>
        )}
        {filters.severity !== 'all' && (
          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            Gravité: {getSeverityText(parseInt(filters.severity))}
          </span>
        )}
        {filters.type !== 'all' && (
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
            Type: {filters.type}
          </span>
        )}
        {filters.withSolutions && (
          <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
            Avec solutions
          </span>
        )}
      </div>
      
      {filteredProblems.length > 0 ? (
        <>
          <p className="text-gray-600 font-medium mb-4">
            {filteredProblems.length} problème{filteredProblems.length !== 1 ? 's' : ''} trouvé{filteredProblems.length !== 1 ? 's' : ''}
          </p>
          
          <div className="space-y-3">
            {filteredProblems.map((problem, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-300"
              >
                <div 
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getSeverityDotColor(problem.severity)}`}></div>
                    <span className="font-medium">{problem.name}</span>
                    {problem.solutions?.length > 0 && (
                      <Check className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{formatDate(problem.reportDate)}</span>
                    {expanded === index ? 
                      <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    }
                  </div>
                </div>
                
                {expanded === index && (
                  <div className="p-3 bg-white border-t border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Type:</span> {problem.type || 'Non spécifié'}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Phase:</span> {problem.dailyReport.phaseName}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Gravité:</span>{' '}
                          <span className={getSeverityColor(problem.gravite)}>
                            {getSeverityText(problem.gravite)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          <span className="">Statut:</span>{' '}
                          <span className="text-green-600">
                            Résolu
                          </span>
                        </p>
                        
                        {problem.impact && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {problem.impact.delay > 0 && (
                              <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded">
                                +{problem.impact.delay} jour{problem.impact.delay > 1 ? 's' : ''} retard
                              </span>
                            )}
                            {problem.impact.cost > 0 && (
                              <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
                                +{problem.impact.cost.toLocaleString('fr-FR')} € coût
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {problem.solutions && problem.solutions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Solutions appliquées:</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside pl-4">
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
          <p className="text-center">Aucun problème correspondant aux critères</p>
          <p className="text-sm text-center mt-2">Modifiez les filtres pour afficher plus de résultats</p>
        </div>
      )}
    </div>
  );
};

export default CriticalProblemsCard;