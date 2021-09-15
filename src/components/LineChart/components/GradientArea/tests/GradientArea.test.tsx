import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {GradientArea} from 'components/LineChart/components/GradientArea/GradientArea';

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
  const mockProps = {
    series: {
      name: 'Primary',
      color: 'primary' as any,
      lineStyle: 'solid' as any,
      areaColor: '#ff0000',
      data: [
        {label: 'Jan 1', rawValue: 1500},
        {label: 'Jan 2', rawValue: 1000},
        {label: 'Jan 3', rawValue: 800},
        {label: 'Jan 4', rawValue: 1300},
      ],
    },
    xScale: scaleLinear(),
    yScale: scaleLinear(),
    hasSpline: false,
    isAnimated: false,
    index: 0,
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
