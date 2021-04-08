import React from 'react';
import {mount} from '@shopify/react-testing';
import {line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

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

jest.mock('d3-shape', () => ({
  line: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    return shape;
  }),
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
  hasSpline: false,
  isAnimated: false,
  index: 0,
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

    it('calls the d3 curve method when hasSpline is true', () => {
      const curveSpy = jest.fn();
      (line as jest.Mock).mockImplementationOnce(() => {
        const shape = (value: any) => value;
        shape.x = () => shape;
        shape.y = () => shape;
        shape.curve = curveSpy;
        return shape;
      });

      mount(
        <svg>
          <Line {...mockProps} hasSpline />
        </svg>,
      );

      expect(curveSpy).toHaveBeenCalled();
    });
  });
});
