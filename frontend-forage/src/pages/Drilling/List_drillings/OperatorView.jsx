import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPlus,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import data from "../../../data/data";

const OperatorView = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const itemsPerPage = 8;

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [drillingSites, setDrillingSites] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/drillwells")
      .then((response) => {
        const formattedData = response.data.map((well) => ({
          id: well.id,
          wellName: well.wellName || `Puit #${well.id}`,
          siteName: well.location,
          endDate: well.plannedEndDate,
          status: well.status,
          statusColor: getStatusColor(well.status),
          progress: well.progress || 0,
        }));
        setDrillingSites(formattedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des forages:", error);
      });
  }, []);

  /*const [drillingSites, setDrillingSites] = useState(
    data.drillWells.map((well) => ({
      id: well.id,
      wellName: well.name,
      siteName: well.siteName,
      endDate: well.endDate,
      status: well.status,
      statusColor: getStatusColor(well.status),
      progress: well.progress,
      // You can add more fields from your data.js if needed
      totalCost: well.totalCost,
      delay: well.delay,
      location: well.location,
    }))
  );*/

  // Helper function to determine status color
  function getStatusColor(status) {
    switch (status) {
      case "On going":
        return "bg-yellow-500";
      case "Delayed":
        return "bg-red-500";
      case "At Risk":
        return "bg-orange-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  }

  const [filteredSites, setFilteredSites] = useState(drillingSites);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let results = drillingSites;

    // Apply search filter
    if (searchTerm.trim() !== "") {
      results = results.filter((site) => {
        return Object.values(site).some((val) =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter((site) => site.status === statusFilter);
    }

    // Apply progress filter
    if (progressFilter !== "all") {
      switch (progressFilter) {
        case "low":
          results = results.filter((site) => site.progress < 30);
          break;
        case "medium":
          results = results.filter(
            (site) => site.progress >= 30 && site.progress < 70
          );
          break;
        case "high":
          results = results.filter(
            (site) => site.progress >= 70 && site.progress < 100
          );
          break;
        case "completed":
          results = results.filter((site) => site.progress === 100);
          break;
      }
    }

    // Apply date range filter
    if (dateRange.start || dateRange.end) {
      results = results.filter((site) => {
        const siteDate = new Date(site.endDate);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && siteDate < startDate) return false;
        if (endDate && siteDate > endDate) return false;
        return true;
      });
    }

    setFilteredSites(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, progressFilter, dateRange, drillingSites]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSites.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewGlobalDashboard = (wellId) => {
    navigate(`/global-dashboard/${wellId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setProgressFilter("all");
    setDateRange({ start: "", end: "" });
    setSearchTerm("");
  };

  return (
    <div className="p-6 font-dm-sans bg-white rounded-lg shadow-lg relative ">
      {/* Header with title, search and pagination controls */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl  text-[#4C506B]">
          Liste des sites de forages
        </h1>

        <div className="flex items-center space-x-4 flex-wrap justify-end gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilterDialog(true)}
            className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            <FaFilter />
            <span>Filtrer</span>
          </button>

          <Link
            to="/add-new-forage"
            className="bg-[#3C50E0] text-white px-4 py-2 rounded-lg hover:bg-[#445aff] flex items-center space-x-2"
          >
            <FaPlus />
            <span>Ajouter un forage</span>
          </Link>
        </div>
      </div>

      {/* Sites table */}
      <div className="overflow-x-auto rounded-lg border border-[#e6e5e5] mb-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[#e4e4e4] bg-[#ececec] text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
              <th className="text-left py-3 px-4 rounded-tl-lg">Nom du Puit</th>
              <th className="text-left py-3 px-4">Nom du site</th>
              <th className="text-left py-3 px-4">Date de fin prevu</th>
              <th className="text-left py-3 px-4">Progression</th>
              <th className="text-left py-3 px-4">Etat</th>
              <th className="text-left py-3 px-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((site) => (
                <tr
                  key={site.id}
                  className="border-b border-[#d5d5d5]  text-[#1C2434] hover:bg-[#F9FAFB]"
                >
                  <td className="py-3 px-4 text-[#1C2434] ">{site.wellName}</td>
                  <td className="py-3 px-4 text-[#1C2434]">{site.siteName}</td>
                  <td className="py-3 px-4 text-[#1C2434]">
                    {formatDate(site.endDate)}
                  </td>
                  <td className="py-3 px-4 text-[#4C506B]">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full max-w-[145px] ${site.statusColor}`}
                        style={{ width: `${site.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#4C506B]">
                      {site.progress}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4C506B]">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${site.statusColor} text-white`}
                    >
                      {site.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4C506B]">
                    <div className="flex space-x-4">
                      <Link
                        to={`well/${site.id}/Dash`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Dashboard
                      </Link>
                  
                      <Link
                        to={`/planning`} // Updated to dynamic route
                        className="text-orange-600 hover:text-orange-800 underline"
                      >
                        Planning
                      </Link>
                      <Link
                        to={`/well/${site.id}/reports`} // Updated to dynamic route
                        className="text-purple-600 hover:text-purple-800 underline"
                      >
                        Rapports
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  Aucun site de forage trouvé avec les filtres actuels
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with total count */}
      <div className="flex justify-between items-center w-full">
        <p className="text-sm text-black">
          <span className="text-blue-700 font-bold">
            {filteredSites.length}
          </span>{" "}
          sites de forage au total
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-black">
            Page <span className="text-blue-700 font-bold">{currentPage}</span>{" "}
            sur {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#000000] rounded-lg text-[#4C506B] disabled:opacity-50 hover:bg-[#F3F4F6] flex items-center justify-center hover:cursor-pointer"
              title="Précédent"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-[#000000] rounded-lg text-blue-700 hover:bg-[#F3F4F6] disabled:opacity-50 flex items-center justify-center hover:cursor-pointer"
              title="Suivant"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
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
              Filtrer les sites
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
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Statut"
              >
                <MenuItem value="all">Tous les statuts</MenuItem>
                <MenuItem value="On going">En cours</MenuItem>
                <MenuItem value="Delayed">Retardé</MenuItem>
                <MenuItem value="At risk">À risque</MenuItem>
                <MenuItem value="Completed">Terminé</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Progression</InputLabel>
              <Select
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                label="Progression"
              >
                <MenuItem value="all">Toutes les progressions</MenuItem>
                <MenuItem value="low">Faible (0-30%)</MenuItem>
                <MenuItem value="medium">Moyenne (30-70%)</MenuItem>
                <MenuItem value="high">Élevée (70-99%)</MenuItem>
                <MenuItem value="completed">Terminé (100%)</MenuItem>
              </Select>
            </FormControl>

            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Date de fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters} style={{ color: "#6B7280" }}>
            Réinitialiser
          </Button>
          <Button
            onClick={() => setShowFilterDialog(false)}
            style={{ backgroundColor: "#3B82F6", color: "white" }}
            variant="contained"
          >
            Appliquer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OperatorView;
