import { motion } from 'framer-motion';
import { useState } from 'react';
import { ZoomIn, ZoomOut, Navigation, MapPin } from 'lucide-react';

const FuturisticMap = ({ dangerZones = [], onLocationSelect }) => {
  const [zoom, setZoom] = useState(13);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 20));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 1));

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to mock coordinates
    const lat = 40.7128 + (y - rect.height / 2) * 0.001;
    const lng = -74.0060 + (x - rect.width / 2) * 0.001;
    
    if (onLocationSelect) {
      onLocationSelect({ latLng: { lat: () => lat, lng: () => lng } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-full rounded-2xl overflow-hidden"
    >
      {/* Map Container */}
      <div 
        className="w-full h-full relative bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 cursor-crosshair z-0"
        onClick={handleMapClick}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Map Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto"
            >
              <div className="w-full h-full border-4 border-neon-blue/30 border-t-neon-blue rounded-full" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Interactive Map</h3>
              <p className="text-gray-300">Click anywhere to set location</p>
              <div className="text-sm text-neon-blue">
                🗺️ Google Maps integration ready
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone Markers */}
        {dangerZones.map((zone, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute w-6 h-6 -translate-x-3 -translate-y-3"
            style={{
              left: `${50 + (zone.longitude + 74.0060) * 1000}%`,
              top: `${50 - (zone.latitude - 40.7128) * 1000}%`
            }}
          >
            <div className="w-full h-full bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
            <div className="absolute inset-0 w-full h-full bg-red-500/30 rounded-full blur-sm animate-ping" />
          </motion.div>
        ))}

        {/* Sample Locations */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-4 h-4 -translate-x-2 -translate-y-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full bg-neon-blue rounded-full shadow-lg shadow-neon-blue/50" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
            Times Square
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/3 w-4 h-4 -translate-x-2 -translate-y-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="w-full h-full bg-neon-cyan rounded-full shadow-lg shadow-neon-cyan/50" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
            Central Park
          </div>
        </motion.div>
      </div>

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
        <button
          onClick={handleZoomIn}
          className="glass p-3 rounded-lg hover:bg-white/20 transition-all duration-300 group cursor-pointer"
        >
          <ZoomIn className="w-5 h-5 text-white group-hover:text-neon-blue pointer-events-none" />
        </button>
        
        <button
          onClick={handleZoomOut}
          className="glass p-3 rounded-lg hover:bg-white/20 transition-all duration-300 group cursor-pointer"
        >
          <ZoomOut className="w-5 h-5 text-white group-hover:text-neon-blue pointer-events-none" />
        </button>
        
        <button
          onClick={() => console.log('Recenter clicked')}
          className="glass p-3 rounded-lg hover:bg-white/20 transition-all duration-300 group cursor-pointer"
        >
          <Navigation className="w-5 h-5 text-white group-hover:text-neon-blue pointer-events-none" />
        </button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg z-10">
        <span className="text-sm text-white">Zoom: {zoom}</span>
      </div>

      {/* Report Button */}
      <button
        onClick={() => console.log('Report danger clicked')}
        className="absolute bottom-4 right-4 glow-button flex items-center space-x-2 z-20 cursor-pointer"
      >
        <MapPin className="w-5 h-5 pointer-events-none" />
        <span className="pointer-events-none">Report Danger</span>
      </button>
    </motion.div>
  );
};

export default FuturisticMap;