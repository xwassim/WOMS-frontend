import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const SubmissionSuccess = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto text-center">
      <div className="flex justify-center mb-4">
        <FaCheckCircle className="text-green-500 text-5xl" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Félicitation</h1>
      <p className="text-lg text-gray-600 mb-6">Rapport soumis avec succès !</p>
      
      <div className="border-t pt-4">
        <h3 className="text-md font-semibold mb-2">File Version</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center">
            <input type="checkbox" id="line" className="mr-2" disabled />
            <label htmlFor="line">Line des forages</label>
          </div>
          <div className="flex items-center justify-center">
            <input type="checkbox" id="params" className="mr-2" checked disabled />
            <label htmlFor="params">Paramètres</label>
          </div>
          <div className="flex items-center justify-center">
            <input type="checkbox" id="logout" className="mr-2" disabled />
            <label htmlFor="logout">Se Déconnecter</label>
          </div>
        </div>
      </div>

      <Link
        to="/operator-view"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Poursuivre
      </Link>
    </div>
  );
};

export default SubmissionSuccess;   