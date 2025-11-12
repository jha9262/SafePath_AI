import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import GoogleMap from '../components/GoogleMap';
import Button from '../components/Button';
import { AlertTriangle, MapPin } from 'lucide-react';
import { dangerZoneAPI } from '../services/api';
import toast from 'react-hot-toast';

const ReportDanger = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const dangerCategories = [
    { value: 'POTHOLE', label: 'Pothole', color: 'bg-yellow-500' },
    { value: 'ACCIDENT_SPOT', label: 'Accident Spot', color: 'bg-red-500' },
    { value: 'POORLY_LIT_ROAD', label: 'Poorly Lit Road', color: 'bg-purple-500' },
    { value: 'CRIME_PRONE', label: 'Crime Prone Area', color: 'bg-orange-500' }
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    toast.success('Location selected! Choose a danger category.');
  };

  const handleSubmit = async () => {
    if (!selectedLocation || !category) {
      toast.error('Please select a location and danger category');
      return;
    }

    setLoading(true);
    try {
      await dangerZoneAPI.report({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        category
      });
      
      toast.success('Danger zone reported successfully!');
      setSelectedLocation(null);
      setCategory('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to report danger zone');
    } finally {
      setLoading(false);
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
                  Select Danger Location
                </h3>
                <p className="text-gray-600 mb-4">Click on the map to select the danger zone location</p>
                <GoogleMap
                  onLocationSelect={handleLocationSelect}
                  center={selectedLocation || { lat: 40.7128, lng: -74.0060 }}
                />
                {selectedLocation && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Report Form Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Report Danger Zone
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Danger Category
                    </label>
                    <div className="space-y-2">
                      {dangerCategories.map((cat) => (
                        <motion.button
                          key={cat.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCategory(cat.value)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                            category === cat.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${cat.color}`}></div>
                          <span className="font-medium text-gray-800">{cat.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-800 mb-3">Report Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-800">
                          {selectedLocation ? 'Selected' : 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="text-gray-800">
                          {category ? dangerCategories.find(c => c.value === category)?.label : 'Not selected'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!selectedLocation || !category}
                    className="w-full"
                    size="lg"
                  >
                    Submit Report
                  </Button>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 rounded-xl p-6 mt-6"
              >
                <h4 className="font-medium text-blue-900 mb-3">How to Report</h4>
                <ol className="text-sm text-blue-800 space-y-2">
                  <li>1. Click on the map to select the danger location</li>
                  <li>2. Choose the appropriate danger category</li>
                  <li>3. Review your report and submit</li>
                </ol>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDanger;