import { useEffect, useRef, useState, useCallback } from 'react';

const GoogleMap = ({ 
  onLocationSelect, 
  dangerZones = [], 
  center = { lat: 40.7128, lng: -74.0060 },
  zoom = 13 
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map only once
  useEffect(() => {
    if (!window.google && !isLoaded) {
      // Create a simple div placeholder when Google Maps is not available
      const mapDiv = mapRef.current;
      if (mapDiv) {
        mapDiv.innerHTML = `
          <div style="
            width: 100%; 
            height: 400px; 
            background: #f0f0f0; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border-radius: 8px;
            color: #666;
            font-family: Arial, sans-serif;
          ">
            <div style="text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
              <div>Google Maps will load here</div>
              <div style="font-size: 12px; margin-top: 8px;">Add your Google Maps API key</div>
            </div>
          </div>
        `;
        
        // Add click handler for the placeholder
        mapDiv.onclick = () => {
          if (onLocationSelect) {
            onLocationSelect({ lat: center.lat, lng: center.lng });
          }
        };
      }
      setIsLoaded(true);
    }
  }, [center.lat, center.lng, onLocationSelect, isLoaded]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-sm"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMap;