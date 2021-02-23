import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {GradientArea} from '../GradientArea';

describe('<GradientArea />', () => {
  const mockProps = {
    series: {
      name: 'Primary',
      color: 'primary' as any,
      lineStyle: 'solid' as any,
      showArea: false,
      data: [
        {label: 'Jan 1', rawValue: 1500},
        {label: 'Jan 2', rawValue: 1000},
        {label: 'Jan 3', rawValue: 800},
        {label: 'Jan 4', rawValue: 1300},
      ],
    },
    xScale: scaleLinear(),
    yScale: scaleLinear(),
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
});
