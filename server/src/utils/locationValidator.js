import { getDistance } from 'geolib';

/**
 * Validates if a student's location is within the allowed radius of the session location
 * Uses Haversine formula via geolib for accurate distance calculation
 * 
 * @param {Object} sessionLocation - { latitude, longitude, radius }
 * @param {Object} studentLocation - { latitude, longitude }
 * @returns {Object} - { isValid, distance, message }
 */
export const validateLocation = (sessionLocation, studentLocation) => {
  // Calculate distance in meters between two points
  const distance = getDistance(
    { latitude: sessionLocation.latitude, longitude: sessionLocation.longitude },
    { latitude: studentLocation.latitude, longitude: studentLocation.longitude }
  );

  const allowedRadius = sessionLocation.radius || parseInt(process.env.DEFAULT_RADIUS_METERS) || 50;
  const isValid = distance <= allowedRadius;

  return {
    isValid,
    distance,
    allowedRadius,
    message: isValid 
      ? `Location verified (${distance}m from session location)` 
      : `You are ${distance}m away from the session location. Maximum allowed: ${allowedRadius}m`
  };
};

/**
 * Format coordinates for display
 */
export const formatCoordinates = (lat, lng) => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

/**
 * Validate coordinate values
 */
export const isValidCoordinate = (lat, lng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
};

