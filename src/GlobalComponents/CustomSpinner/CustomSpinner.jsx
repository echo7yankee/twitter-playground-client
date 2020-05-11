import React from 'react';

export const CustomSpinner = ({ className }) => {
  return (
    <div className={`${className} lds-ring`}><div></div><div></div><div></div><div></div></div>
  )
}
