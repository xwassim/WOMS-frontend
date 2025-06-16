import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const AddNewForage = () => {

  const navigate = useNavigate();

  const [wellName, setWellName] = useState('');
  const [location, setLocation] = useState('');
  const [progress, setProgress] = useState(0);
  const [plannedEndDate, setPlannedEndDate] = useState("");
  const [startDate, setStartDate] = useState((new Date().toISOString().split('T')[0]));


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      wellName:wellName, // à ajouter dans le modèle backend si ce n’est pas encore fait
      location:location,
      progress:progress,
      startDate:startDate,
      plannedEndDate:plannedEndDate, // à remplacer dynamiquement
      status: "On going", // ou selon un champ à ajouter
      totalCost: 0,
      plannedCost1:1025000,
      plannedCost2:3805000,
      plannedCost3:5860000,
      plannedCost4:9265000,
      plannedDay1:2,
      plannedDay2:15,
      plannedDay3:33,
      plannedDay4:69,
      plannedDepth1:"3300",
      plannedDepth2:"6300",
      plannedDepth3:"9100",
      plannedDepth4:"9600",
      type: "Pétrolier" // temporaire, ou à faire saisir
    };
    try {
      const response = await axios.post("http://localhost:9090/api/drillwells", payload);
      console.log("Forage ajouté :", response.data);
      navigate('/');
      // Redirection ou message de succès
    } catch (error) {
      console.error("Erreur lors de l'ajout du forage :", error);
      // Gérer l'affichage d'une erreur
    }
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/operator-view" className="flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-1" /> Retour
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajout d'un nouveau site de Forage</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Nom du puît</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={wellName}
              onChange={(e) => setWellName(e.target.value)}
              placeholder="ABCD"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nom du site</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="ABCD"
            />
          </div>
        </div>

        

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Date de creation</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Date de fin prévue</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={plannedEndDate}
            onChange={(e) => setPlannedEndDate(e.target.value)}
          />
        </div>        

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Ajouter le planning prévisionnel</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Ajouter le fichier en format excel</span>
                  <input type="file" className="sr-only" accept=".xlsx,.xls" />
                </label>
              </div>
              <p className="text-xs text-gray-500">XLSX, XLS up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewForage;