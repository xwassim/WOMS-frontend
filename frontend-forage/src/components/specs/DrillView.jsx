import React, { useState } from "react";

const MAX_HEIGHT_PX = 520;
const DEPTH_SCALE = MAX_HEIGHT_PX / 8500;
const BASE_SPACING = 40;
const INITIAL_OFFSET = 70;

const DrillView = ({ well }) => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const getProblemCount = (phase) => {
    if (!phase.dailyReports) return 0;
    return phase.dailyReports.reduce((total, report) => {
      return total + (report.problems ? report.problems.length : 0);
    }, 0);
  };

  const handleClick = (phase) => {
    setSelectedPhase(phase.id === selectedPhase?.id ? null : phase);
  };

  const closePopup = () => {
    setSelectedPhase(null);
  };

  const getPhaseMetrics = (phase) => {
    const plannedPhase = well.planning?.phases?.find(p => p.id === phase.id) || {};
    
    // Use planned depth if phase is not completed and actual depth is 0 or undefined
    const displayDepth = phase.status === "not-completed" && (!phase.actualPhaseDepth || phase.actualPhaseDepth === 0)
      ? plannedPhase.plannedPhaseDepth
      : phase.actualPhaseDepth;

    return {
      phaseName: phase.name,
      phaseStatus: phase.status,
      actualPhaseCost: phase.actualPhaseCost,
      actualPhaseDuration: phase.actualPhaseDuration,
      displayDepth: displayDepth,
      plannedPhaseCost: plannedPhase.plannedPhaseCost,
      plannedPhaseDuration: plannedPhase.plannedPhaseDuration,
      plannedPhaseDepth: plannedPhase.plannedPhaseDepth,
      costVariance: phase.actualPhaseCost - plannedPhase.plannedPhaseCost,
      durationVariance: phase.actualPhaseDuration - plannedPhase.plannedPhaseDuration,
      depthVariance: displayDepth - plannedPhase.plannedPhaseDepth,
      numberOfProblems: getProblemCount(phase),
    };
  };

  const getBarColor = (status) => {
    switch (status) {
      case "completed-good":
        return "bg-[#00FF26] border-r-[6px] border-[#216600]";
      case "completed-bad":
        return "bg-[#FF7A47] border-r-[6px] border-[#7B2200]";
      case "not-completed":
        return "bg-[#c9c8c8] border-r-[6px] border-[#949494]";
      default:
        return "bg-[#CCCCCC] border-r-[6px] border-[#999999]";
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md ring-1 ring-gray-200">
          <h2 className="text-2xl text-gray-800 mt-6 ml-6">
      Vue d'Ensemble du Forage
      </h2>
      <div className="flex justify-center gap-32 my-3" style={{ marginLeft: `-${INITIAL_OFFSET}px` }}>
        <h2 className="text-lg font-medium  text-[#424b24]">Planning</h2>
        <h2 className="text-lg font-medium  text-[#262626]">Réel</h2>
      </div>

      <div className="flex">
        <div className="flex-grow grid grid-cols-2 gap-1">
          {/* Planning Column */}
          <div className="flex flex-col items-center">
            {well.planning?.phases?.map((phase, idx) => {
              const height = phase.plannedPhaseDepth * DEPTH_SCALE;
              return (
                <div key={`planning-${phase.id}`} className="flex items-start mb-2  " style={{ minHeight: "30px" }}>
                  <div className="text-sm font-medium text-gray-500 w-36 text-left">
                    {phase.name}
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bottom-0 font-semibold mr-2 text-gray-700">
                      {phase.plannedPhaseDepth} ft
                    </span>
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-[#D4DF00] w-10 rounded-sm relative border-l-[6px] border-[#4B6100]"
                        style={{ height: `${height}px` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real Column */}
          <div className="flex flex-col  items-center">
            {well.phases?.map((phase, idx) => {
              const plannedPhase = well.planning?.phases?.find(p => p.id === phase.id);
              const phaseMetrics = getPhaseMetrics(phase);
              const realHeight = phaseMetrics.displayDepth * DEPTH_SCALE;
              const exceeded = plannedPhase ? phaseMetrics.displayDepth > plannedPhase.plannedPhaseDepth : false;
              const tubeColor = getBarColor(phase.status);

              return (
                <div key={`real-${phase.id}`} className="flex items-center mb-2 relative ">
                  <div className="flex items-end" style={{ marginLeft: `-${INITIAL_OFFSET + (idx * BASE_SPACING)}px` }}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 rounded-sm cursor-pointer transition-all duration-300 ${tubeColor}`}
                        style={{ height: `${realHeight}px` }}
                        onClick={() => handleClick(phase)}
                      ></div>
                    </div>
                    <span className={`text-sm ml-2 font-semibold ${exceeded ? "text-red-500" : "text-gray-700"}`}>
                      {phaseMetrics.displayDepth} ft
                    </span>
                  </div>

                  {selectedPhase?.id === phase.id && (
                    <div className="absolute right-[-120px] top-1/2 transform translate-x-6 -translate-y-1/2 bg-white border rounded-lg shadow-md p-4 z-10" style={{ width: "300px" }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${tubeColor.split(' ')[0]} mr-2`}></div>
                          <span className="font-medium">{phase.name}</span>
                        </div>
                        <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      {phase.status === "not-completed" ? (
                        <div className="text-center py-4 text-gray-600 font-medium">
                          Non complétée
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Etat des Couts</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                phaseMetrics.costVariance <= 0
                                  ? "bg-green-500 text-white"
                                  : "bg-red-400 text-white"
                              }`}
                            >
                              {phaseMetrics.costVariance <= 0 ? "OK" : "Mauvais"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Etat des Délais</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                phaseMetrics.durationVariance <= 0
                                  ? "bg-green-500 text-white"
                                  : "bg-red-400 text-white"
                              }`}
                            >
                              {phaseMetrics.durationVariance <= 0 ? "OK" : "Mauvais"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Profondeur</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                exceeded
                                  ? "bg-red-400 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {exceeded ? "Excédée" : "OK"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Problemes</span>
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-300 text-gray-700">
                              {phaseMetrics.numberOfProblems} signalés
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillView;