import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FuturisticSidebar from '../components/FuturisticSidebar';
import FuturisticTopbar from '../components/FuturisticTopbar';
import FuturisticMap from '../components/FuturisticMap';
import RoutePanel from '../components/RoutePanel';
import { dangerZoneAPI, routeAPI } from '../services/api';
import toast from 'react-hot-toast';

const FuturisticDashboard = () => {
  const [dangerZones, setDangerZones] = useState([]);
  const [routeResult, setRouteResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDangerZones = useCallback(async () => {
    try {
      const response = await dangerZoneAPI.getByRadius(40.7128, -74.0060, 10);
      setDangerZones(response.data || []);
    } catch (error) {
      console.error('Failed to load danger zones:', error);
      setDangerZones([]);
    }
  }, []);

  useEffect(() => {
    loadDangerZones();
  }, [loadDangerZones]);

  const handleCalculateRoute = async (routeData) => {
    setLoading(true);
    try {
      // Convert addresses to coordinates (simplified for demo)
      const requestData = {
        sourceLat: 40.7128,
        sourceLng: -74.0060,
        destLat: 40.7589,
        destLng: -73.9851
      };

      const response = await routeAPI.getSafeRoute(requestData);
      setRouteResult(response.data);
      toast.success('Safe route calculated!');
    } catch (error) {
      toast.error('Failed to calculate route');
      setRouteResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    console.log('Map clicked:', location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <FuturisticSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-0">
          {/* Topbar */}
          <FuturisticTopbar />
          
          {/* Content Area */}
          <div className="flex-1 pt-20 p-4 md:p-6">
            <div className="h-full flex flex-col lg:flex-row gap-6">
              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 min-h-[400px] lg:min-h-0"
              >
                <FuturisticMap
                  dangerZones={dangerZones}
                  onLocationSelect={handleMapClick}
                />
              </motion.div>

              {/* Route Panel */}
              <div className="lg:flex-shrink-0">
                <RoutePanel
                  onCalculateRoute={handleCalculateRoute}
                  routeResult={routeResult}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 left-6 hidden xl:block"
      >
        <div className="glass rounded-lg p-4 space-y-2">
          <div className="text-xs text-gray-400">System Status</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-white">AI Online</span>
          </div>
          <div className="text-xs text-gray-400">
            Danger Zones: <span className="text-neon-blue font-semibold">{dangerZones.length}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FuturisticDashboard;