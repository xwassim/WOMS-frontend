import { NavLink } from 'react-router-dom'
import { FiHome, FiFilePlus, FiSettings } from 'react-icons/fi'

const Sidebar = () => (
  <nav className="w-64 bg-white shadow-sm p-4">
    <div className="space-y-2">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `flex items-center p-2 rounded-lg ${
            isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <FiHome className="mr-3" />
        Dashboard
      </NavLink>
      <NavLink
        to="/rapports"
        className={({ isActive }) => 
          `flex items-center p-2 rounded-lg ${
            isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <FiFilePlus className="mr-3" />
        Rapports
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => 
          `flex items-center p-2 rounded-lg ${
            isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <FiSettings className="mr-3" />
        Paramètres
      </NavLink>
    </div>
  </nav>
)

export default Sidebar