import './FlightCard.css';

export default function FlightCard({ flight }) {
  return (
    <div className="flight-card">
      <div className="flight-header">
        <h2>{flight.flightNumber}</h2>
        <span className={`status-badge ${flight.status}`}>
          {flight.status.replace('-', ' ')}
        </span>
      </div>

      <div className="flight-route">
        <div className="airport-info">
          <div className="airport-code">{flight.departure.code}</div>
          <div className="airport-name">
            {flight.departure.name}, {flight.departure.city}
          </div>
          <div className="time-info">
            <div className="time-label">Departure</div>
            <div className="time">{flight.departure.time}</div>
            <div className="gate">{flight.departure.gate}</div>
          </div>
        </div>

        <div className="flight-path">
          <div className="plane-icon">✈️</div>
          <div className="duration">{flight.duration}</div>
        </div>

        <div className="airport-info">
          <div className="airport-code">{flight.arrival.code}</div>
          <div className="airport-name">
            {flight.arrival.name}, {flight.arrival.city}
          </div>
          <div className="time-info">
            <div className="time-label">Arrival</div>
            <div className="time">{flight.arrival.time}</div>
            <div className="gate">{flight.arrival.gate}</div>
          </div>
        </div>
      </div>

      <div className="flight-details">
        <div className="detail-item">
          <span className="label">Aircraft</span>
          <span className="value">{flight.aircraft}</span>
        </div>
        <div className="detail-item">
          <span className="label">Terminal</span>
          <span className="value">{flight.departure.terminal}</span>
        </div>
        <div className="detail-item">
          <span className="label">Baggage Claim</span>
          <span className="value">{flight.baggage}</span>
        </div>
      </div>
    </div>
  );
}
