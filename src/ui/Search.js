import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSearch = styled.input`
  display: flex;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 15px;
  font-size: 25px;
`;

export default class Search extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  handleOnChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="container">
        <StyledSearch
          type="number"
          min="1"
          placeholder="Search by flight id"
          onChange={this.handleOnChange}
          value={value}
        />
      </div>
    );
  }
}
