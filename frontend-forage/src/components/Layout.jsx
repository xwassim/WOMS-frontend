import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => (
  <div className="flex flex-col h-screen bg-white">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  </div>
)

export default Layout