import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {colorPurple, colorGreen} from '@shopify/polaris-tokens';

import {Line} from '../Line';
import {Point} from '../components';

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
  },
  xScale: scaleLinear(),
  yScale: scaleLinear(),
  activePointIndex: null,
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

    it('renders a solid, purple line if no series style is provided', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      expect(line).toContainReactComponent('path', {
        strokeDasharray: 'unset',
        stroke: colorPurple,
      });
    });

    it('renders a line with the series styles when provided', () => {
      const line = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              style: {color: 'colorGreen', lineStyle: 'dashed'},
            }}
          />
        </svg>,
      );

      expect(line).toContainReactComponent('path', {
        strokeDasharray: '2 4',
        stroke: colorGreen,
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

    it('renders with colorPurple by default', () => {
      const line = mount(
        <svg>
          <Line {...mockProps} />
        </svg>,
      );

      expect(line).toContainReactComponent(Point, {
        color: 'colorPurple',
      });
    });

    it('renders with the provided series color', () => {
      const line = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              style: {color: 'colorGreen'},
            }}
          />
        </svg>,
      );

      expect(line).toContainReactComponent(Point, {
        color: 'colorGreen',
      });
    });
  });
});
