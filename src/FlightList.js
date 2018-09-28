import React from 'react';

import Flight from './Flight';

export default function FlightList({ airportStatus, list }) {
  return (
    <div>
      {list.map(flights => (
        <Flight
          airportStatus={airportStatus}
          key={flights.flightId}
          id={flights.flightId}
          departureCity={flights.departureAirportName}
          arrivalCity={flights.arrivalAirportName}
          departureDate={flights.departureDate.dateLocal}
          arrivalDate={flights.arrivalDate.dateLocal}
          terminal={
            flights.airportResources
            && (airportStatus === '/dep'
              ? flights.airportResources.departureTerminal
              : flights.airportResources.arrivalTerminal)
          }
          departureDelay={flights.delays && flights.delays.departureGateDelayMinutes}
          arrivalDelay={flights.delays && flights.delays.arrivalGateDelayMinutes}
        />
      ))}
    </div>
  );
}
