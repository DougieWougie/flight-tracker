import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FlightCard from './FlightCard';

const mockFlightData = {
  flightNumber: 'AA 1234',
  airline: 'American Airlines',
  status: 'on-time',
  departure: {
    code: 'DFW',
    name: 'Dallas/Fort Worth International',
    city: 'Dallas',
    time: '14:30',
    gate: 'Gate B12',
    terminal: 'Terminal 8'
  },
  arrival: {
    code: 'LAX',
    name: 'Los Angeles International',
    city: 'Los Angeles',
    time: '17:45',
    gate: 'Gate 42A',
    terminal: 'Terminal 4'
  },
  aircraft: 'Boeing 737-800',
  duration: '5h 15m',
  baggage: 'Carousel 7'
};

describe('FlightCard', () => {
  it('should render flight number', () => {
    render(<FlightCard flight={mockFlightData} />);
    expect(screen.getByText('AA 1234')).toBeInTheDocument();
  });

  it('should render flight status badge', () => {
    render(<FlightCard flight={mockFlightData} />);
    expect(screen.getByText(/on time/i)).toBeInTheDocument();
  });

  it('should render departure airport information', () => {
    render(<FlightCard flight={mockFlightData} />);

    expect(screen.getByText('DFW')).toBeInTheDocument();
    expect(screen.getByText(/Dallas\/Fort Worth International/i)).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
    expect(screen.getByText('Gate B12')).toBeInTheDocument();
  });

  it('should render arrival airport information', () => {
    render(<FlightCard flight={mockFlightData} />);

    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles International/i)).toBeInTheDocument();
    expect(screen.getByText('17:45')).toBeInTheDocument();
    expect(screen.getByText('Gate 42A')).toBeInTheDocument();
  });

  it('should render flight duration', () => {
    render(<FlightCard flight={mockFlightData} />);
    expect(screen.getByText('5h 15m')).toBeInTheDocument();
  });

  it('should render flight details', () => {
    render(<FlightCard flight={mockFlightData} />);

    expect(screen.getByText('Boeing 737-800')).toBeInTheDocument();
    expect(screen.getByText('Terminal 8')).toBeInTheDocument();
    expect(screen.getByText('Carousel 7')).toBeInTheDocument();
  });

  it('should render departure and arrival labels', () => {
    render(<FlightCard flight={mockFlightData} />);

    const departureLabels = screen.getAllByText(/departure/i);
    const arrivalLabels = screen.getAllByText(/arrival/i);

    expect(departureLabels.length).toBeGreaterThan(0);
    expect(arrivalLabels.length).toBeGreaterThan(0);
  });

  it('should render detail labels', () => {
    render(<FlightCard flight={mockFlightData} />);

    expect(screen.getByText('Aircraft')).toBeInTheDocument();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Baggage Claim')).toBeInTheDocument();
  });

  it('should apply correct status badge class for on-time flights', () => {
    render(<FlightCard flight={mockFlightData} />);

    const statusBadge = screen.getByText(/on time/i);
    expect(statusBadge).toHaveClass('status-badge', 'on-time');
  });

  it('should apply correct status badge class for delayed flights', () => {
    const delayedFlight = { ...mockFlightData, status: 'delayed' };
    render(<FlightCard flight={delayedFlight} />);

    const statusBadge = screen.getByText(/delayed/i);
    expect(statusBadge).toHaveClass('status-badge', 'delayed');
  });

  it('should apply correct status badge class for boarding flights', () => {
    const boardingFlight = { ...mockFlightData, status: 'boarding' };
    render(<FlightCard flight={boardingFlight} />);

    const statusBadge = screen.getByText(/boarding/i);
    expect(statusBadge).toHaveClass('status-badge', 'boarding');
  });

  it('should render plane icon', () => {
    render(<FlightCard flight={mockFlightData} />);
    expect(screen.getByText('✈️')).toBeInTheDocument();
  });
});
