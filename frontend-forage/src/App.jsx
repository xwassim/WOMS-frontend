import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OperatorView from "./pages/Drilling/List_drillings/OperatorView";
import ReportOverview from "./pages/Reports/Report_Overview/ReportOverview";
import DrillingPlanning from "./pages/Drilling/DrillingPlanning";
import ReportsCatalog from "./pages/Reports/Reports_List/ReportsCatalog";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./pages/Login/LoginPage";
import ReportSubmission from "./pages/Reports/Report_Submission/ReportSubmission";
import SubmissionSuccess from "./pages/Reports/Report_Submission/SubmissionSuccess";
import SubmissionWaiting from "./pages/Reports/Report_Submission/SubmissionWaiting";
import GlobalDashboard from "./pages/Dashboard/GlobalDashboard";
import PhaseDashboard from "./pages/Dashboard/PhaseDashboard";
import AddNewForage from "./pages/Drilling/New_drilling/AddNewForage";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<OperatorView />} />
              <Route path="/operator-view" element={<OperatorView />} />
              <Route path="/report-overview" element={<ReportOverview />} />
              <Route path="/drilling-planning" element={<DrillingPlanning />} />
              <Route path="/reports-catalog" element={<ReportsCatalog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/submit-report" element={<ReportSubmission />} />
              <Route
                path="/submission-success"
                element={<SubmissionSuccess />}
              />
              <Route
                path="/global-dashboard/:wellId"
                element={<GlobalDashboard />}
              />
              <Route
                path="/phase-dashboard/:wellId"
                element={<PhaseDashboard />}
              />
              <Route path="/add-new-forage" element={<AddNewForage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
