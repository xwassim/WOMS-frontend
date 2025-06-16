import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaFileAlt, FaPlusCircle } from "react-icons/fa";
import logo from "../assets/Sonatrach.png";

function Sidebar({ children }) {
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  // Mettre à jour l'année dynamiquement
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSignOut = () => {
    // Logique de déconnexion
    console.log("Utilisateur déconnecté");
    setShowSignOutModal(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Modal de confirmation de déconnexion */}
      {showSignOutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmer la déconnexion</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-64 bg-[#1C2434] text-white shadow-lg">
        <div className="p-5 border-b border-gray-950">
          <h1 className="text-xl text-center font-semibold tracking-wide">
            ForageVision
          </h1>
        </div>
        <div className="flex justify-center items-center p-4">
          <img src={logo} alt="logo" height="100px" width="69px"></img>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? "bg-[#3C50E0]" : "hover:bg-[#3C50E0]"
                  }`
                }
              >
                <FaHome className="mr-3" />
                <span>Liste des forages</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/submit-report"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? "bg-[#3C50E0]" : "hover:bg-[#3C50E0]"
                  }`
                }
              >
                <FaPlusCircle className="mr-3" />
                <span>Soumettre Rapport</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/planning"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? "bg-[#3C50E0]" : "hover:bg-[#3C50E0]"
                  }`
                }
              >
                <FaFileAlt className="mr-3" />
                <span>Planning</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-[300px] mx-4">
          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center p-2 rounded-lg bg-[#1C2434] hover:bg-[#3C50E0]"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
        <div>
          <p className="text-center text-xs text-gray-400 mt-4">
            © {currentYear} ITech. Tous droits réservés.
          </p>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 overflow-auto">{children}</div>
    </div>
  );
}

export default Sidebar;
