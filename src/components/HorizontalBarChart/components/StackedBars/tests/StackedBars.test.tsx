import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {StackedBars, StackedBarsProps} from '../StackedBars';
import {StackedBar} from '../../StackedBar';
import {RoundedBorder} from '../../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];

    return scale;
  },
}));

const SERIES = [
  {rawValue: 5, label: 'Label 01'},
  {rawValue: 10, label: 'Label 02'},
  {rawValue: 12, label: 'Label 03'},
];

const MOCK_PROPS: StackedBarsProps = {
  animationDelay: 0,
  ariaLabel: '',
  barHeight: 20,
  groupIndex: 1,
  id: 'id',
  isAnimated: false,
  name: 'stacked',
  series: SERIES,
  xScale: scaleLinear(),
};

describe('<StackedBars />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <StackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });

  it('renders <StackedBar />', () => {
    const chart = mount(
      <svg>
        <StackedBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponentTimes(StackedBar, 3);
  });

  it('applies x offset', () => {
    const chart = mount(
      <svg>
        <StackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.x).toStrictEqual(0);
    expect(bars[1].props.x).toStrictEqual(7);
    expect(bars[2].props.x).toStrictEqual(19);
  });

  it('applies roundedBorder to last item', () => {
    const chart = mount(
      <svg>
        <StackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.roundedBorder).toStrictEqual(RoundedBorder.None);
    expect(bars[2].props.roundedBorder).toStrictEqual(RoundedBorder.Right);
  });

  it('uses default color when no color is provided', () => {
    const chart = mount(
      <svg>
        <StackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.color).toStrictEqual('Default-grad--0');
  });

  it('uses custom color when provided', () => {
    const chart = mount(
      <svg>
        <StackedBars
          {...MOCK_PROPS}
          series={[{rawValue: 5, label: 'Label 01', color: 'red'}]}
        />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.color).toStrictEqual('id-series-1-0');
  });
});
