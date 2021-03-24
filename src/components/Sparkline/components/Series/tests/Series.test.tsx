import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {Series} from '../Series';
import {LinearGradient} from '../../../../LinearGradient';

jest.mock('d3-shape', () => ({
  area: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    shape.y0 = () => shape;
    shape.y1 = () => shape;
    shape.curve = () => shape;
    return shape;
  }),
}));

const mockSeries = {
  color: 'colorRed' as any,
  areaStyle: 'none' as any,
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

const mockProps = {
  xScale: scaleLinear(),
  yScale: scaleLinear(),
  series: mockSeries,
  isAnimated: false,
  height: 250,
  hasSpline: false,
};

jest.mock('utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'sparkline-1'),
}));

describe('Series', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
      }),
    });
  });

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
      strokeDasharray: '',
    });
  });

  it('sets the strokeDasharay if the style is dashed', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} series={{...mockSeries, lineStyle: 'dashed'}} />
      </svg>,
    );
    expect(actual).toContainReactComponent('path', {
      strokeDasharray: '2 4',
    });
  });

  it('renders an additional path if an area style is set', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} series={{...mockSeries, areaStyle: 'solid'}} />
      </svg>,
    );

    expect(actual).toContainReactComponentTimes('path', 2);
  });

  it('uses a URL as the fill if the area style is set to gradient', () => {
    const actual = mount(
      <svg>
        <Series
          {...mockProps}
          series={{...mockSeries, areaStyle: 'gradient'}}
        />
      </svg>,
    );

    expect(actual).toContainReactComponent('path', {fill: 'url(#sparkline-1)'});
  });

  it('renders a LinearGradient if the area style is set to gradient', () => {
    const actual = mount(
      <svg>
        <Series
          {...mockProps}
          series={{...mockSeries, areaStyle: 'gradient'}}
        />
      </svg>,
    );

    expect(actual).toContainReactComponent(LinearGradient);
  });

  it('calls the d3 curve method when hasSpline is true', () => {
    const curveSpy = jest.fn();
    (area as jest.Mock).mockImplementationOnce(() => {
      const shape = (value: any) => value;
      shape.x = () => shape;
      shape.y = () => shape;
      shape.y0 = () => shape;
      shape.y1 = () => shape;
      shape.curve = curveSpy;
      return shape;
    });

    mount(
      <svg>
        <Series {...mockProps} hasSpline />
      </svg>,
    );

    expect(curveSpy).toHaveBeenCalled();
  });
});
