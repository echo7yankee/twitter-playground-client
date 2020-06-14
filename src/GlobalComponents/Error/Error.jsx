import React from 'react'

export const Error = (error) => {
  console.log('ERROR', error);
  return <div style={{ margin: '50px' }}>
    <p>{error.error}</p>
  </div>
}
