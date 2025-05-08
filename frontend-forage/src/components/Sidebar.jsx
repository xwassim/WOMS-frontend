import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaCalendarAlt,
  FaFileAlt,
  FaPlusCircle,
} from "react-icons/fa";
import logo from "../assets/Sonatrach.png"; // Adjust the path as necessary

function Sidebar({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 bg-[#1C2434] text-white shadow-lg">
        <div className="p-5 border-b border-gray-950">
          <h1 className="text-xl text-center font-semibol d">
            Drilling Management
          </h1>
        </div>
        <div className="flex justify-center items-center p-4">
          <img src={logo} alt="logo" height="100px" width="69px"></img>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/operator-view"
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

            {/* <li>
            <NavLink
              to="/drilling-planning"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : "hover:bg-blue-700"
                }`
              }
            >
              <FaCalendarAlt className="mr-3" />
              <span>Drilling Planning</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports-catalog"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-blue-700" : "hover:bg-blue-700"
                }`
              }
            >
              <FaFileAlt className="mr-3" />
              <span>Reports Catalog</span>
            </NavLink>
          </li> */}
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
          </ul>
        </nav>
      </div>
      <div className="flex-1 bg-gray-100 overflow-auto">{children}</div>
    </div>
  );
}

export default Sidebar;
