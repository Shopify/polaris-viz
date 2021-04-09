import React from 'react';
import {mount} from '@shopify/react-testing';

import {getColorValue} from '../../../../../utilities';
import {Line} from '../Line';

jest.mock('../../../../../utilities', () => {
  return {
    ...jest.requireActual('../../../../../utilities'),
    getPathLength: () => 0,
  };
});

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn(() => 250)),
}));

const mockProps = {
  series: {
    name: 'Test series',
    data: [
      {label: 'Jan 1', rawValue: 0},
      {label: 'Jan 2', rawValue: 10},
    ],
    color: 'primary' as 'primary',
    lineStyle: 'solid' as 'solid',
    showArea: false,
  },
  index: 0,
  isAnimated: false,
  lineGenerator: () => '',
};

describe('<Line />', () => {
  describe('Line', () => {
    it('renders a line with the series styles', () => {
      const actual = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              lineStyle: 'dashed',
            }}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('path', {
        strokeDasharray: '2 4',
        stroke: getColorValue('primary'),
      });
    });
  });
});
