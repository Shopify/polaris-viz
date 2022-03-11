import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {Series} from '../Series';
import {DEFAULT_THEME} from '../../../../../constants';

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

const mockData: DataSeries = {
  color: 'red',
  data: [
    {key: 0, value: 100},
    {key: 1, value: 200},
    {key: 2, value: 300},
    {key: 3, value: 400},
    {key: 4, value: 400},
    {key: 5, value: 1000},
    {key: 6, value: 200},
    {key: 7, value: 800},
    {key: 8, value: 900},
    {key: 9, value: 200},
    {key: 10, value: 400},
  ],
};

const xScale = scaleLinear();
const yScale = scaleLinear();

const mockProps = {
  xScale,
  yScale,
  data: mockData,
  isAnimated: false,
  svgDimensions: {height: 250, width: 250},
  hasSpline: false,
  theme: DEFAULT_THEME,
};

describe('Series', () => {
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

  it('sets the strokeDasharay if isComparison: true', () => {
    const actual = mount(
      <svg>
        <Series {...mockProps} data={{...mockData, isComparison: true}} />
      </svg>,
    );
    expect(actual).toContainReactComponent('path', {
      style: {strokeDasharray: '2 4'},
    });
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
          data={{
            data: [
              {key: 0, value: 100},
              {key: 1, value: 200},
              {key: 2, value: 300},
              {key: 3, value: 400},
              {key: 4, value: 400},
              {key: 5, value: 1000},
              {key: 6, value: 200},
              {key: 7, value: 800},
              {key: 8, value: null},
              {key: 9, value: null},
              {key: 10, value: 400},
            ],
          }}
        />
      </svg>,
    );

    const [lastDataPoint] = mockData.data
      .filter(({value}) => value != null)
      .slice(-1);

    expect(actual).toContainReactComponent('circle', {
      cx: xScale(Number(lastDataPoint.key)),
      cy: yScale(lastDataPoint.value!),
    });
  });
});
