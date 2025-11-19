import { useState } from 'react';
import SearchForm from './components/SearchForm.jsx';
import FlightCard from './components/FlightCard.jsx';
import { searchFlight } from './services/flightApi.js';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flightData, setFlightData] = useState(null);

  const handleSearch = async (flightNumber, flightDate) => {
    setIsLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const data = await searchFlight(flightNumber, flightDate);
      setFlightData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>✈️ Flight Tracker</h1>
        <p className="subtitle">Look up real-time flight information</p>
      </header>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for flight...</p>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {flightData && !isLoading && (
        <div className="results">
          <FlightCard flight={flightData} />
        </div>
      )}
    </div>
  );
}

export default App;
