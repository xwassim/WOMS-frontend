import React, { useState, useEffect, useMemo } from "react";
import {
  FaEye,
  FaDownload,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import data from "../../../data/data";

const ReportsCatalog = () => {
  const { wellId } = useParams();
  const well = data.drillWells.find((w) => w.id === Number(wellId));

  // Formatage des dates
  const formatReportDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString() 
      ? "Aujourd'hui" 
      : date.toLocaleDateString("fr-FR");
  };

  // Préparation des données des rapports
  const allDailyReports = useMemo(() => {
    return well.phases.flatMap((phase) => {
      return phase.dailyReports.map((report) => ({
        ...report,
        id: report.id || `DR-${phase.id}-${new Date(report.date).getTime()}`,
        date: formatReportDate(report.date),
        dateObj: new Date(report.date),
        phaseName: phase.name,
        phaseId: phase.id,
        searchString: `${report.id} ${phase.name} ${formatReportDate(report.date)} ${report.depth || ''} ${report.progress || ''}`.toLowerCase()
      }));
    });
  }, [well]);

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: { start: "", end: "" },
    phase: ""
  });
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const itemsPerPage = 8;

  // Fonction de recherche optimisée
  const filteredReports = useMemo(() => {
    let results = allDailyReports;

    // Filtre par terme de recherche
    if (searchTerm) {
      const terms = searchTerm.toLowerCase().split(/\s+/);
      results = results.filter(report => 
        terms.every(term => report.searchString.includes(term)))
    }

    // Filtre par date
    if (filters.date.start || filters.date.end) {
      const startDate = filters.date.start ? new Date(filters.date.start) : null;
      const endDate = filters.date.end ? new Date(filters.date.end) : null;
      
      results = results.filter(report => {
        const reportDate = report.dateObj;
        return (
          (!startDate || reportDate >= startDate) &&
          (!endDate || reportDate <= endDate)
        );
      });
    }

    // Filtre par phase
    if (filters.phase) {
      results = results.filter(report => 
        report.phaseId.toString() === filters.phase
      );
    }

    return results;
  }, [allDailyReports, searchTerm, filters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setFilters({ date: { start: "", end: "" }, phase: "" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg relative p-6 font-dm-sans">
      {/* En-tête avec barre de recherche */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl text-gray-800">
          Catalogue des rapports 
        </h1>

        <div className="flex items-center space-x-4 flex-wrap justify-end gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterDialog(true)}
            className="flex items-center space-x-2 bg-[#3C50E0] text-white px-4 py-2 rounded-lg hover:bg-[#2f3eb0]"
          >
            <FaFilter />
            <span>Filtrer</span>
          </button>
        </div>
      </div>

      {/* Tableau des résultats */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#ececec]">
            <tr className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {/* <th className="px-6 py-3">ID Rapport</th> */}
              <th className="px-6 py-3">Date de soumission</th>
              <th className="px-6 py-3">Phase</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((report) => (
                <tr
                  key={`${report.phaseId}-${report.id}`}
                  className="border-b border-[#d5d5d5] text-[#1C2434] hover:bg-[#F9FAFB]"
                >
                  {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                    {report.id}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {report.phaseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div className="flex justify-center">
                      <Link to={`${report.phaseId}/${report.id}`}>
                        <button className="text-[#3C50E0] hover:text-[#10B981] flex items-center">
                          <FaEye className="mr-1" /> Aperçu
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  Aucun rapport trouvé avec les filtres actuels
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-gray-700">
          <span className="text-blue-700 font-bold">
            {filteredReports.length}
          </span>{" "}
          rapports au total
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Page <span className="text-blue-700 font-bold">{currentPage}</span>{" "}
            sur {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-100 flex items-center justify-center hover:cursor-pointer"
              title="Précédent"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg text-blue-700 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center hover:cursor-pointer"
              title="Suivant"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dialogue de filtrage (inchangé) */}
      <Dialog
        open={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        PaperProps={{
          style: {
            borderRadius: 16,
            padding: "16px",
            minWidth: "500px",
          },
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Filtrer les rapports
            </h2>
            <button
              onClick={() => setShowFilterDialog(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.date.start}
                onChange={(e) =>
                  setFilters({ ...filters, date: { ...filters.date, start: e.target.value } })
                }
              />
              <TextField
                fullWidth
                label="Date de fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.date.end}
                onChange={(e) =>
                  setFilters({ ...filters, date: { ...filters.date, end: e.target.value } })
                }
              />
            </div>
            <div>
              <TextField
                select
                fullWidth
                label=""
                value={filters.phase}
                onChange={(e) => setFilters({ ...filters, phase: e.target.value })}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Toutes les phases</option>
                {well.phases.map((phase) => (
                  <option key={phase.id} value={phase.id}>
                    {phase.name}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters} style={{backgroundColor: "#eeeeee", color: "#6B7280",borderRadius: "6px" }}>
            Réinitialiser
          </Button>
          <Button
            onClick={() => setShowFilterDialog(false)}
            style={{ backgroundColor: "#3C50E0", color: "white" ,borderRadius: "6px"}}
            variant="contained"
          >
            Appliquer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportsCatalog;