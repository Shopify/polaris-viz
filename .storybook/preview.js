import React from 'react';
import {PolarisVizProvider} from '../src/components';
import {LIGHT_THEME as Light} from '../src/constants';

export const parameters = {
  backgrounds: {
    default: 'twitter',
    values: [
      {
        name: 'light',
        value: '#FFF',
      },
      {
        name: 'dark',
        value: '#1f1f25',
      },
    ],
  },
  options: {
    storySort: {
      order: ['Providers', 'Charts', 'Subcomponents'],
    },
  },
};

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
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              padding: '20px',
            },
          },
          Light,
        }}
      >
        <Story />
      </PolarisVizProvider>
    </div>
  ),
];
