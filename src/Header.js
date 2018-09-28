import React from 'react';
// import styled from 'styled-components';

import Button from './ui/Button';

export default function () {
  return (
    <div className="container">
      <div className="row">
        <Button to="/departure">Departures</Button>
        <Button to="/arrival">Arrivals</Button>
      </div>
    </div>
  );
}
