import { motion } from 'framer-motion';
import { Bell, User, Moon, Sun } from 'lucide-react';
import { getUserData } from '../utils/auth';
import { useState } from 'react';

const FuturisticTopbar = () => {
  const userData = getUserData();
  const [isDark, setIsDark] = useState(true);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-4 right-4 left-4 md:left-72 z-30"
    >
      <div className="glass rounded-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* App Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <h2 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              SafePathAI
            </h2>
            <p className="text-xs text-gray-400">Intelligent Route Planning</p>
          </motion.div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 glass rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </motion.button>
            
            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 glass rounded-lg px-3 py-2 cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-neon-blue/30 rounded-full blur-lg animate-pulse" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{userData?.name || 'User'}</p>
                <p className="text-xs text-gray-400">{userData?.role || 'Member'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FuturisticTopbar;