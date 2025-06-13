import { useState, useMemo } from "react";
import { 
  DollarSign, Clock, Ruler, AlertCircle, Layers, 
  ChevronRight, ChevronDown, Filter, Check 
} from "lucide-react";

const Card = ({ children, className = '' }) => (
  <div className={`border rounded-lg bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-4 border-t ${className}`}>{children}</div>
);

const Progress = ({ value, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-blue-500 h-2 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    secondary: 'bg-blue-100 text-blue-800',
    outline: 'border border-gray-300 bg-transparent'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    destructive: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    ghost: 'hover:bg-gray-100 text-gray-800',
    link: 'text-blue-600 hover:underline p-0 h-auto'
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Separator = ({ className = '' }) => (
  <div className={`border-t border-gray-200 ${className}`}></div>
);

const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="tabs">
      {React.Children.map(children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className = '' }) => (
  <div className={`flex border-b ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className = '' }) => (
  <button
    className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === value ? 'border-blue-500 text-blue-600' : 'border-transparent hover:border-gray-300'} ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }) => (
  <div className={`p-4 ${activeTab === value ? 'block' : 'hidden'}`}>
    {children}
  </div>
);

const Switch = ({ checked, onCheckedChange, id }) => (
  <button
    id={id}
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
    onClick={() => onCheckedChange(!checked)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const Label = ({ htmlFor, children, className = '' }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
    {children}
  </label>
);
const PhaseDrillingOverview = ({ drillWell }) => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [showProblemsOnly, setShowProblemsOnly] = useState(false);

  // Memoize calculations to avoid recomputing on every render
  const { delayedPhases, costOverrunPhases, depthDeviationPhases, totalProblems } = useMemo(() => {
    const delayed = drillWell.phases.filter((phase) => {
      const planningPhase = drillWell.planning.phases.find((p) => p.name === phase.name);
      return planningPhase && phase.totalDuration > planningPhase.totalDuration;
    }).length;

    const costOverrun = drillWell.phases.filter((phase) => {
      const planningPhase = drillWell.planning.phases.find((p) => p.name === phase.name);
      return planningPhase && phase.totalCost > planningPhase.totalCost * 1.1;
    }).length;

    const depthDeviation = drillWell.phases.filter((phase) => {
      const planningPhase = drillWell.planning.phases.find((p) => p.name === phase.name);
      return planningPhase && Math.abs(phase.totalDepth - planningPhase.depth) > planningPhase.depth * 0.05;
    }).length;

    const problems = drillWell.phases.reduce((count, phase) => {
      return count + phase.dailyReports.reduce((problemCount, report) => {
        return problemCount + (Array.isArray(report.problems) && typeof report.problems[0] !== "string" 
          ? report.problems.length 
          : 0);
      }, 0);
    }, 0);

    return { 
      delayedPhases: delayed, 
      costOverrunPhases: costOverrun, 
      depthDeviationPhases: depthDeviation, 
      totalProblems: problems 
    };
  }, [drillWell]);

  const filteredPhases = useMemo(() => {
    return showProblemsOnly
      ? drillWell.phases.filter((phase) =>
          phase.dailyReports.some(
            (report) =>
              report.hasProblem ||
              (Array.isArray(report.problems) &&
              typeof report.problems[0] !== "string" &&
              report.problems.length > 0
          )
        )
      )
      : drillWell.phases;
  }, [drillWell.phases, showProblemsOnly]);

  const statusSummary = useMemo(() => {
    const parts = [];
    if (delayedPhases > 0) parts.push(`${delayedPhases} phase${delayedPhases > 1 ? "s" : ""} delayed`);
    if (costOverrunPhases > 0) parts.push(`${costOverrunPhases} cost overrun${costOverrunPhases > 1 ? "s" : ""}`);
    if (depthDeviationPhases > 0) parts.push(`${depthDeviationPhases} depth deviation${depthDeviationPhases > 1 ? "s" : ""}`);
    return parts.length > 0 ? parts.join(", ") : "All phases on track";
  }, [delayedPhases, costOverrunPhases, depthDeviationPhases]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Phases de forage</h2>
          <p className="text-gray-500">{statusSummary}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="show-problems" checked={showProblemsOnly} onCheckedChange={setShowProblemsOnly} />
          <Label htmlFor="show-problems" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Show only phases with problems
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhases.map((phase) => (
          <PhaseCard 
            key={phase.id}
            phase={phase}
            drillWell={drillWell}
            expandedPhase={expandedPhase}
            setExpandedPhase={setExpandedPhase}
          />
        ))}
      </div>
    </div>
  );
};

// Extracted PhaseCard component for better readability and performance
const PhaseCard = ({ phase, drillWell, expandedPhase, setExpandedPhase }) => {
  const planningPhase = drillWell.planning.phases.find((p) => p.name === phase.name);
  if (!planningPhase) return null;

  const { 
    costVariance, costVariancePercent, 
    durationVariance, depthVariance, depthVariancePercent,
    costStatus, delayStatus, depthStatus,
    problemCount 
  } = useMemo(() => {
    const costVariance = phase.totalCost - planningPhase.totalCost;
    const costVariancePercent = (costVariance / planningPhase.totalCost) * 100;
    const durationVariance = phase.totalDuration - planningPhase.totalDuration;
    const depthVariance = phase.totalDepth - planningPhase.depth;
    const depthVariancePercent = (depthVariance / planningPhase.depth) * 100;

    const costStatus = costVariancePercent > 10 ? "destructive" : costVariancePercent > 5 ? "warning" : "success";
    const delayStatus = durationVariance > 5 ? "destructive" : durationVariance > 2 ? "warning" : "success";
    const depthStatus = Math.abs(depthVariancePercent) > 5
      ? "destructive"
      : Math.abs(depthVariancePercent) > 2
      ? "warning"
      : "success";

    const problemCount = phase.dailyReports.reduce((count, report) => {
      return count + (Array.isArray(report.problems) && typeof report.problems[0] !== "string" 
        ? report.problems.length 
        : 0);
    }, 0);

    return { 
      costVariance, costVariancePercent, 
      durationVariance, depthVariance, depthVariancePercent,
      costStatus, delayStatus, depthStatus,
      problemCount 
    };
  }, [phase, planningPhase]);

  const isExpanded = expandedPhase === phase.id;

  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isExpanded ? "col-span-full" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{phase.name}</CardTitle>
          <Badge variant={
            phase.status === "Completed" ? "success" : 
            phase.status === "Not Started" ? "secondary" : "default"
          }>
            {phase.status}
          </Badge>
        </div>
        <CardDescription>
          {phase.status === "Completed" ? `Completed on ${phase.endDate}` :
           phase.status === "Not Started" ? "Not started yet" :
           `Started on ${phase.startDate}`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <PhaseMetrics 
          phase={phase}
          planningPhase={planningPhase}
          costStatus={costStatus}
          delayStatus={delayStatus}
          depthStatus={depthStatus}
          costVariancePercent={costVariancePercent}
          durationVariance={durationVariance}
          depthVariancePercent={depthVariancePercent}
          problemCount={problemCount}
        />
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-1"
          onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
        >
          {isExpanded ? "Hide Details" : "View Details"}
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CardFooter>

      {isExpanded && (
        <PhaseDetails 
          phase={phase}
          planningPhase={planningPhase}
          costStatus={costStatus}
          delayStatus={delayStatus}
          depthStatus={depthStatus}
          costVariance={costVariance}
          costVariancePercent={costVariancePercent}
          durationVariance={durationVariance}
          depthVariance={depthVariance}
          depthVariancePercent={depthVariancePercent}
          problemCount={problemCount}
        />
      )}
    </Card>
  );
};

// Extracted metrics display component
const PhaseMetrics = ({
  phase,
  planningPhase,
  costStatus,
  delayStatus,
  depthStatus,
  costVariancePercent,
  durationVariance,
  depthVariancePercent,
  problemCount
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{phase.progress}%</span>
      </div>
      <Progress value={phase.progress} className="h-2" />
    </div>

    <div className="grid grid-cols-3 gap-2">
      <MetricBox 
        icon={<DollarSign className="h-3 w-3" />}
        label="Cost"
        value={`${costVariancePercent > 0 ? "+" : ""}${costVariancePercent.toFixed(1)}%`}
        status={costStatus}
      />
      <MetricBox 
        icon={<Clock className="h-3 w-3" />}
        label="Time"
        value={`${durationVariance > 0 ? "+" : ""}${durationVariance} days`}
        status={delayStatus}
      />
      <MetricBox 
        icon={<Ruler className="h-3 w-3" />}
        label="Depth"
        value={`${depthVariancePercent > 0 ? "+" : ""}${depthVariancePercent.toFixed(1)}%`}
        status={depthStatus}
      />
    </div>

    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-1">
        <Layers className="h-4 w-4 text-gray-500" />
        <span>{planningPhase.depth} ft planned</span>
      </div>
      {problemCount > 0 && (
        <Badge variant="outline" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {problemCount} {problemCount === 1 ? "Problem" : "Problems"}
        </Badge>
      )}
    </div>
  </div>
);

// Reusable metric box component
const MetricBox = ({ icon, label, value, status }) => {
  const statusClasses = {
    destructive: "bg-red-50 border-red-200 text-red-600",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-600",
    success: "bg-green-50 border-green-200 text-green-600"
  };

  return (
    <div className={`p-2 rounded-md border ${statusClasses[status]}`}>
      <div className="flex items-center gap-1 text-xs font-medium mb-1">
        {icon}
        {label}
      </div>
      <div className={`text-xs font-semibold`}>
        {value}
      </div>
    </div>
  );
};

// Extracted phase details component
const PhaseDetails = ({
  phase,
  planningPhase,
  costStatus,
  delayStatus,
  depthStatus,
  costVariance,
  costVariancePercent,
  durationVariance,
  depthVariance,
  depthVariancePercent,
  problemCount
}) => (
  <div className="px-6 pb-6 pt-2">
    <Separator className="mb-6" />
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="problems">Problems ({problemCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComparisonCard 
            title="Cost Status"
            icon={<DollarSign className="h-4 w-4" />}
            plannedValue={`$${planningPhase.totalCost.toLocaleString()}`}
            actualValue={`$${phase.totalCost.toLocaleString()}`}
            variance={`${costVariance > 0 ? "+" : ""}$${costVariance.toLocaleString()} (${costVariancePercent.toFixed(1)}%)`}
            status={costStatus}
            statusLabel={
              costStatus === "destructive" ? "Exceeded" : 
              costStatus === "warning" ? "Warning" : "On Budget"
            }
          />
          
          <ComparisonCard 
            title="Timeline Status"
            icon={<Clock className="h-4 w-4" />}
            plannedValue={`${planningPhase.totalDuration} days`}
            actualValue={`${phase.totalDuration} days`}
            variance={`${durationVariance > 0 ? "+" : ""}${durationVariance} days`}
            status={delayStatus}
            statusLabel={
              delayStatus === "destructive" ? "Delayed" : 
              delayStatus === "warning" ? "Slight Delay" : "On Schedule"
            }
          />
          
          <ComparisonCard 
            title="Depth Status"
            icon={<Ruler className="h-4 w-4" />}
            plannedValue={`${planningPhase.depth} ft`}
            actualValue={`${phase.totalDepth} ft`}
            variance={`${depthVariance > 0 ? "+" : ""}${depthVariance} ft (${depthVariancePercent.toFixed(1)}%)`}
            status={depthStatus}
            statusLabel={
              depthStatus === "destructive" ? "Significant Deviation" : 
              depthStatus === "warning" ? "Minor Deviation" : "On Target"
            }
          />
        </div>

        <DepthVisualization 
          plannedDepth={planningPhase.depth}
          actualDepth={phase.totalDepth}
        />
      </TabsContent>

      <TabsContent value="costs">
        <CostBreakdown 
          phase={phase}
          planningPhase={planningPhase}
          costVariance={costVariance}
          costVariancePercent={costVariancePercent}
        />
      </TabsContent>

      <TabsContent value="timeline">
        <TimelineAnalysis 
          phase={phase}
          planningPhase={planningPhase}
          durationVariance={durationVariance}
        />
      </TabsContent>

      <TabsContent value="problems">
        <ProblemsTab problemCount={problemCount} phase={phase} />
      </TabsContent>
    </Tabs>
  </div>
);

// Reusable comparison card component
const ComparisonCard = ({ 
  title, 
  icon, 
  plannedValue, 
  actualValue, 
  variance, 
  status, 
  statusLabel 
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Planned</span>
          <span className="font-medium">{plannedValue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Actual</span>
          <span className="font-medium">{actualValue}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Variance</span>
          <span className={`font-medium ${
            status === "destructive" ? "text-red-600" : 
            status === "warning" ? "text-yellow-600" : "text-green-600"
          }`}>
            {variance}
          </span>
        </div>
        <div className="pt-2">
          <Badge variant={status}>
            {statusLabel}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Depth visualization component
const DepthVisualization = ({ plannedDepth, actualDepth }) => (
  <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-8 bg-gray-300/20 relative">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500/30"
          style={{ width: `${(plannedDepth / 2500) * 100}%` }}
        >
          <div className="absolute -top-4 right-0 text-xs font-medium">
            {plannedDepth} ft (planned)
          </div>
        </div>
        {actualDepth > 0 && (
          <div
            className="absolute top-0 left-0 h-full bg-blue-500"
            style={{ width: `${(actualDepth / 2500) * 100}%` }}
          >
            <div className="absolute -bottom-4 right-0 text-xs font-medium">
              {actualDepth} ft (actual)
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Cost breakdown component
const CostBreakdown = ({ phase, planningPhase, costVariance, costVariancePercent }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Cost Breakdown</CardTitle>
        <CardDescription>Detailed cost analysis for {phase.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Planned Cost</span>
            <span>${planningPhase.totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Actual Cost</span>
            <span>${phase.totalCost.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-medium">Variance</span>
            <span className={costVariance > 0 ? "text-red-600" : "text-green-600"}>
              {costVariance > 0 ? "+" : ""}
              {costVariance.toLocaleString()} ({costVariancePercent.toFixed(1)}%)
            </span>
          </div>

          <div className="pt-4">
            <div className="text-sm font-medium mb-2">Cost per Day</div>
            <div className="space-y-2">
              {phase.dailyReports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex justify-between items-center text-sm">
                  <span>Day {report.actual_day}</span>
                  <span>${report.dailyCost.toLocaleString()}</span>
                </div>
              ))}
              {phase.dailyReports.length > 5 && (
                <Button variant="link" className="p-0 h-auto text-xs">
                  View all {phase.dailyReports.length} days
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Timeline analysis component
const TimelineAnalysis = ({ phase, planningPhase, durationVariance }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Timeline Analysis</CardTitle>
        <CardDescription>Schedule comparison for {phase.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Planned Duration</span>
            <span>{planningPhase.totalDuration} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Actual Duration</span>
            <span>{phase.totalDuration} days</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-medium">Variance</span>
            <span className={durationVariance > 0 ? "text-red-600" : "text-green-600"}>
              {durationVariance > 0 ? "+" : ""}
              {durationVariance} days
            </span>
          </div>

          <div className="pt-4">
            <div className="text-sm font-medium mb-2">Timeline</div>
            <TimelineVisualization 
              plannedDuration={planningPhase.totalDuration}
              actualDuration={phase.totalDuration}
            />
          </div>

          <div className="pt-4">
            <div className="text-sm font-medium mb-2">Key Dates</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Start Date</span>
                <span>{phase.startDate || "Not started"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>End Date</span>
                <span>{phase.endDate || "Not completed"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Timeline visualization component
const TimelineVisualization = ({ plannedDuration, actualDuration }) => (
  <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-8 bg-gray-300/20 relative">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500/30"
          style={{ width: `${(plannedDuration / 30) * 100}%` }}
        >
          <div className="absolute -top-4 right-0 text-xs font-medium">
            {plannedDuration} days (planned)
          </div>
        </div>
        {actualDuration > 0 && (
          <div
            className="absolute top-0 left-0 h-full bg-blue-500"
            style={{ width: `${(actualDuration / 30) * 100}%` }}
          >
            <div className="absolute -bottom-4 right-0 text-xs font-medium">
              {actualDuration} days (actual)
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Problems tab component
const ProblemsTab = ({ problemCount, phase }) => (
  <div className="space-y-4">
    {problemCount === 0 ? (
      <NoProblemsMessage />
    ) : (
      <ProblemsList phase={phase} />
    )}
  </div>
);

// No problems message component
const NoProblemsMessage = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <Check className="h-12 w-12 text-green-500 mb-4" />
    <h3 className="text-lg font-medium">No problems reported</h3>
    <p className="text-gray-500">
      This phase has been running smoothly without any reported issues.
    </p>
  </div>
);

// Problems list component
const ProblemsList = ({ phase }) => (
  <div className="space-y-4">
    {phase.dailyReports.map((report) => {
      if (!Array.isArray(report.problems) || typeof report.problems[0] === "string") {
        return null;
      }

      return report.problems.map((problem) => (
        <ProblemCard 
          key={`${report.id}-${problem.id}`}
          report={report}
          problem={problem}
        />
      ));
    })}
  </div>
);

// Problem card component
const ProblemCard = ({ report, problem }) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-base">{problem.name}</CardTitle>
        <Badge variant={problem.status === "Resolved" ? "success" : "destructive"}>
          {problem.status}
        </Badge>
      </div>
      <CardDescription>
        Reported on {report.date} - Type: {problem.type} - Severity: {problem.severity}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Cost Impact</div>
            <div className="text-sm text-red-600">
              ${problem.impact.cost.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Delay Impact</div>
            <div className="text-sm text-red-600">{problem.impact.delay} days</div>
          </div>
        </div>

        {problem.hasSolution && problem.solutions && problem.solutions.length > 0 && (
          <SolutionsList solutions={problem.solutions} />
        )}
      </div>
    </CardContent>
  </Card>
);

// Solutions list component
const SolutionsList = ({ solutions }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium">Solutions</div>
    <ul className="list-disc pl-5 text-sm space-y-1">
      {solutions.map((solution, index) => (
        <li key={index}>{solution}</li>
      ))}
    </ul>
  </div>
);

export default PhaseDrillingOverview;