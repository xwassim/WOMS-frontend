
import React from "react";
import { useMemo } from "react";
import { useParams } from 'react-router-dom';
import data from '../../data/data'; // Import your data directly
import CostStatusCard from "../../components/cards/CostStatusCard";
import DelayStatusCard from "../../components/cards/DelayStatusCard";
import CriticalProblemsCard from "../../components/cards/CriticalProblemsCard";
import ProblemDistributionCard from "../../components/cards/ProblemDistributionCard";
import GlobalOverviewCard from "../../components/cards/GlobalOverviewCard";
import PhaseProgressCard from "../../components/cards/PhaseProgressCard";
import { AreaChart, BarChart } from "lucide-react";
import DrillPhasesVisualization from "../../components/specs/DrillPhasesVisualization";
import PhaseDrillingOverview from "../../components/specs/PhaseDrillingOverview";
import DrillView from "../../components/specs/DrillView";

const Dashboard = () => {
  const { wellId } = useParams();
  const selectedWell = useMemo(() => 
    data.drillWells.find(well => well.id === Number(wellId)), 
    [wellId]
  );

  if (!selectedWell) {
    return (
      <div className="p-4 text-red-500">
        Well not found
      </div>
    );
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
        if (Array.isArray(report.problems) && typeof report.problems[0] !== "string") {
          return count + report.problems.length;
        }
        return count;
      }, 0),
    }));

    const depth = selectedWell.planning.phases.reduce(
      (total, phase) => total + phase.depth, 0
    );

    return { visualizationPhases: phases, totalDepth: depth };
  }, [selectedWell]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GlobalOverviewCard well={selectedWell} />
         <DrillView well={selectedWell}/>
         {/* <DrillView/> */}
         
      </div>
     <div className="mt-6  grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <CostStatusCard well={selectedWell} />
         
          <DelayStatusCard well={selectedWell} /> */}
          
          <ProblemDistributionCard well={selectedWell} />
          <CriticalProblemsCard well={selectedWell} />
          {/* <PhaseProgressCard well={selectedWell} /> */}
          <ReportSummaryCard well={selectedWell} />
        </div>
      
      
      
      {/* <DrillPhasesVisualization phases={visualizationPhases} maxDepth={totalDepth} /> */}
     
{/* 
       <PhaseDrillingOverview drillWell={selectedWell} className="mt-8" /> */}
      
      
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
      </div>
    </div>
  );
};

// Extracted report summary card component
const ReportSummaryCard = ({ well }) => (
  <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">
        Report Summary
      </h2>
      <BarChart className="w-5 h-5 text-blue-600" />
    </div>
    <div className="mt-2 space-y-4">
      <SummaryItem 
        label="Daily Reports"
        value={well.phases.flatMap((p) => p.dailyReports).length}
      />
      <SummaryItem 
        label="Problems Reported"
        value={well.phases.flatMap((p) => p.dailyReports).flatMap((r) => r.problems || []).length}
      />
      <SummaryItem 
        label="Operations Recorded"
        value={well.phases.flatMap((p) => p.dailyReports).flatMap((r) => r.operations).length}
      />
      <SummaryItem 
        label="Equipment Used"
        value={new Set(
          well.phases.flatMap((p) => p.dailyReports).flatMap((r) => r.equipmentUsed)
        ).size}
      />
    </div>
  </div>
);

// Extracted summary item component
const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default Dashboard;
