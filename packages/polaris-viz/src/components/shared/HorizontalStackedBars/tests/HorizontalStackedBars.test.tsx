import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import {RoundedBorder} from '@shopify/polaris-viz-core';

import {
  HorizontalStackedBars,
  HorizontalStackedBarsProps,
} from '../HorizontalStackedBars';
import {StackedBar} from '../components';
import {FormattedStackedSeries} from '../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const STACKED_VALUES = [
  [
    [0, 5],
    [5, 10],
    [10, 15],
  ],
  [
    [0, 10],
    [10, 20],
    [20, 30],
  ],
  [
    [0, 12],
    [12, 24],
    [24, 36],
  ],
];

const MOCK_PROPS: HorizontalStackedBarsProps = {
  activeGroupIndex: -1,
  animationDelay: 0,
  ariaLabel: '',
  barHeight: 20,
  dataKeys: ['Group 1', 'Group 2', 'Group 3'],
  groupIndex: 0,
  id: 'id',
  isAnimated: false,
  name: 'stacked',
  stackedValues: STACKED_VALUES as FormattedStackedSeries[],
  xScale: scaleLinear(),
};

describe('<HorizontalStackedBars />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });

  it('renders <StackedBar />', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponentTimes(StackedBar, 3);
  });

  it('applies x offset', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.x).toStrictEqual(0);
    expect(bars[1].props.x).toStrictEqual(7);
    expect(bars[2].props.x).toStrictEqual(14);
  });

  it('applies roundedBorder to last item', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.roundedBorder).toStrictEqual(RoundedBorder.None);
    expect(bars[2].props.roundedBorder).toStrictEqual(RoundedBorder.Right);
  });
});
