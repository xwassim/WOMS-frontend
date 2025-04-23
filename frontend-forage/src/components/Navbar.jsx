import { HiClock } from 'react-icons/hi'

const Navbar = () => (
  <header className="bg-white shadow-sm">
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        <HiClock className="h-6 w-6 text-blue-500" />
        <span className="text-lg font-semibold">Forage Dashboard</span>
      </div>
      <div className="text-sm text-gray-500">
        {new Date().toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  </header>
)

export default Navbar