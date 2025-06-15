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
import AddNewForage from "./pages/Drilling/New_drilling/AddNewForage";
import WellLayout from "./components/Wells/WellLayout"; // New layout component for well-specific pages
import Dashboard from "./pages/Dashboard/Dashboard"; // Test component for testing purposes

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main layout route */}
        <Route
          element={
            <div className="h-screen bg-gray-100">
              <Sidebar>
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-4">
                    <Routes>
                      <Route path="/" element={<OperatorView />} />
                      <Route
                        path="/submit-report"
                        element={<ReportSubmission />}
                      />
                      <Route
                        path="/submission-success"
                        element={<SubmissionSuccess />}
                      />
                      <Route
                        path="/add-new-forage"
                        element={<AddNewForage />}
                      />

                      <Route path="/planning" element={<DrillingPlanning />} />
                      <Route path="/well/:wellId" element={<WellLayout />}>
                        {/* <Route path="/add_report" element={<AddReport />} /> */}
                        <Route path="Dash" element={<Dashboard />} />

                        <Route path="reports">
                          <Route index element={<ReportsCatalog />} />
                          <Route
                            path=":phaseId/:reportId"
                            element={<ReportOverview />}
                          />
                        </Route>
                      </Route>
                    </Routes>
                  </main>
                </div>
              </Sidebar>
            </div>
          }
        >
          {/* These routes will inherit the main layout */}
          <Route path="/" element={<OperatorView />} />
          {/* <Route path="/operator-view" element={<OperatorView />} /> */}
          <Route path="/submit-report" element={<ReportSubmission />} />
          <Route path="/submission-success" element={<SubmissionSuccess />} />
          <Route path="/add-new-forage" element={<AddNewForage />} />
          <Route path="/planning" element={<DrillingPlanning />} />

          {/* Well-specific nested routes with their own layout */}
          <Route path="/well/:wellId" element={<WellLayout />}>
            <Route index path="Dash" element={<Dashboard />} />
            <Route path="reports">
              <Route index element={<ReportsCatalog />} />
              <Route path=":phaseId/:reportId" element={<ReportOverview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
