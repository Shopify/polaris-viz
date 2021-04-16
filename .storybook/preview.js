import React from 'react';

export const decorators = [
  (Story) => (
    <div
      style={{
        background: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        height: '400px',
        overflow: 'hidden',
      }}
    >
      <Story />
    </div>
  ),
];
