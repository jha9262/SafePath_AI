import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import GoogleMap from '../components/GoogleMap';
import Button from '../components/Button';
import Input from '../components/Input';
import { dangerZoneAPI, routeAPI } from '../services/api';
import { MapPin, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dangerZones, setDangerZones] = useState([]);
  const [routeForm, setRouteForm] = useState({
    source: '',
    destination: '',
    sourceLat: '',
    sourceLng: '',
    destLat: '',
    destLng: ''
  });
  const [routeResult, setRouteResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDangerZones();
  }, []);

  const loadDangerZones = useCallback(async () => {
    try {
      const response = await dangerZoneAPI.getByRadius(40.7128, -74.0060, 10);
      setDangerZones(response.data || []);
    } catch (error) {
      console.error('Failed to load danger zones:', error);
      setDangerZones([]);
    }
  }, []);



  const handleGetSafeRoute = async () => {
    // Check if we have either address names or coordinates
    const hasCoordinates = routeForm.sourceLat && routeForm.sourceLng && routeForm.destLat && routeForm.destLng;
    const hasAddresses = routeForm.source && routeForm.destination;
    
    if (!hasCoordinates && !hasAddresses) {
      toast.error('Please enter either addresses or coordinates for source and destination');
      return;
    }
    
    // If only addresses provided, convert to sample coordinates for demo
    let requestData = { ...routeForm };
    if (!hasCoordinates && hasAddresses) {
      // Sample coordinates for demo (in real app, you'd geocode the addresses)
      requestData.sourceLat = 40.7128; // NYC coordinates as example
      requestData.sourceLng = -74.0060;
      requestData.destLat = 40.7589;
      requestData.destLng = -73.9851;
      toast.info('Using sample coordinates for demo. In production, addresses would be geocoded.');
    }

    setLoading(true);
    try {
      const response = await routeAPI.getSafeRoute({
        sourceLat: parseFloat(requestData.sourceLat),
        sourceLng: parseFloat(requestData.sourceLng),
        destLat: parseFloat(requestData.destLat),
        destLng: parseFloat(requestData.destLng)
      });
      setRouteResult(response.data || null);
      toast.success('Safe route calculated!');
    } catch (error) {
      toast.error('Failed to calculate route');
      setRouteResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (location) => {
    // Allow user to set source or destination by clicking map
    if (!routeForm.sourceLat || !routeForm.sourceLng) {
      setRouteForm(prev => ({
        ...prev,
        sourceLat: location.lat.toString(),
        sourceLng: location.lng.toString(),
        source: `Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }));
      toast.success('Source location set from map!');
    } else if (!routeForm.destLat || !routeForm.destLng) {
      setRouteForm(prev => ({
        ...prev,
        destLat: location.lat.toString(),
        destLng: location.lng.toString(),
        destination: `Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }));
      toast.success('Destination set from map!');
    } else {
      toast.info('Both source and destination are set. Clear them to set new locations.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <div className="flex-1 p-6 ml-64">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-sm h-full p-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                  Interactive Map
                </h3>
                <GoogleMap
                  dangerZones={dangerZones}
                  onLocationSelect={handleMapClick}
                />
              </motion.div>
            </div>

            {/* Route Planning Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-primary-600" />
                  Plan Safe Route
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="Source Location"
                    placeholder="Enter starting point (e.g., Times Square, NYC)"
                    value={routeForm.source}
                    onChange={(e) => setRouteForm({ ...routeForm, source: e.target.value })}
                  />
                  
                  <Input
                    label="Destination"
                    placeholder="Enter destination (e.g., Central Park, NYC)"
                    value={routeForm.destination}
                    onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
                  />
                  
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    💡 Tip: You can also click on the map to set coordinates
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Quick Fill (NYC Examples):</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <button
                        type="button"
                        onClick={() => setRouteForm(prev => ({ ...prev, source: 'Times Square, NYC', sourceLat: '40.7580', sourceLng: '-73.9855' }))}
                        className="p-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Times Square
                      </button>
                      <button
                        type="button"
                        onClick={() => setRouteForm(prev => ({ ...prev, destination: 'Central Park, NYC', destLat: '40.7829', destLng: '-73.9654' }))}
                        className="p-1 bg-green-50 text-green-700 rounded hover:bg-green-100"
                      >
                        Central Park
                      </button>
                      <button
                        type="button"
                        onClick={() => setRouteForm(prev => ({ ...prev, source: 'Brooklyn Bridge, NYC', sourceLat: '40.7061', sourceLng: '-73.9969' }))}
                        className="p-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Brooklyn Bridge
                      </button>
                      <button
                        type="button"
                        onClick={() => setRouteForm(prev => ({ ...prev, destination: 'Empire State, NYC', destLat: '40.7484', destLng: '-73.9857' }))}
                        className="p-1 bg-green-50 text-green-700 rounded hover:bg-green-100"
                      >
                        Empire State
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Source Lat"
                      type="number"
                      step="any"
                      placeholder="40.7128"
                      value={routeForm.sourceLat}
                      onChange={(e) => setRouteForm({ ...routeForm, sourceLat: e.target.value })}
                    />
                    <Input
                      label="Source Lng"
                      type="number"
                      step="any"
                      placeholder="-74.0060"
                      value={routeForm.sourceLng}
                      onChange={(e) => setRouteForm({ ...routeForm, sourceLng: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Dest Lat"
                      type="number"
                      step="any"
                      placeholder="40.7589"
                      value={routeForm.destLat}
                      onChange={(e) => setRouteForm({ ...routeForm, destLat: e.target.value })}
                    />
                    <Input
                      label="Dest Lng"
                      type="number"
                      step="any"
                      placeholder="-73.9851"
                      value={routeForm.destLng}
                      onChange={(e) => setRouteForm({ ...routeForm, destLng: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={handleGetSafeRoute}
                      loading={loading}
                      className="w-full"
                    >
                      🛡️ Calculate Safe Route
                    </Button>
                    
                    <button
                      type="button"
                      onClick={() => setRouteForm({
                        source: '',
                        destination: '',
                        sourceLat: '',
                        sourceLng: '',
                        destLat: '',
                        destLng: ''
                      })}
                      className="w-full text-sm text-gray-600 hover:text-gray-800 py-1"
                    >
                      Clear All Fields
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Route Result */}
              {routeResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Safety Score:</span>
                      <span className="font-semibold text-green-600">
                        {routeResult.safetyScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-semibold">
                        {routeResult.estimatedDistance} km
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Description:</span>
                      <p className="text-sm text-gray-800 mt-1">
                        {routeResult.routeDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danger Zones:</span>
                    <span className="font-semibold text-red-600">{dangerZones.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Safe Areas:</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;