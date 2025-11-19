# Flight Tracker ✈️

A modern web application for looking up real-time flight route information using the ADSBDB API.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![API](https://img.shields.io/badge/API-ADSBDB-green)

## Features

- **Real Flight Route Data** - Fetches actual airline and airport information from ADSBDB API
- **Flight Search** - Look up flights by callsign (e.g., AA1234, UA2345, DL1234)
- **Distance Calculation** - Calculates flight duration based on airport coordinates
- **Beautiful UI** - Modern gradient design with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Live Updates** - Hot module reloading for instant development feedback

## What's Real vs Simulated

### Real Data (from ADSBDB API):
- Airline names and codes (IATA/ICAO)
- Origin and destination airports
- Airport names, codes, cities, and coordinates
- Flight route information

### Simulated Data:
- Departure and arrival times
- Gate and terminal assignments
- Flight status (on-time, delayed, boarding)
- Aircraft type
- Baggage claim information

*Note: The ADSBDB API provides flight route data but not real-time scheduling information, so times and operational details are simulated.*

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **ADSBDB API** - Flight route data source
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DougieWougie/flight-tracker.git
cd flight-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. Enter a flight callsign (e.g., AA1234, UA2345, DL1234, BA117)
2. Select a date (currently for reference only)
3. Click "Search Flight"
4. View detailed flight route information

### Sample Flight Numbers to Try

- **AA1234** - American Airlines
- **UA2345** - United Airlines
- **DL1234** - Delta Airlines
- **BA117** - British Airways

## Project Structure

```
flight-tracker/
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx      # Flight search input form
│   │   ├── SearchForm.css      # Search form styles
│   │   ├── FlightCard.jsx      # Flight details display
│   │   └── FlightCard.css      # Flight card styles
│   ├── services/
│   │   └── flightApi.js        # API integration and data transformation
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # App-level styles
│   └── index.css               # Global styles
├── public/                     # Static assets
└── index.html                  # HTML entry point
```

## API Reference

This app uses the [ADSBDB API](https://www.adsbdb.com/) for flight route data:

- **Endpoint**: `https://api.adsbdb.com/v0/callsign/[CALLSIGN]`
- **Method**: GET
- **Response**: JSON with airline, origin, and destination details

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT

## Acknowledgments

This project uses the **[ADSBDB API](https://www.adsbdb.com/)** - a free, public API for aircraft, airlines, and flight routes. ADSBDB provides comprehensive aviation data including:
- Aircraft information (registration, MODE-S codes)
- Airline details (ICAO/IATA codes, callsigns)
- Flight route data (origin, destination, callsigns)

Special thanks to the ADSBDB team for maintaining this valuable resource for the aviation community. Visit [adsbdb.com](https://www.adsbdb.com/) to learn more about their API and data offerings.

Also built with:
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - JavaScript library for building user interfaces

---

Built with [Claude Code](https://claude.com/claude-code) 🤖
