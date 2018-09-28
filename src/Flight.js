import React from 'react';
import styled from 'styled-components';
import addMinutes from 'date-fns/add_minutes';

import timeFormat from './utils/timeFormat';

const Flight = styled.div`
  display: flex;
  padding-top: 25px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  align-items: center;

  &:hover {
    box-sizing: border-box;
    border-bottom: 3px solid #ffac02;
    margin: -1px 0;
    transition: transform 0.2s ease-out;
    transform: translate(-4px, -4px);
  }
`;

const DepartureTime = styled.span`
  font-size: 22px;
  font-weight: 700;
`;

const OldTime = styled.span`
  text-decoration: line-through;
  color: red;
`;

const ArrivalTime = styled.span`
  font-size: 22px;
  font-weight: 400;
`;

const City = styled.span`
  font-size: 32px;
  font-weight: 900;
`;

const Id = styled.span``;

const Terminal = styled.span`
  font-weight: 900;
  text-align: center;
`;

export default function ({
  airportStatus,
  departureCity,
  arrivalCity,
  departureDate,
  arrivalDate,
  terminal = 'неизвестен',
  id,
  departureDelay,
  arrivalDelay,
}) {
  const FormatedDepDate = timeFormat(departureDate);
  const FormatedArrDate = timeFormat(arrivalDate);
  const DelayDepDate = timeFormat(addMinutes(departureDate, departureDelay));
  const DelayArrDate = timeFormat(addMinutes(arrivalDate, arrivalDelay));
  return (
    <div className="container">
      <Flight className="row">
        <DepartureTime className="col-lg-2">
          {departureDelay ? (
            <div>
              <OldTime>{FormatedDepDate}</OldTime>
              <br />
              {DelayDepDate}
            </div>
          ) : (
            FormatedDepDate
          )}
        </DepartureTime>
        <City className="col-lg-4">{airportStatus === '/dep' ? arrivalCity : departureCity}</City>
        <Id className="col-lg-1">{id}</Id>
        <Terminal className="col-lg-1">{terminal}</Terminal>

        <ArrivalTime className="col-lg-3">
          Arrival in {arrivalCity}
          <br />
          {arrivalDelay ? (
            <div>
              <OldTime>{FormatedArrDate}</OldTime> <br />
              {DelayArrDate}
            </div>
          ) : (
            FormatedArrDate
          )}
        </ArrivalTime>
      </Flight>
    </div>
  );
}
