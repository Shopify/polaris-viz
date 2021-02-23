import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {Point} from 'components';

import {getColorValue} from '../../../../../utilities';
import {Line} from '../Line';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(() => jest.fn(() => 250)),
}));

const mockProps = {
  path: 'M0,0L10,10',
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
  activePointIndex: null,
  labelledBy: 'someId',
  tabIndex: 0,
  handleFocus: jest.fn(),
};

describe('<Line />', () => {
  describe('Line', () => {
    it('renders a path element with the given path', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      // eslint-disable-next-line id-length
      expect(line).toContainReactComponent('path', {d: 'M0,0L10,10'});
    });

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

  describe('Points', () => {
    it('renders a point for each data point in the series', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      expect(line).toContainReactComponentTimes(Point, 2);
    });

    it('calculates the x and y position using the given x and y scales', () => {
      mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      expect(mockProps.xScale).toHaveBeenCalledWith(0);
      expect(mockProps.yScale).toHaveBeenCalledWith(
        mockProps.series.data[0].rawValue,
      );
    });

    it('renders with active: true if the point index matches the activePointIndex', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} activePointIndex={1} />
        </svg>,
      );

      expect(line).toContainReactComponentTimes(Point, 1, {active: true});
    });

    it('renders with the provided series color', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      expect(line).toContainReactComponent(Point, {
        color: 'primary',
      });
    });
  });
});
