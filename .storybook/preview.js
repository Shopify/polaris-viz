import React from 'react';

export const decorators = [
  (Story) => (
    <div
      style={{
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
