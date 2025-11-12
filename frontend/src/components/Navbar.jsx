import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import { getUserData } from '../utils/auth';

const Navbar = () => {
  const userData = getUserData();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 ml-64"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {userData?.name}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;