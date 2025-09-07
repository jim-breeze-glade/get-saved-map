import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Church, CHURCH_COLORS } from '../types/Church';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ChurchMapProps {
  churches: Church[];
  selectedChurch?: Church | null;
  onChurchSelect?: (church: Church) => void;
}

// Create custom colored markers for each church category
const createCustomIcon = (color: string) => {
  // Sanitize color input to prevent XSS - only allow valid CSS color values
  const sanitizedColor = color.match(/^#[0-9A-Fa-f]{6}$/) ? color : '#666666';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${sanitizedColor};
        border: 2px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to fit map bounds to markers with better zoom handling
const MapBounds: React.FC<{ churches: Church[] }> = ({ churches }) => {
  const map = useMap();

  React.useEffect(() => {
    if (churches.length > 0) {
      const bounds = L.latLngBounds(
        churches.map(church => [church.latitude, church.longitude])
      );
      
      // Calculate the area to determine appropriate zoom settings
      const latSpan = bounds.getNorth() - bounds.getSouth();
      const lngSpan = bounds.getEast() - bounds.getWest();
      
      // Dynamic padding based on the spread of churches
      let padding: [number, number] = [20, 20];
      if (latSpan > 8 || lngSpan > 8) {
        // Large states like California, Texas - use more padding
        padding = [50, 50];
      } else if (latSpan < 2 && lngSpan < 2) {
        // Small states like Delaware, Rhode Island - use less padding
        padding = [10, 10];
      }
      
      // Set max zoom to prevent over-zooming on single churches
      const maxZoom = churches.length === 1 ? 10 : 12;
      
      map.fitBounds(bounds, { 
        padding: padding as L.PointTuple,
        maxZoom: maxZoom 
      });
    }
  }, [churches, map]);

  return null;
};

const ChurchMap: React.FC<ChurchMapProps> = ({ 
  churches, 
  selectedChurch, 
  onChurchSelect 
}) => {
  // Calculate center based on churches or use US center as fallback
  const mapCenter: [number, number] = useMemo(() => {
    if (churches.length > 0) {
      const latSum = churches.reduce((sum, church) => sum + church.latitude, 0);
      const lngSum = churches.reduce((sum, church) => sum + church.longitude, 0);
      return [latSum / churches.length, lngSum / churches.length];
    }
    return [39.8283, -98.5795]; // Center of US
  }, [churches]);

  // Memoize markers for performance
  const markers = useMemo(() => {
    return churches.map((church) => {
      const icon = createCustomIcon(CHURCH_COLORS[church.category]);
      
      return (
        <Marker
          key={church.id}
          position={[church.latitude, church.longitude]}
          icon={icon}
          eventHandlers={{
            click: () => {
              if (onChurchSelect) {
                onChurchSelect(church);
              }
            },
          }}
        >
          <Popup>
            <div className="church-popup">
              <h3 className="church-popup-title">{church.name}</h3>
              <p className="church-popup-address">
                {church.address}<br />
                {church.city}, {church.state} {church.zipCode}
              </p>
              {church.pastor && (
                <p className="church-popup-pastor">
                  <strong>Pastor:</strong> {church.pastor}
                </p>
              )}
              {church.phone && (
                <p className="church-popup-phone">
                  <strong>Phone:</strong> {church.phone}
                </p>
              )}
              {church.website && (
                <p className="church-popup-website">
                  <a 
                    href={church.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="church-popup-link"
                  >
                    Visit Website
                  </a>
                </p>
              )}
              <p className="church-popup-category">
                <strong>Category:</strong> {church.category}
              </p>
              {church.affiliation && church.affiliation.length > 0 && (
                <p className="church-popup-affiliation">
                  <strong>Affiliation:</strong> {church.affiliation.join(', ')}
                </p>
              )}
              {church.description && (
                <p className="church-popup-description">
                  {church.description}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [churches, onChurchSelect]);

  return (
    <div className="church-map-container">
      <MapContainer
        center={mapCenter}
        zoom={churches.length > 0 ? 6 : 4}
        style={{ height: '100%', width: '100%' }}
        className="church-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        <MapBounds churches={churches} />
      </MapContainer>
    </div>
  );
};

export default ChurchMap;