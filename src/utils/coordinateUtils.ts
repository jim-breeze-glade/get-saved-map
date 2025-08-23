import { Church } from '../types/Church';

/**
 * Generate pseudo-random coordinates spread across Arkansas
 * This is a temporary solution until proper geocoding is implemented
 */
export const generateArkansasCoordinates = (churches: Church[]): Church[] => {
  // Arkansas boundaries (approximate)
  const arkansasBounds = {
    north: 36.4996,
    south: 33.0041,
    east: -89.6444,
    west: -94.6178
  };

  const latRange = arkansasBounds.north - arkansasBounds.south;
  const lngRange = arkansasBounds.east - arkansasBounds.west;

  return churches.map((church, index) => {
    // Use church ID as seed for consistent positioning
    const seed = parseInt(church.id) || index + 1;
    
    // Generate pseudo-random coordinates based on church ID
    const latOffset = ((seed * 17) % 1000) / 1000;
    const lngOffset = ((seed * 23) % 1000) / 1000;
    
    const latitude = arkansasBounds.south + (latRange * latOffset);
    const longitude = arkansasBounds.west + (lngRange * lngOffset);

    return {
      ...church,
      latitude: Number(latitude.toFixed(6)),
      longitude: Number(longitude.toFixed(6))
    };
  });
};

/**
 * Get coordinates for a specific city in Arkansas (rough approximations)
 * This provides better clustering by city
 */
export const getCityCoordinates = (city: string): { lat: number; lng: number } => {
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    'LITTLE ROCK': { lat: 34.7465, lng: -92.2896 },
    'FORT SMITH': { lat: 35.3859, lng: -94.3985 },
    'FAYETTEVILLE': { lat: 36.0822, lng: -94.1719 },
    'SPRINGDALE': { lat: 36.1867, lng: -94.1288 },
    'JONESBORO': { lat: 35.8423, lng: -90.7043 },
    'NORTH LITTLE ROCK': { lat: 34.7693, lng: -92.2671 },
    'CONWAY': { lat: 35.0887, lng: -92.4421 },
    'ROGERS': { lat: 36.3320, lng: -94.1185 },
    'PINE BLUFF': { lat: 33.8670, lng: -92.0032 },
    'BENTONVILLE': { lat: 36.3729, lng: -94.2088 },
    'HOT SPRINGS': { lat: 34.5037, lng: -93.0552 },
    'BENTON': { lat: 34.5648, lng: -92.5877 },
    'SHERWOOD': { lat: 34.8151, lng: -92.2241 },
    'TEXARKANA': { lat: 33.4418, lng: -94.0377 },
    'CABOT': { lat: 34.9745, lng: -92.0165 },
    'EL DORADO': { lat: 33.2074, lng: -92.6663 },
    'PARAGOULD': { lat: 36.0584, lng: -90.4973 },
    'SEARCY': { lat: 35.2515, lng: -91.7362 },
    'MENA': { lat: 34.5859, lng: -94.2399 },
    'HARRISON': { lat: 36.2298, lng: -93.1077 },
    'BLYTHEVILLE': { lat: 35.9273, lng: -89.9190 },
    'JACKSONVILLE': { lat: 34.8665, lng: -92.1102 },
    'MARION': { lat: 35.2148, lng: -90.1962 }
  };

  return cityCoords[city.toUpperCase()] || { lat: 34.7465, lng: -92.2896 };
};

/**
 * Generate better coordinates based on city clustering with small random offsets
 */
export const generateCityBasedCoordinates = (churches: Church[]): Church[] => {
  return churches.map((church, index) => {
    const cityCoords = getCityCoordinates(church.city);
    
    // Add small random offset to prevent exact overlapping
    const seed = parseInt(church.id) || index + 1;
    const latOffset = ((seed * 7) % 100 - 50) / 10000; // ±0.005 degrees
    const lngOffset = ((seed * 11) % 100 - 50) / 10000; // ±0.005 degrees
    
    return {
      ...church,
      latitude: Number((cityCoords.lat + latOffset).toFixed(6)),
      longitude: Number((cityCoords.lng + lngOffset).toFixed(6))
    };
  });
};