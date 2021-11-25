import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {
  HorizontalStackedBars,
  HorizontalStackedBarsProps,
} from '../HorizontalStackedBars';
import {StackedBar} from '../components';
import {RoundedBorder} from '../../../../types';

jest.mock('d3-scale', () => ({
  scaleLinear: () => {
    function scale(value: any) {
      return value;
    }

    scale.ticks = () => [0, 1, 2];

    return scale;
  },
}));

const DATA = [
  {
    name: 'Group 1',
    data: [
      {value: 5, key: 'Label 01'},
      {value: 10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {value: 5, key: 'Label 01'},
      {value: 10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
  {
    name: 'Group 3',
    data: [
      {value: 5, key: 'Label 01'},
      {value: 10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS: HorizontalStackedBarsProps = {
  animationDelay: 0,
  ariaLabel: '',
  barHeight: 20,
  groupIndex: 0,
  id: 'id',
  isAnimated: false,
  name: 'stacked',
  data: DATA,
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

  it('uses default color when no color is provided', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars {...MOCK_PROPS} />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.color).toStrictEqual('Default-grad--0');
  });

  it('uses custom color when provided', () => {
    const chart = mount(
      <svg>
        <HorizontalStackedBars
          {...MOCK_PROPS}
          data={[{data: [{value: 5, key: 'Label 01'}], color: 'red'}]}
        />
      </svg>,
    );

    const bars = chart.findAll(StackedBar);

    expect(bars[0].props.color).toStrictEqual('id-series-0-0');
  });
});
