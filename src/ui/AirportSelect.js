import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Airports = [
  {
    iata: 'SVO',
    name: 'Sheremetyevo',
  },
  {
    iata: 'VKO',
    name: 'Vnukovo',
  },
  {
    iata: 'DME',
    name: 'Domodedovo',
  },
];

const SelectWrap = styled.div`
  border-bottom: 1px solid black;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 15px;
`;

const Select = styled.select`
  position: relative;
  height: 28px;
  width: 100%;
  background: white;
  border: none;
  border-radius: 0%;
`;

const Option = styled.option`
  position: absolute;
  top: 0px;
  height: 28px;
`;

export default class AirportSelect extends React.Component {
  static propTypes = {
    airportChange: PropTypes.func,
  };

  static defaultProps = {
    airportChange: () => {},
  };

  handleOnChange = (e) => {
    const { airportChange } = this.props;
    airportChange(e.target.value);
  };

  render() {
    return (
      <SelectWrap>
        <Select onChange={this.handleOnChange}>
          {Airports.map(airport => (
            <Option value={airport.iata} key={airport.iata}>
              {airport.iata} {airport.name}
            </Option>
          ))}
        </Select>
      </SelectWrap>
    );
  }
}
