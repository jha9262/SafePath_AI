import { useState } from 'react';
import { Home, MapPin, Plus, Minus } from 'lucide-react';

const SimpleDashboard = () => {
  const [zoom, setZoom] = useState(13);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleZoomIn = () => {
    setZoom(prev => prev + 1);
    console.log('Zoom in clicked, new zoom:', zoom + 1);
  };

  const handleZoomOut = () => {
    setZoom(prev => prev - 1);
    console.log('Zoom out clicked, new zoom:', zoom - 1);
  };

  const handleCalculate = () => {
    console.log('Calculate route:', { source, destination });
    alert(`Calculating route from ${source} to ${destination}`);
  };

  const handleMapClick = () => {
    console.log('Map clicked');
    alert('Map clicked! Location selected.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-400">SafePath AI</h1>
          <p className="text-gray-300">Intelligent Route Planning</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 h-96 relative">
              <h3 className="text-xl mb-4">Interactive Map</h3>
              
              {/* Simple Map Placeholder */}
              <div 
                onClick={handleMapClick}
                className="w-full h-64 bg-gradient-to-br from-blue-900 to-gray-700 rounded cursor-pointer flex items-center justify-center border-2 border-blue-500"
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                  <p>Click to select location</p>
                  <p className="text-sm text-gray-400">Zoom: {zoom}</p>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-16 right-6 flex flex-col gap-2">
                <button 
                  onClick={handleZoomIn}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleZoomOut}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Route Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Route Planner
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Source</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter starting point"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-semibold"
              >
                Calculate Safe Route
              </button>
            </div>

            {/* Quick Test Buttons */}
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-400">Quick Test:</p>
              <button
                onClick={() => {
                  setSource('Times Square');
                  setDestination('Central Park');
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm"
              >
                Fill Sample Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;