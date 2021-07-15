import React from 'react';

export const parameters = {
  options: {
    storySort: {
      order: ['Charts', 'Subcomponents'],
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      style={{
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Story />
    </div>
  ),
];
