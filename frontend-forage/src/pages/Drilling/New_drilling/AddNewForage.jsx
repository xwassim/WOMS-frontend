import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const AddNewForage = () => {
  const [wellName, setWellName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ wellName, siteName, progress });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 ">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-1" /> Retour
        </Link>
      </div>

      <h1 className="text-2xl text-gray-800 mb-6">Ajout d'un nouveau site de Forage</h1>

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
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="ABCD"
            />
          </div>
        </div>

        {/* <div className="mb-6">
          <label className="block text-gray-700 mb-1">Progression</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full"
            />
            <span className="text-gray-700">{progress}%</span>
          </div>
        </div> */}

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Date de creation</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value="22/22/2022"
            readOnly
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