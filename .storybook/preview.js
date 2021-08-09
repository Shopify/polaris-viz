import React from 'react';
import {PolarisVizProvider} from '../src/components';
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
          NoSpline: {
            line: {hasSpline: false},
          },
          NoxAxisLabels: {
            xAxis: {hide: true},
          },
          NoOverflow: {grid: {horizontalOverflow: false}},
          Positive: {
            bar: {
              color: 'rgb(0, 164, 124)',
            },
          },
        }}
      >
        <Story />
      </PolarisVizProvider>
    </div>
  ),
];
