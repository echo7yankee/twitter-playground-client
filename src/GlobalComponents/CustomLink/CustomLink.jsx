import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = ({ to, children }) => {
  return (
    <Link to={to}>
      {children}
    </Link>
  )
}
