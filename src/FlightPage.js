import React from 'react';
import { hostname, appId, secretCode } from './api';
import airports from './airports.json';
import Header from './Header';
import FlightList from './FlightList';
import Search from './ui/Search';
import AirportSelect from './ui/AirportSelect';

const airportsData = {};

export default class FlightPage extends React.Component {
  state = {
    airport: 'SVO',
    isLoading: false,
    hasError: false,
    isLoaded: false,
    list: [],
    filter: '',
  };

  componentDidMount() {
    const { airportStatus } = this.props;
    const { airport } = this.state;
    this.dataFetch(airport, airportStatus);
  }

  componentDidUpdate(prevProps, prevState) {
    const { airportStatus } = this.props;
    const { airport } = this.state;

    if (prevProps.airportStatus !== airportStatus || airport !== prevState.airport) {
      this.clearFilter();

      if (!airportsData[`${airport}${airportStatus}`]) {
        this.dataFetch(airport, airportStatus);
      } else {
        this.setState({ list: airportsData[`${airport}${airportStatus}`] });
      }
    }
  }

  clearFilter = () => this.setState({ filter: '' });

  dataFetch = (airport, airportStatus) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    this.setState({
      isLoading: true,
      isLoaded: false,
      hasError: false,
    });

    fetch(
      `${hostname}${airport}${airportStatus}/${year}/${month}/${day}/${hour}?${appId}&appKey=${secretCode}&utc=false&numHours=4&maxFlights=50`,
    )
      .then(response => response.json())
      .then(({ flightStatuses, error }) => {
        if (error) {
          throw error;
        }
        return flightStatuses
          .map(item => ({
            ...item,
            arrivalAirportName: airports.find(
              airportItem => airportItem.iata === item.arrivalAirportFsCode,
            ).city,
            departureAirportName: airports.find(
              airportItem => airportItem.iata === item.departureAirportFsCode,
            ).city,
          }))
          .sort(
            (a, b) => +new Date(a.departureDate.dateLocal) - +new Date(b.departureDate.dateLocal),
          );
      })
      .then((data) => {
        airportsData[`${airport}${airportStatus}`] = data;

        return this.setState({
          list: data,
          isLoaded: true,
          isLoading: false,
          hasError: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          isLoading: false,
          hasError: true,
        });
        throw error;
      });
  };

  onSearchChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  airportChange = (value) => {
    this.setState({
      airport: value,
    });
  };

  filterList = () => {
    const { list, filter } = this.state;

    return list.filter(item => item.flightId.toString().includes(filter));
  };

  render() {
    const {
      isLoading, hasError, isLoaded, filter,
    } = this.state;
    const { airportStatus } = this.props;
    const list = this.filterList();

    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <AirportSelect airportChange={this.airportChange} />
            </div>
            <div className="col-lg-offset-1 col-lg-7">
              <Search onChange={this.onSearchChange} value={filter} />
            </div>
          </div>
          {hasError && 'Ops..something went wrong'}
          {isLoading && 'Loading...'}
          {isLoaded && <FlightList airportStatus={airportStatus} list={list} />}
        </div>
      </div>
    );
  }
}
