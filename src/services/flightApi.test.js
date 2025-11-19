import { describe, it, expect, beforeEach, vi } from 'vitest';
import { searchFlight } from './flightApi';

// Mock fetch globally
global.fetch = vi.fn();

describe('flightApi', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('searchFlight', () => {
    it('should fetch flight data from the API', async () => {
      const mockApiResponse = {
        response: {
          flightroute: {
            callsign: 'AA1234',
            callsign_iata: 'AA1234',
            airline: {
              name: 'American Airlines',
              icao_code: 'AAL',
              iata_code: 'AA'
            },
            origin: {
              iata_code: 'DFW',
              icao_code: 'KDFW',
              name: 'Dallas/Fort Worth International Airport',
              municipality: 'Dallas',
              latitude_deg: 32.8968,
              longitude_deg: -97.0380
            },
            destination: {
              iata_code: 'LAX',
              icao_code: 'KLAX',
              name: 'Los Angeles International Airport',
              municipality: 'Los Angeles',
              latitude_deg: 33.9425,
              longitude_deg: -118.4081
            }
          }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await searchFlight('AA1234', '2024-01-01');

      expect(fetch).toHaveBeenCalledWith('https://api.adsbdb.com/v0/callsign/AA1234');
      expect(result).toHaveProperty('flightNumber');
      expect(result).toHaveProperty('airline', 'American Airlines');
      expect(result).toHaveProperty('departure');
      expect(result).toHaveProperty('arrival');
      expect(result.departure.code).toBe('DFW');
      expect(result.arrival.code).toBe('LAX');
    });

    it('should normalize flight numbers by removing spaces', async () => {
      const mockApiResponse = {
        response: {
          flightroute: {
            callsign: 'UA567',
            callsign_iata: 'UA567',
            airline: { name: 'United Airlines' },
            origin: {
              iata_code: 'ORD',
              name: 'Chicago O\'Hare',
              municipality: 'Chicago',
              latitude_deg: 41.9786,
              longitude_deg: -87.9048
            },
            destination: {
              iata_code: 'SFO',
              name: 'San Francisco International',
              municipality: 'San Francisco',
              latitude_deg: 37.6213,
              longitude_deg: -122.3790
            }
          }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      await searchFlight('UA 567', '2024-01-01');

      expect(fetch).toHaveBeenCalledWith('https://api.adsbdb.com/v0/callsign/UA567');
    });

    it('should throw an error when flight is not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(searchFlight('INVALID123', '2024-01-01'))
        .rejects.toThrow('Flight INVALID123 not found');
    });

    it('should throw an error on API failure', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(searchFlight('AA1234', '2024-01-01'))
        .rejects.toThrow('API error: 500');
    });

    it('should include simulated data in the response', async () => {
      const mockApiResponse = {
        response: {
          flightroute: {
            callsign: 'DL890',
            callsign_iata: 'DL890',
            airline: { name: 'Delta Airlines' },
            origin: {
              iata_code: 'ATL',
              name: 'Hartsfield-Jackson Atlanta',
              municipality: 'Atlanta',
              latitude_deg: 33.6367,
              longitude_deg: -84.4281
            },
            destination: {
              iata_code: 'MIA',
              name: 'Miami International',
              municipality: 'Miami',
              latitude_deg: 25.7932,
              longitude_deg: -80.2906
            }
          }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await searchFlight('DL890', '2024-01-01');

      // Check simulated fields exist
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('aircraft');
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('baggage');
      expect(result.departure).toHaveProperty('time');
      expect(result.departure).toHaveProperty('gate');
      expect(result.departure).toHaveProperty('terminal');
      expect(result.arrival).toHaveProperty('time');
      expect(result.arrival).toHaveProperty('gate');
      expect(result.arrival).toHaveProperty('terminal');
    });

    it('should calculate flight duration based on distance', async () => {
      const mockApiResponse = {
        response: {
          flightroute: {
            callsign: 'BA117',
            callsign_iata: 'BA117',
            airline: { name: 'British Airways' },
            origin: {
              iata_code: 'LHR',
              name: 'London Heathrow',
              municipality: 'London',
              latitude_deg: 51.4700,
              longitude_deg: -0.4543
            },
            destination: {
              iata_code: 'JFK',
              name: 'John F. Kennedy International',
              municipality: 'New York',
              latitude_deg: 40.6413,
              longitude_deg: -73.7781
            }
          }
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      });

      const result = await searchFlight('BA117', '2024-01-01');

      // Duration should be calculated and formatted as "Xh Ym"
      expect(result.duration).toMatch(/^\d+h \d+m$/);
    });
  });
});
