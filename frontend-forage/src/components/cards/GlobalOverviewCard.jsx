import React, { useState ,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { DollarSign, Clock } from "lucide-react";
import CostStatusCard from "./CostStatusCard";
import DelayStatusCard from "./DelayStatusCard";
import axios from "axios";

const GlobalOverviewCard = () => {
  const { wellId } = useParams();
  
  const phases = [
    { id: 1, name: 'Phase 26\" x 20\" inchs' },
    { id: 2, name: 'Phase 16\" x 13\" inchs' },
    { id: 3, name: 'Phase 12\" x 9\" inchs' },
    { id: 4, name: 'Phase 8\" x 7\" inchs' }
  ];
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedWellback, setSelectedWellback] = useState(null);
  //const wellId=64;
  useEffect(() => {
    axios.get(`http://localhost:9090/api/drillwells/${wellId}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setSelectedWellback(data);
       
        } else {
          console.warn("Format de réponse inattendu:", data);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération de puit", err);
      });
  }, []);


  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!selectedWellback) {
    return <p>Chargement de puit...</p>;
  }

  // Calculate global metrics

  


  //REAL WORK 

  const totalCost = selectedWellback.totalCost || 0;
  const plannedCost = (selectedWellback.plannedCost4 || 0);

  const costVarianceback = totalCost - plannedCost;
  const costVariancePercentageback = plannedCost
    ? Math.round((costVarianceback / plannedCost) * 100)
    : 0;

  const actualDuration = (selectedWellback.actualDay || 0) ;

  const plannedDuration =(selectedWellback.plannedDay4 || 0);

  //const delayDays = well.delay || 0;
  const delayDay = actualDuration - plannedDuration;

  // Calculate phase metrics


  const getPhaseMetricsback = (phase) => {
    let actualPhaseCost = 0;
    let plannedPhaseCost = 0;
    let actualPhaseDuration = 0;
    let plannedPhaseDuration = 0;
    let delayDays = 0;
    let costVariance = 0;
    let costVariancePercentage = 0;
    let phaseName="";
    switch (phase.id) {
      case 1:
        phaseName="Phase 26 x 20 inchs";
        actualPhaseCost = selectedWellback.cumulativeCost1 || 0;
        plannedPhaseCost = selectedWellback.plannedCost1 || 0;
        actualPhaseDuration = selectedWellback.actualDay1 || 0;
        plannedPhaseDuration = selectedWellback.plannedDay1 || 0;
        break;
      case 2:
        phaseName="Phase 16 x 13 inchs";
        actualPhaseCost = Math.max(
          (selectedWellback.cumulativeCost2 || 0) - (selectedWellback.cumulativeCost1 || 0),
          0
        );
        plannedPhaseCost = Math.max(
          (selectedWellback.plannedCost2 || 0) - (selectedWellback.plannedCost1 || 0),
          0
        );
        actualPhaseDuration = Math.max(
          (selectedWellback.actualDay2 || 0) - (selectedWellback.actualDay1 || 0),
          0
        );
        plannedPhaseDuration = Math.max(
          (selectedWellback.plannedDay2 || 0) - (selectedWellback.plannedDay1 || 0),
          0
        );
        break;
      case 3:
        phaseName="Phase 12 x 9 inchs";
        actualPhaseCost = Math.max(
          (selectedWellback.cumulativeCost3 || 0) - (selectedWellback.cumulativeCost2 || 0),
          0
        );
        plannedPhaseCost = Math.max(
          (selectedWellback.plannedCost3 || 0) - (selectedWellback.plannedCost2 || 0),
          0
        );
        actualPhaseDuration = Math.max(
          (selectedWellback.actualDay3 || 0) - (selectedWellback.actualDay2 || 0),
          0
        );
        plannedPhaseDuration = Math.max(
          (selectedWellback.plannedDay3 || 0) - (selectedWellback.plannedDay2 || 0),
          0
        );
        break;
      case 4:
        phaseName="Phase 8 x 7 inchs";
        actualPhaseCost = Math.max(
          (selectedWellback.cumulativeCost4 || 0) - (selectedWellback.cumulativeCost3 || 0),
          0
        );
        plannedPhaseCost = Math.max(
          (selectedWellback.plannedCost4 || 0) - (selectedWellback.plannedCost3 || 0),
          0
        );
        actualPhaseDuration = Math.max(
          (selectedWellback.actualDay4 || 0) - (selectedWellback.actualDay3 || 0),
          0
        );
        plannedPhaseDuration = Math.max(
          (selectedWellback.plannedDay4 || 0) - (selectedWellback.plannedDay3 || 0),
          0
        );
        break;
      default:
        break;
    }

    costVariance = actualPhaseCost - plannedPhaseCost;
    costVariancePercentage = plannedPhaseCost
      ? Math.round((costVariance / plannedPhaseCost) * 100)
      : 0;
    delayDays = actualPhaseDuration - plannedPhaseDuration;

   
    return {
      actualPhaseCost,
      plannedTotalCost: plannedPhaseCost,
      costVariance,
      costVariancePercentage,
      actualPhaseDuration,
      plannedPhaseDuration,
      delayDays,
      phaseName,
    };
  };

  const phaseMetrics = selectedPhase ? getPhaseMetricsback(selectedPhase) : null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl text-gray-800">
        {selectedPhase ? `Détails de la  ${phaseMetrics.phaseName}` : "Tableau de bord"}
      </h2>
      
      {/* Phase Selector - Always visible */}
      <div className="my-3">
        <p className="text-md text-gray-600 mb-2">
          {selectedPhase ? "Autres phases disponibles:" : "Sélectionnez une phase pour voir ses détails :"}
        </p>
        <div className="flex flex-wrap gap-2">
          {phases.map((phase, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                selectedPhase?.id === phase.id 
                  ? "bg-blue-100 text-blue-800 border border-blue-300" //hadi selectionné
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200" //hadi mazal mabdat
              }`}
            >
              {phase.name} 
            </div>
          ))}
        </div>
      </div>

      {selectedPhase ? (
        /* Phase Details View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Phase Cost Overview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Coûts de la Phase</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Coût Réel</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(phaseMetrics.actualPhaseCost)}
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Coût Prévisionnel</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(phaseMetrics.plannedTotalCost)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Écart</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    phaseMetrics.costVariance > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {phaseMetrics.costVariance > 0 ? "+" : ""}
                    {formatCurrency(phaseMetrics.costVariance)}
                  </p>
                  <p className={`text-sm ${
                    phaseMetrics.costVariance > 0 ? "text-red-500" : "text-green-500"
                  }`}>
                    ({phaseMetrics.costVariancePercentage}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Delay Overview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Délais de la Phase</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Durée Réelle</p>
                <p className="text-lg font-bold text-gray-700">
                  {phaseMetrics.actualPhaseDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Durée Prévisionnelle</p>
                <p className="text-lg font-bold text-gray-700">
                  {phaseMetrics.plannedPhaseDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">État du Planning</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    phaseMetrics.delayDays > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {phaseMetrics.delayDays > 0 ? `+${phaseMetrics.delayDays} jours` : "Dans les temps"}
                  </p>
                  {phaseMetrics.delayDays > 0 && (
                    <p className="text-xs text-red-500">
                      {((phaseMetrics.delayDays / phaseMetrics.plannedPhaseDuration) * 100).toFixed(1)}% de retard
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setSelectedPhase(null)}
            className="col-span-full mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Retour à la vue globale
          </button>
        </div>
      ) : (
        /* Global Overview View */
        <div>
        <h1 className=" mt-6 text-2xl">Vue globale sur le puit :</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 ">
          {/* Global Cost Overview */}
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Aperçu des Coûts</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Coût Actuel</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(totalCost)}
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Budget Prévisionnel</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(plannedCost)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Écart</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    costVarianceback > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {costVarianceback > 0 ? "+" : ""}
                    {formatCurrency(costVarianceback)}
                  </p>
                  <p className={`text-sm ${
                    costVarianceback > 0 ? "text-red-500" : "text-green-500"
                  }`}>
                    ({costVariancePercentageback}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CostStatusCard actualGlobalCost={totalCost} plannedGlobalCost={plannedCost} />

          {/* Global Time Overview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Aperçu des Délais</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Jours Écoulés</p>
                <p className="text-lg font-bold text-gray-700">
                  {actualDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Durée Prévisionnelle</p>
                <p className="text-lg font-bold text-gray-700">
                  {plannedDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">État du Planning</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    delayDay > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {delayDay > 0 ? `+${delayDay} jours` : "Dans les temps"}
                  </p>
                  {delayDay > 0 && (
                    <p className="text-xs text-red-500">
                      {((delayDay / plannedDuration) * 100).toFixed(1)}% de retard
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DelayStatusCard actualGlobalDuration={actualDuration} plannedGlobalDuration={plannedDuration} delayDays={delayDay} />
        </div>
        </div>
      )}
    </div>
  );
};

export default GlobalOverviewCard;



     {/* Progress Overview */}
        {/* <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Progress Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Overall Progress</p>
              <div className="mt-1 relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {well.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div 
                    style={{ width: `${well.progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Phases Completed</p>
              <p className="text-lg font-bold">{completedPhases} / {well.phases.length}</p>
            </div>
          </div>
        </div> */}

        {/* Team Overview */}
        {/* <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Layers className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Team Overview</h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Supervisor</p>
              <p className="text-base font-medium">{well.team.supervisor}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Drilling Engineer</p>
              <p className="text-base font-medium">{well.team.drillingEngineer}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Crew Size</p>
              <p className="text-lg font-bold">{well.team.crewMembers} members</p>
            </div>
          </div>
        </div> */}