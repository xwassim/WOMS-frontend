import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const DrillPhasesVisualization = ({ phases, maxDepth }) => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  // Calculate cumulative depths once
  const cumulativeDepths = useMemo(() => {
    return phases.reduce((acc, phase, index) => {
      const prevDepth = index > 0 ? acc[index - 1] : 0;
      acc.push(prevDepth + phase.plannedDepth);
      return acc;
    }, []);
  }, [phases]);

  const togglePhaseDetails = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - Visualization */}
        <div className="lg:col-span-6">
          <VisualizationContainer phases={phases} maxDepth={maxDepth} cumulativeDepths={cumulativeDepths} />
        </div>

        {/* Right column - Phase cards */}
        <div className="lg:col-span-6 space-y-4">
          {phases.map((phase) => (
            <PhaseCard 
              key={phase.id}
              phase={phase}
              isExpanded={expandedPhase === phase.id}
              togglePhaseDetails={togglePhaseDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Extracted visualization container component
const VisualizationContainer = ({ phases, maxDepth, cumulativeDepths }) => (
  <div className="border rounded-lg bg-white">
    <div className="p-4 border-b">
      <h3 className="font-semibold">Drilling Phases Visualization</h3>
    </div>
    <div className="p-4">
      <div className="relative h-[600px] w-full">
        {phases.map((phase, index) => (
          <PhaseVisualization 
            key={phase.id}
            phase={phase}
            index={index}
            maxDepth={maxDepth}
            cumulativeDepths={cumulativeDepths}
          />
        ))}
        <TotalDepthMarker maxDepth={maxDepth} />
        <GuideLines />
      </div>
    </div>
  </div>
);

// Extracted phase visualization component
const PhaseVisualization = ({ phase, index, maxDepth, cumulativeDepths }) => {
  const previousDepth = index > 0 ? cumulativeDepths[index - 1] : 0;
  const startPosition = (previousDepth / maxDepth) * 100;
  const endPosition = (cumulativeDepths[index] / maxDepth) * 100;
  const height = endPosition - startPosition;

  // Calculate the width between lines
  const maxSeparation = 40;
  const minSeparation = 10;
  const depthRatio = previousDepth / maxDepth;
  const separation = maxSeparation - depthRatio * (maxSeparation - minSeparation);

  // Calculate positions for planning and actual lines
  const planningPosition = 50 - separation / 2;
  const actualPosition = 50 + separation / 2;

  // Determine color for actual line
  const depthColor = phase.status !== "Not Started"
    ? phase.depth > phase.plannedDepth ? "bg-orange-500" : "bg-green-500"
    : "bg-gray-300";

  // Calculate the height of the actual line
  const actualLineHeight = phase.status !== "Not Started"
    ? phase.depth > phase.plannedDepth
      ? `${(phase.depth / phase.plannedDepth) * 110}%`
      : `${(phase.depth / phase.plannedDepth) * 100}%`
    : "0%";

  return (
    <div
      className="absolute w-full"
      style={{ top: `${startPosition}%`, height: `${height}%` }}
    >
      {/* Planned depth on the left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pr-2 w-1/4 text-right">
        <div className="text-xs text-gray-500">{phase.plannedDepth} ft</div>
      </div>

      {/* Phase name in the middle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 text-center"
        style={{
          left: `${planningPosition}%`,
          width: `${actualPosition - planningPosition}%`,
        }}
      >
        <div className="text-xs font-medium">{phase.name}</div>
      </div>

      {/* Planning line */}
      <div
        className="absolute top-0 bg-blue-500 -translate-x-1/2"
        style={{
          left: `${planningPosition}%`,
          height: "100%",
          width: "4px",
        }}
      ></div>

      {/* Actual line */}
      <div
        className={`absolute top-0 ${depthColor} -translate-x-1/2`}
        style={{
          left: `${actualPosition}%`,
          height: actualLineHeight,
          width: "4px",
        }}
      ></div>

      {/* Actual depth label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pl-2 w-1/4">
        <div className="text-xs text-gray-500">
          {phase.status !== "Not Started" ? `${phase.depth} ft` : "Not started"}
        </div>
      </div>
    </div>
  );
};

// Extracted total depth marker component
const TotalDepthMarker = ({ maxDepth }) => (
  <div className="absolute left-0 bottom-4 w-full text-center">
    <div className="text-sm font-medium">{maxDepth} ft</div>
  </div>
);

// Extracted guide lines component
const GuideLines = () => (
  <>
    <div
      className="absolute top-0 bottom-0 border-l border-dashed border-gray-300"
      style={{ left: `${50 - 40 / 2}%` }}
    ></div>
    <div
      className="absolute top-0 bottom-0 border-l border-dashed border-gray-300"
      style={{ left: `${50 + 40 / 2}%` }}
    ></div>
    <div className="absolute top-0 w-full border-t border-dashed border-gray-300"></div>
    <div className="absolute bottom-0 w-full border-t border-dashed border-gray-300"></div>
  </>
);

// Extracted phase card component
const PhaseCard = ({ phase, isExpanded, togglePhaseDetails }) => (
  <div className="border rounded-lg bg-white overflow-hidden">
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{phase.name}</h3>
        <StatusBadge status={phase.status} />
      </div>

      {isExpanded ? (
        <ExpandedPhaseDetails phase={phase} togglePhaseDetails={togglePhaseDetails} />
      ) : (
        <CollapsedPhaseDetails phase={phase} togglePhaseDetails={togglePhaseDetails} />
      )}
    </div>
  </div>
);

// Extracted status badge component
const StatusBadge = ({ status }) => {
  const statusClasses = {
    "Not Started": "bg-gray-200 text-gray-800",
    "Completed": "bg-green-100 text-green-800",
    "In Progress": "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

// Extracted expanded phase details component
const ExpandedPhaseDetails = ({ phase, togglePhaseDetails }) => (
  <div className="space-y-4">
    {phase.status === "Not Started" ? (
      <NotStartedMessage />
    ) : (
      <PhaseMetrics phase={phase} />
    )}

    <button
      className="w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-1"
      onClick={() => togglePhaseDetails(phase.id)}
    >
      Hide Details
    </button>
  </div>
);

// Extracted not started message component
const NotStartedMessage = () => (
  <div className="p-4 bg-gray-100 rounded-md text-center">
    <p className="text-gray-500">This phase hasn't started yet</p>
  </div>
);

// Extracted phase metrics component
const PhaseMetrics = ({ phase }) => (
  <div className="grid grid-cols-2 gap-4">
    <MetricItem 
      label="Cost Status"
      value={phase.costStatus}
      status={phase.costStatus === "OK" ? "success" : "error"}
    />
    <MetricItem 
      label="Delay Status"
      value={phase.delayStatus}
      status={phase.delayStatus === "OK" ? "success" : "error"}
    />
    <MetricItem 
      label="Depth"
      value={phase.depthStatus}
      status={
        phase.depthStatus === "OK" ? "success" : 
        phase.depthStatus === "Exceeded" ? "error" : "warning"
      }
      additionalValue={`${phase.depth} ft`}
    />
    <MetricItem 
      label="Problems"
      value={phase.problems === 0 ? "OK" : `${phase.problems} Reported`}
      status={phase.problems === 0 ? "success" : "default"}
    />
  </div>
);

// Extracted metric item component
const MetricItem = ({ label, value, status, additionalValue }) => {
  const statusClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    default: "border border-gray-300 bg-white"
  };

  return (
    <div>
      <div className="text-sm font-medium mb-1">{label}</div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {value}
      </span>
      {additionalValue && <span className="ml-2 text-sm">{additionalValue}</span>}
    </div>
  );
};

// Extracted collapsed phase details component
const CollapsedPhaseDetails = ({ phase, togglePhaseDetails }) => (
  <button
    className="w-full px-4 py-2 rounded-md hover:bg-gray-100 flex items-center justify-between"
    onClick={() => togglePhaseDetails(phase.id)}
  >
    <span>{phase.status === "Not Started" ? "Phase Not Started" : "View Details"}</span>
    <ChevronRight className="h-4 w-4" />
  </button>
);

export default DrillPhasesVisualization;