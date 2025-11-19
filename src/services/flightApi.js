const API_BASE_URL = 'https://api.adsbdb.com/v0';

// Helper function to calculate flight duration (rough estimate based on distance)
function calculateDuration(origin, destination) {
  // Simple calculation based on lat/long distance
  const lat1 = origin.latitude_deg;
  const lon1 = origin.longitude_deg;
  const lat2 = destination.latitude_deg;
  const lon2 = destination.longitude_deg;

  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  // Average commercial flight speed ~500 mph
  const hours = Math.floor(distance / 500);
  const minutes = Math.round((distance / 500 - hours) * 60);

  return `${hours}h ${minutes}m`;
}

// Generate mock times (since API doesn't provide real-time data)
function generateFlightTimes() {
  const now = new Date();
  const departureHour = Math.floor(Math.random() * 24);
  const departureMin = Math.floor(Math.random() * 60);

  const departure = new Date();
  departure.setHours(departureHour, departureMin, 0);

  const arrival = new Date(departure);
  arrival.setHours(arrival.getHours() + 2 + Math.floor(Math.random() * 6));

  return {
    departure: `${String(departure.getHours()).padStart(2, '0')}:${String(departure.getMinutes()).padStart(2, '0')}`,
    arrival: `${String(arrival.getHours()).padStart(2, '0')}:${String(arrival.getMinutes()).padStart(2, '0')}`
  };
}

// Generate mock gate/terminal info
function generateGateInfo(airportCode) {
  const gates = ['A', 'B', 'C', 'D', 'E'];
  const gate = gates[Math.floor(Math.random() * gates.length)];
  const number = Math.floor(Math.random() * 50) + 1;

  return {
    gate: `Gate ${gate}${number}`,
    terminal: `Terminal ${gate}`
  };
}

// Transform API response to our app format
function transformFlightData(apiResponse) {
  const route = apiResponse.response.flightroute;
  const times = generateFlightTimes();
  const departureGateInfo = generateGateInfo(route.origin.iata_code);
  const arrivalGateInfo = generateGateInfo(route.destination.iata_code);

  // Random status
  const statuses = ['on-time', 'on-time', 'on-time', 'delayed', 'boarding'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  // Mock aircraft types
  const aircraftTypes = [
    'Boeing 737-800',
    'Boeing 737 MAX 8',
    'Airbus A320',
    'Airbus A321',
    'Boeing 757-200',
    'Boeing 777-300ER',
    'Airbus A350'
  ];
  const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];

  return {
    flightNumber: route.callsign_iata || route.callsign,
    airline: route.airline.name,
    status: status,
    departure: {
      code: route.origin.iata_code || route.origin.icao_code,
      name: route.origin.name,
      city: route.origin.municipality,
      time: times.departure,
      gate: departureGateInfo.gate,
      terminal: departureGateInfo.terminal
    },
    arrival: {
      code: route.destination.iata_code || route.destination.icao_code,
      name: route.destination.name,
      city: route.destination.municipality,
      time: times.arrival,
      gate: arrivalGateInfo.gate,
      terminal: arrivalGateInfo.terminal
    },
    aircraft: aircraft,
    duration: calculateDuration(route.origin, route.destination),
    baggage: `Carousel ${Math.floor(Math.random() * 10) + 1}`
  };
}

// Main API function
export async function searchFlight(flightNumber, date) {
  try {
    // Normalize flight number (remove spaces, convert to uppercase)
    const normalizedFlightNumber = flightNumber.replace(/\s+/g, '').toUpperCase();

    // Call the real API
    const response = await fetch(`${API_BASE_URL}/callsign/${normalizedFlightNumber}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Flight ${flightNumber} not found. Try flights like AA1234, UA2345, DL1234, etc.`);
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to our format
    return transformFlightData(data);

  } catch (error) {
    // If it's a network error or the API is down, provide helpful message
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to flight database. Please check your connection.');
    }
    throw error;
  }
}

// Log available info
console.log('%c✈️ Flight Tracker - Live Data', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('Connected to ADSBDB API for real flight route data!');
console.log('Try searching for real flights like:');
console.log('- AA1234 (American Airlines)');
console.log('- UA2345 (United Airlines)');
console.log('- DL1234 (Delta Airlines)');
console.log('- BA117 (British Airways)');
console.log('Note: Times, gates, and status are simulated since the API provides route data only.');
