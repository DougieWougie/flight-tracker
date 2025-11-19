import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm.jsx';
import FlightCard from './components/FlightCard.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import { searchFlight } from './services/flightApi.js';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />

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
