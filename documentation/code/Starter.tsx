import React from 'react';

// eslint-disable-next-line import/no-default-export
export default function Starter() {
  const outerContainerStyle = {background: 'white', padding: '3rem'};
  const innerContainerStyle = {
    width: '900px',
    height: '200px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>{/* Component goes here */}</div>
    </div>
  );
}
