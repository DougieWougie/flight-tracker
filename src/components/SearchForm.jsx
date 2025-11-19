import { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSearch, isLoading }) {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flightNumber.trim()) {
      onSearch(flightNumber.trim(), flightDate);
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="flightNumber">Flight Number</label>
          <input
            type="text"
            id="flightNumber"
            placeholder="e.g., AA1234 or 1234"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="flightDate">Date</label>
          <input
            type="date"
            id="flightDate"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search Flight'}
        </button>
      </form>
    </div>
  );
}
