import React, { useState } from "react";
import { DollarSign, Clock } from "lucide-react";
import CostStatusCard from "./CostStatusCard";
import DelayStatusCard from "./DelayStatusCard";

const GlobalOverviewCard = ({ well }) => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate global metrics
  const actualGlobalCost = well.actualGlobalCost;
  const plannedGlobalCost = well.planning?.plannedGlobalCost || actualGlobalCost; ;
  const costVariance = actualGlobalCost - plannedGlobalCost;
  const costVariancePercentage = Math.round((costVariance / plannedGlobalCost) * 100);

  const actualGlobalDuration = well.actualGlobalDuration;
  const plannedGloablDuration = well.planning?.plannedGlobalDuration || actualGlobalDuration;
  const delayDays = well.delay || 0;

  // Calculate phase metrics
  const getPhaseMetrics = (phase) => {
    const plannedPhase = well.planning?.phases?.find(p => p.id === phase.id) || {};
    
    return {
      actualPhaseCost: phase.actualPhaseCost,
      plannedTotalCost: plannedPhase.plannedPhaseCost || phase.actualPhaseCost,
      costVariance: phase.actualPhaseCost - (plannedPhase.plannedPhaseCost || phase.actualPhaseCost),
      costVariancePercentage: Math.round(((phase.actualPhaseCost - (plannedPhase.plannedPhaseCost || phase.actualPhaseCost)) / (plannedPhase.plannedPhaseCost || phase.actualPhaseCost)) * 100),
      actualPhaseDuration: phase.actualPhaseDuration,
      plannedPhaseDuration: plannedPhase.plannedPhaseDuration || phase.actualPhaseDuration,
      delayDays: phase.actualPhaseDuration - (plannedPhase.plannedPhaseDuration || phase.actualPhaseDuration)
    };
  };

  const phaseMetrics = selectedPhase ? getPhaseMetrics(selectedPhase) : null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl text-gray-800">
        {selectedPhase ? `Détails de la  ${selectedPhase.name}` : "Tableau de bord"}
      </h2>
      
      {/* Phase Selector - Always visible */}
      <div className="my-3">
        <p className="text-md text-gray-600 mb-2">
          {selectedPhase ? "Autres phases disponibles:" : "Sélectionnez une phase pour voir ses détails :"}
        </p>
        <div className="flex flex-wrap gap-2">
          {well.phases.map((phase, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                selectedPhase?.id === phase.id 
                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                  : phase.status === "completed-good"
                  ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
                  : phase.status === "completed-bad"
                  ? "bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
        <h1 className=" mt-6 text-xl">Vue globale sur le puit</h1>
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
                  {formatCurrency(actualGlobalCost)}
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Budget Prévisionnel</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(plannedGlobalCost)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Écart</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    costVariance > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {costVariance > 0 ? "+" : ""}
                    {formatCurrency(costVariance)}
                  </p>
                  <p className={`text-sm ${
                    costVariance > 0 ? "text-red-500" : "text-green-500"
                  }`}>
                    ({costVariancePercentage}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CostStatusCard well={well} />

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
                  {actualGlobalDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 tracking-wider">Durée Prévisionnelle</p>
                <p className="text-lg font-bold text-gray-700">
                  {plannedGloablDuration} jours
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 tracking-wider">État du Planning</p>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    delayDays > 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {delayDays > 0 ? `+${delayDays} jours` : "Dans les temps"}
                  </p>
                  {delayDays > 0 && (
                    <p className="text-xs text-red-500">
                      {((delayDays / plannedGloablDuration) * 100).toFixed(1)}% de retard
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DelayStatusCard well={well} />
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