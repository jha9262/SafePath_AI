import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation, MapPin, Target, Zap, Clock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const RoutePanel = ({ onCalculateRoute, routeResult, loading }) => {
  const [routeForm, setRouteForm] = useState({
    source: '',
    destination: ''
  });

  const handleCalculate = () => {
    if (!routeForm.source || !routeForm.destination) {
      toast.error('Please enter both source and destination');
      return;
    }
    onCalculateRoute(routeForm);
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
      className="w-full lg:w-96 h-fit"
    >
      <div className="glass rounded-2xl p-6 border-t-2 border-neon-blue/50">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="relative">
            <Navigation className="w-6 h-6 text-neon-blue animate-pulse" />
            <div className="absolute inset-0 w-6 h-6 bg-neon-blue/30 rounded-full blur-lg" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Route Planner
          </h3>
        </motion.div>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-neon-blue" />
              <span>Source Location</span>
            </label>
            <input
              type="text"
              value={routeForm.source}
              onChange={(e) => setRouteForm({ ...routeForm, source: e.target.value })}
              placeholder="Enter starting point..."
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue/50 focus:outline-none focus:ring-2 focus:ring-neon-blue/20 text-white placeholder-gray-400 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <Target className="w-4 h-4 text-neon-cyan" />
              <span>Destination</span>
            </label>
            <input
              type="text"
              value={routeForm.destination}
              onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
              placeholder="Enter destination..."
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-cyan/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 text-white placeholder-gray-400 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Calculate Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCalculate}
          disabled={loading}
          className="w-full glow-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Calculate Safe Route</span>
            </>
          )}
        </motion.button>

        {/* Route Result */}
        {routeResult && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <div className="glass rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Route Analysis</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Safety Score:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-neon-blue rounded-full transition-all duration-500"
                        style={{ width: `${(routeResult.safetyScore / 10) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-green-400">{routeResult.safetyScore}/10</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300 flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Distance:</span>
                  </span>
                  <span className="font-semibold text-white">{routeResult.estimatedDistance} km</span>
                </div>
                
                <div className="pt-2 border-t border-white/10">
                  <p className="text-sm text-gray-300">{routeResult.routeDescription}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 grid grid-cols-2 gap-2"
        >
          <button className="glass px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-all duration-300">
            Times Square
          </button>
          <button className="glass px-3 py-2 rounded-lg text-xs hover:bg-white/10 transition-all duration-300">
            Central Park
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoutePanel;