import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Button = styled(NavLink)`
  font-weight: 700;
  font-size: 100px;
  text-decoration: none;
  color: black;
  margin-right: 50px;

  &:hover {
    color: #ffbe38;
  }

  &.active {
    color: #ffac02;
  }
`;

export default function ({ children, to }) {
  return <Button to={to}>{children}</Button>;
}
