import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, User, LogOut, Shield } from 'lucide-react';
import { removeToken, removeUserData } from '../utils/auth';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUserData();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: AlertTriangle, label: 'Report Danger', path: '/report-danger' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-10"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="w-8 h-8 text-primary-600" />
          <h1 className="text-xl font-bold text-gray-800">SafePath AI</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;