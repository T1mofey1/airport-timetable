import React from 'react';
import 'flexboxgrid2';
import 'normalize.css';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import FlightPage from './FlightPage';

export default function () {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/departure"
          render={() => <FlightPage airportStatus="/dep" />}
        />
        <Route
          exact
          path="/arrival"
          render={() => <FlightPage airportStatus="/arr" />}
        />
        <Redirect from="/" to="/departure" />
      </Switch>
    </Router>
  );
}
