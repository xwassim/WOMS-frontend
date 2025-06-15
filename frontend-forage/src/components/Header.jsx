import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const currentDate = new Date().toLocaleString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Plateforme de Suivis des Forages</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-500 text-sm">
            {currentDate}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;