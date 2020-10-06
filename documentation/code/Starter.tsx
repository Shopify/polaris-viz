import React from 'react';

import {OUTER_CONTAINER_STYLE} from './constants';

export function Starter() {
  const innerContainerStyle = {
    width: '900px',
    height: '300px',
    background: 'white',
    padding: '2rem',
    borderRadius: '6px',
    border: '2px solid #EAECEF',
    display: 'grid',
    placeItems: 'center',
  };

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div style={OUTER_CONTAINER_STYLE}>
      <div style={innerContainerStyle}>{/* Component goes here */}</div>
    </div>
  );
}
