import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = ({ to, className, linkRef, children }) => {
  return (
    <Link to={to} className={className} ref={linkRef}>
      {children}
    </Link>
  )
}
