import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {mountWithProvider} from '../../../../../test-utilities';
import {mockDefaultTheme} from '../../../../../test-utilities/mount-with-provider';
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

const color = 'red';

const mockProps = {
  series: {
    name: 'Test series',
    data: [
      {label: 'Jan 1', rawValue: 0},
      {label: 'Jan 2', rawValue: 10},
    ],
    color: 'primary' as 'primary',
    lineStyle: 'solid' as 'solid',
    areaColor: 'primary' as 'primary',
  },
  index: 0,
  isAnimated: false,
  lineGenerator: (() => '') as any,
  lineOptions: {
    color: 'red',
    area: null,
    sparkArea: null,
    style: 'dotted' as 'dotted',
    hasSpline: false,
    hasPoint: false,
    width: 10,
    pointStroke: 'red',
    dottedStrokeColor: '#ffffff',
  },
  color,
  xScale: scaleLinear(),
  yScale: scaleLinear(),
};

describe('<Line />', () => {
  describe('Line', () => {
    it('renders a line with the series style solid', () => {
      const actual = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              lineStyle: 'solid',
            }}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('path', {
        strokeDasharray: 'unset',
        stroke: color,
      });
    });

    it('renders a line with the series style dashed', () => {
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
        stroke: color,
      });
    });

    it('renders a line with the series style dotted', () => {
      const actual = mount(
        <svg>
          <Line
            {...mockProps}
            series={{
              ...mockProps.series,
              lineStyle: 'dotted',
            }}
          />
        </svg>,
      );

      expect(actual).toContainReactComponent('path', {
        strokeDasharray: '0.1 8',
        stroke: color,
      });
    });
  });

  it('uses the width prop', () => {
    const actual = mountWithProvider(
      <svg>
        <Line
          {...mockProps}
          series={{
            ...mockProps.series,
            lineStyle: 'dashed',
          }}
        />
      </svg>,
      mockDefaultTheme({line: {width: 10}}),
    );

    expect(actual).toContainReactComponent('path', {
      strokeWidth: '10px',
    });
  });
});
