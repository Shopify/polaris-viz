import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {GradientArea, Props} from '../GradientArea';

jest.mock('d3-shape', () => ({
  area: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y0 = () => shape;
    shape.y1 = () => shape;
    return shape;
  }),
}));

describe('<GradientArea />', () => {
  const mockProps: Props = {
    series: {
      name: 'Primary',
      color: 'primary' as any,
      lineStyle: 'solid' as any,
      areaColor: '#ff0000',
      data: [
        {key: 'Jan 1', value: 1500},
        {key: 'Jan 2', value: 1000},
        {key: 'Jan 3', value: 800},
        {key: 'Jan 4', value: 1300},
      ],
    },
    xScale: scaleLinear(),
    yScale: scaleLinear(),
    hasSpline: false,
  };

  it('renders a linear gradient', () => {
    const actual = mount(
      <svg>
        <GradientArea {...mockProps} />
      </svg>,
    );
    expect(actual).toContainReactComponent('linearGradient');
  });

  it('renders stops', () => {
    const actual = mount(
      <svg>
        <GradientArea {...mockProps} />
      </svg>,
    );
    expect(actual).toContainReactComponent('stop');
  });

  it('renders a path', () => {
    const actual = mount(
      <svg>
        <GradientArea {...mockProps} />
      </svg>,
    );
    expect(actual).toContainReactComponent('path');
  });

  it('calls the d3 curve method when hasSpline is true', () => {
    const curveSpy = jest.fn();
    (area as jest.Mock).mockImplementationOnce(() => {
      const shape = (value: any) => value;
      shape.x = () => shape;
      shape.y0 = () => shape;
      shape.y1 = () => shape;
      shape.curve = curveSpy;
      return shape;
    });

    mount(
      <svg>
        <GradientArea {...mockProps} hasSpline />
      </svg>,
    );

    expect(curveSpy).toHaveBeenCalled();
  });

  describe('areaColor', () => {
    it('gets passed to <stop/>', () => {
      const actual = mount(
        <svg>
          <GradientArea {...mockProps} />
        </svg>,
      );
      expect(actual).toContainReactComponent('stop', {stopColor: '#ff0000'});
    });
  });
});
