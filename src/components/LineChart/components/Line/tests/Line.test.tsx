import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../../utilities';
import {Line} from '../Line';

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
  xScale: scaleLinear(),
  yScale: scaleLinear(),
  spline: false,
};

describe('<Line />', () => {
  describe('Line', () => {
    it('renders a line with the series styles', () => {
      const line = mount(
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

      expect(line).toContainReactComponent('path', {
        strokeDasharray: '2 4',
        stroke: getColorValue('primary'),
      });
    });
  });
});
