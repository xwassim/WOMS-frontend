import React, { useState ,useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const MAX_HEIGHT_PX = 520;
const DEPTH_SCALE = MAX_HEIGHT_PX / 8500;
const BASE_SPACING = 40;
const INITIAL_OFFSET = 70;

const DrillView = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const phases = [
    { id: 1, name: 'Phase 26\" x 20\" inchs' },
    { id: 2, name: 'Phase 16\" x 13\" inchs' },
    { id: 3, name: 'Phase 12\" x 9\" inchs' },
    { id: 4, name: 'Phase 8\" x 7\" inchs' }
  ];
  //const wellId=64;
  const { wellId } = useParams();
  const [selectedWellback, setSelectedWellback] = useState(null);
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

  if (!selectedWellback) {
    return <div className="text-center py-4 text-gray-600">Chargement du puits...</div>;
  }


  /*const getProblemCount = (phase) => {
    if (!phase.dailyReports) return 0;
    return phase.dailyReports.reduce((total, report) => {
      return total + (report.problems ? report.problems.length : 0);
    }, 0);
  };*/



  const handleClick = (phase) => {
    setSelectedPhase(phase.id === selectedPhase?.id ? null : phase);
  };

  const closePopup = () => {
    setSelectedPhase(null);
  };

  const getPhaseMetrics = (phase) => {

    let plannedDepth = 0;
    let actualDepth = 0;
   
    const currentPhaseId = selectedWellback.phaseId || 0;

    switch (phase.id) {
      case 1:
        plannedDepth = selectedWellback.plannedDepth1 || 0;
        actualDepth = selectedWellback.depth1 || 0;
        break;
      case 2:
        plannedDepth = Math.max(
          (selectedWellback.plannedDepth2 || 0) - (selectedWellback.plannedDepth1 || 0),
          0
        );
        actualDepth = Math.max(
          (selectedWellback.depth2 || 0) - (selectedWellback.depth1 || 0),
          0
        );
        break;
      case 3:
        plannedDepth = Math.max(
          (selectedWellback.plannedDepth3 || 0) - (selectedWellback.plannedDepth2 || 0),
          0
        );
        actualDepth = Math.max(
          (selectedWellback.depth3 || 0) - (selectedWellback.depth2 || 0),
          0
        );
        break;
      case 4:
        plannedDepth = Math.max(
          (selectedWellback.plannedDepth4 || 0) - (selectedWellback.plannedDepth3 || 0),
          0
        );
        actualDepth = Math.max(
          (selectedWellback.depth4 || 0) - (selectedWellback.depth3 || 0),
          0
        );
        break;
      default:
        plannedDepth = 0;
        actualDepth = 0;
    }

    let status = "completed-good" ;
    let danger = 0;

     // 🔁 Forcer à afficher plannedDepth si la phase n'est pas encore atteinte
    if (currentPhaseId < phase.id) {
      actualDepth = plannedDepth;
      status = "not-completed" ;
    }
    
    
    if (plannedDepth < actualDepth) {
      status = "completed-bad";
      danger = 1;
    }
    


      // Use planned depth if phase is not completed and actual depth is 0 or undefined


      return {

        plannedDepth,
        actualDepth,
        depthdifference : actualDepth - plannedDepth,
        status,
        danger,
        //numberOfProblems: getProblemCount(phase),
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
          <h2 className="text-xl text-gray-800 mt-6 ml-6">
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
            {phases.map((phase, idx) => {
              const height = getPhaseMetrics(phase).plannedDepth * DEPTH_SCALE;
              return (
                <div key={`planning-${phase.id}`} className="flex items-start mb-2  " style={{ minHeight: "30px" }}>
                  <div className="text-sm font-medium text-gray-500 w-36 text-left">
                    {phase.name} 
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bottom-0 font-semibold mr-2 text-gray-700">
                      {getPhaseMetrics(phase).plannedDepth} ft
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
            {phases.map((phase, idx) => {
              const phaseMetrics = getPhaseMetrics(phase);
              const realHeight = phaseMetrics.actualDepth * DEPTH_SCALE;
              const tubeColor = getBarColor(phaseMetrics.status);

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
                    <span className={`text-sm ml-2 font-semibold ${getPhaseMetrics(phase).danger ? "text-red-500" : "text-gray-700"}`}>
                      {phaseMetrics.actualDepth} ft
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
                            <span className="text-sm">Profondeur</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                getPhaseMetrics(phase).danger
                                  ? "bg-red-400 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {getPhaseMetrics(phase).danger ? "Excédée" : "OK"}
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