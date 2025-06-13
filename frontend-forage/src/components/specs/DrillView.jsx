import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const phases = [
  {
    name: 'Phase 26" x 20"',
    plannedDepth: 400,
    realDepth: 400,
    status: "completed-good",
  },
  {
    name: 'Phase 16" x 13"',
    plannedDepth: 780,
    realDepth: 780,
    status: "completed-good",
  },
  {
    name: 'Phase 12" x 9"',
    plannedDepth: 1500,
    realDepth: 1500,
    status: "completed-bad",
  },
  {
    name: 'Phase 8" x 7"',
    plannedDepth: 2480,
    realDepth: 2480,
    status: "not-completed",
  },
];

// Constants
const MAX_HEIGHT_PX = 500;
const DEPTH_SCALE = MAX_HEIGHT_PX / 4600; // Scale based on max depth
const BASE_SPACING = 40; // Base spacing between phases in pixels
const INITIAL_OFFSET = 100; // Initial offset from the left

const DrillView = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const handleClick = (phase) => {
    setSelectedPhase(phase.name === selectedPhase ? null : phase.name);
  };

  const closePopup = () => {
    setSelectedPhase(null);
  };

  // Dynamic spacing calculation
  const getPhaseSpacing = (index) => {
    return { marginLeft: `-${INITIAL_OFFSET + (index * BASE_SPACING)}px` };
  };

  // Dynamic line width calculation
  const getLineWidth = (index) => {
    return { width: `${50 + (index * BASE_SPACING)}px` };
  };

  // Determine background color based on status
  const getBarColor = (status) => {
    switch (status) {
      case "completed-good":
        return "#00FF26"; // Fluorescent green
      case "completed-bad":
        return "#FF7A47"; // Bright orange
      case "not-completed":
        return "#c9c8c8"; // Light gray (neutral)
      default:
        return "#CCCCCC"; // fallback
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md ring-1 ring-gray-200">
      <h1 className="mt-2 ml-5  text-xl text-gray-700">Vue globale</h1>
      {/* Headers */}
      <div className="flex justify-center gap-32 mb-3" style={{ marginLeft: `-${INITIAL_OFFSET}px` }}>
        <h2 className=" text-lg  text-[#424b24]">Planning</h2>
        <h2 className=" text-lg  text-[#262626]">Réel</h2>
      </div>

      {/* Container for tubes and info */}
      <div className="flex">
        {/* Left part: the tubes */}
        <div className="flex-grow grid grid-cols-2 gap-1">
          {/* Planning Column */}
          <div className="flex flex-col items-center">
            {phases.map((phase, idx) => {
              const height = phase.plannedDepth * DEPTH_SCALE;
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-7 mb-2"
                  style={{ minHeight: "30px" }}
                >
                  {/* Phase name to the left of planning tube */}
                  <div className="text-sm font-medium text-gray-500 w-32 text-right">
                    {phase.name}
                  </div>

                  <div className="flex items-end">
                    {/* Depth on the left */}
                    <span className="text-sm bottom-0 font-semibold mr-2 text-gray-700">
                      {phase.plannedDepth} ft
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
          <div className="flex flex-col items-center">
            {phases.map((phase, idx) => {
              const real = phase.realDepth * DEPTH_SCALE;
              const exceeded = phase.realDepth > phase.plannedDepth;

              // Determine tube color based on status
              let tubeColor = "bg-[#c9c8c8] border-r-[6px] border-[#949494]"; // Default gray for "not-completed"
              if (phase.status === "completed-good") {
                tubeColor = "bg-[#00FF26] border-r-[6px] border-[#216600]";
              } else if (phase.status === "completed-bad") {
                tubeColor = "bg-[#FF7A47] border-r-[6px] border-[#7B2200]";
              }

              return (
                <div key={idx} className="flex items-center mb-2 relative">
                  <div className="flex items-center" style={getPhaseSpacing(idx)}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 rounded-sm cursor-pointer transition-all duration-300 ${tubeColor}`}
                        style={{ height: `${real}px` }}
                        onClick={() => handleClick(phase)}
                      ></div>
                    </div>

                    {/* Depth on the right */}
                    <span
                      className={`text-sm absolute bottom-0 ml-12 font-semibold ${
                        exceeded ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      {phase.realDepth} ft
                    </span>
                  </div>

                  {/* Detailed information display */}
                  {selectedPhase === phase.name && (
                    <div
                      className="absolute right-[-120px] top-1/2 transform translate-x-6 -translate-y-1/2 bg-white border rounded-lg shadow-md p-4 z-10"
                      style={{ width: "300px" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${tubeColor} mr-2`}
                          ></div>
                          <span className="font-medium">{phase.name}</span>
                        </div>
                        <div className="flex items-center">
                          <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded mr-2">
                            View Details
                          </button>
                          <button 
                            onClick={closePopup}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {phase.status === "not-completed" ? (
                        <div className="text-center py-4 text-gray-600 font-medium">
                          not-completed yet
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Etat des Couts</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                phase.status === "completed-good"
                                  ? "bg-green-500 text-white"
                                  : "bg-red-400 text-white"
                              }`}
                            >
                              {phase.status === "completed-good" ? "OK" : "Mauvais"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Etat des Délais</span>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                phase.status === "completed-good"
                                  ? "bg-green-500 text-white"
                                  : "bg-red-400 text-white"
                              }`}
                            >
                              {phase.status === "completed-good" ? "OK" : "Mauvais"}
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
                              {phase.status === "completed-good" ? "2" : "8"} Reported
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