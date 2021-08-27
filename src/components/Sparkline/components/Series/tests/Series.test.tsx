import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {LinearGradient} from '../../../../LinearGradient';
import {Series} from '../Series';

jest.mock('d3-shape', () => ({
  area: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    shape.y0 = () => shape;
    shape.y1 = () => shape;
    shape.curve = () => shape;
    shape.defined = () => shape;
    return shape;
  }),
  line: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    shape.curve = () => shape;
    shape.defined = () => shape;
    return shape;
  }),
}));

const mockSeries = {
  color: 'red',
  data: [
    {x: 0, y: 100},
    {x: 1, y: 200},
    {x: 2, y: 300},
    {x: 3, y: 400},
    {x: 4, y: 400},
    {x: 5, y: 1000},
    {x: 6, y: 200},
    {x: 7, y: 800},
    {x: 8, y: 900},
    {x: 9, y: 200},
    {x: 10, y: 400},
  ],
};

const xScale = scaleLinear();
const yScale = scaleLinear();

const mockProps = {
  xScale,
  yScale,
  series: mockSeries,
  isAnimated: false,
  height: 250,
  hasSpline: false,
  theme: {
    line: {sparkArea: null, style: 'solid', color: 'red', hasPoint: true},
  } as any,
};

jest.mock('utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'sparkline-1'),
}));

describe('Series', () => {
  it('renders one path by default', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} />
      </svg>,
    );

    expect(actual).toContainReactComponentTimes('path', 1);
  });

  it('renders a solid path by default', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} />
      </svg>,
    );

    expect(actual).toContainReactComponent('path', {
      style: {strokeDasharray: 'unset'},
    });
  });

  it('sets the strokeDasharay if the style is dashed', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} series={{...mockSeries, lineStyle: 'dashed'}} />
      </svg>,
    );
    expect(actual).toContainReactComponent('path', {
      style: {strokeDasharray: '2 4'},
    });
  });

  it('renders an additional path if an area style is set', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} series={{...mockSeries, area: 'red'}} />
      </svg>,
    );

    expect(actual).toContainReactComponentTimes('path', 2);
  });

  it('renders an additional LinearGradient if the area style is not null', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} series={{...mockSeries, area: 'red'}} />
      </svg>,
    );

    expect(actual).toContainReactComponentTimes(LinearGradient, 2);
  });

  it('calls the d3 curve method when hasSpline is true', () => {
    const curveSpy = jest.fn();
    (area as jest.Mock).mockImplementationOnce(() => {
      const shape = (value: any) => value;
      shape.x = () => shape;
      shape.y = () => shape;
      shape.y0 = () => shape;
      shape.y1 = () => shape;
      shape.defined = () => shape;
      shape.curve = curveSpy;
      return shape;
    });

    mount(
      <svg>
        <Series
          {...mockProps}
          theme={{
            ...mockProps.theme,
            line: {...mockProps.theme.line, hasSpline: true},
          }}
        />
      </svg>,
    );

    expect(curveSpy).toHaveBeenCalled();
  });

  it('renders a point on the last data point of the line that is not null if hasPoint is true', () => {
    const actual = mount(
      <svg>
        <Series
          {...mockProps}
          series={{
            hasPoint: true,
            data: [
              {x: 0, y: 100},
              {x: 1, y: 200},
              {x: 2, y: 300},
              {x: 3, y: 400},
              {x: 4, y: 400},
              {x: 5, y: 1000},
              {x: 6, y: 200},
              {x: 7, y: 800},
              {x: 8, y: null},
              {x: 9, y: null},
              {x: 10, y: 400},
            ],
          }}
        />
      </svg>,
    );

    const [lastDataPoint] = mockSeries.data
      .filter(({y}) => y != null)
      .slice(-1);

    expect(actual).toContainReactComponent('circle', {
      cx: xScale(lastDataPoint.x),
      cy: yScale(lastDataPoint.y),
    });
  });
});
