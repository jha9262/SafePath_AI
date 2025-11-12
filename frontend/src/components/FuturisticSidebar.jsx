import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, User, LogOut, Shield, Menu, X } from 'lucide-react';
import { removeToken, removeUserData } from '../utils/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';

const FuturisticSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden glass p-3 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-64 glass-dark z-50 md:translate-x-0 md:relative md:z-auto"
      >
        <div className="p-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="relative">
              <Shield className="w-10 h-10 text-neon-blue animate-glow" />
              <div className="absolute inset-0 w-10 h-10 bg-neon-blue/20 rounded-full blur-xl animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
                SafePath
              </h1>
              <p className="text-xs text-gray-400">AI Navigation</p>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 border border-neon-blue/30 shadow-lg shadow-neon-blue/20'
                        : 'hover:bg-white/5 hover:border hover:border-white/10'
                    }`
                  }
                >
                  <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:text-neon-blue group-hover:drop-shadow-lg`} />
                  <span className="font-medium group-hover:text-white">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
        
        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-6 right-6"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-red-500/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FuturisticSidebar;