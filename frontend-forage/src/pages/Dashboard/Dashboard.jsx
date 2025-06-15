import React from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import data from "../../data/data";
import CriticalProblemsCard from "../../components/cards/CriticalProblemsCard";
import ProblemDistributionCard from "../../components/cards/ProblemDistributionCard";
import GlobalOverviewCard from "../../components/cards/GlobalOverviewCard";
import DrillView from "../../components/specs/DrillView";
const Dashboard = () => {
  const { wellId } = useParams();
  const selectedWell = useMemo(
    () => data.drillWells.find((well) => well.id === Number(wellId)),
    [wellId]
  );

  if (!selectedWell) {
    return <div className="p-4 text-red-500">Well not found</div>;
  }

  // Prepare visualization data
  const { visualizationPhases, totalDepth } = useMemo(() => {
    const phases = selectedWell.phases.map((phase) => ({
      id: phase.id,
      name: phase.name.replace("Phase ", ""),
      status: phase.status,
      depth: phase.totalDepth || 0,
      plannedDepth: phase.plannedDepth || 0,
      costStatus: phase.costStatus || "OK",
      delayStatus: phase.delayStatus || "OK",
      depthStatus: phase.depthStatus || "OK",
      problems: phase.dailyReports.reduce((count, report) => {
        if (
          Array.isArray(report.problems) &&
          typeof report.problems[0] !== "string"
        ) {
          return count + report.problems.length;
        }
        return count;
      }, 0),
    }));

    const depth = selectedWell.planning.phases.reduce(
      (total, phase) => total + phase.depth,
      0
    );

    return { visualizationPhases: phases, totalDepth: depth };
  }, [selectedWell]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GlobalOverviewCard well={selectedWell} />
        <DrillView well={selectedWell} />
      </div>
      <div className="mt-6  grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProblemDistributionCard well={selectedWell} />
        <div className="col-span-1 lg:col-span-2">
          <CriticalProblemsCard well={selectedWell} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
