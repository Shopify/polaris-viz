import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import type {FormattedStackedSeries} from 'types';

import {HorizontalGroup, HorizontalGroupProps} from '../HorizontalGroup';
import {HorizontalStackedBars} from '../..';
import {HorizontalBars} from '../../HorizontalBars';

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

const MOCK_PROPS: HorizontalGroupProps = {
  animationDelay: 0,
  areAllNegative: false,
  ariaLabel: '',
  barHeight: 12,
  containerWidth: 200,
  data: DATA,
  id: 'id',
  index: 1,
  isAnimated: false,
  isSimple: false,
  isStacked: false,
  labelFormatter: (value) => `${value}`,
  name: 'name',
  opacity: 0 as any,
  stackedValues: STACKED_VALUES as FormattedStackedSeries,
  transform: '' as any,
  xScale: scaleLinear(),
  zeroPosition: 0,
};

describe('<HorizontalGroup />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <HorizontalGroup {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });

  describe('isStacked', () => {
    it('renders <HorizontalStackedBars /> when true', () => {
      const chart = mount(
        <svg>
          <HorizontalGroup {...MOCK_PROPS} isStacked />
        </svg>,
      );

      expect(chart).toContainReactComponent(HorizontalStackedBars);
    });

    it('renders <HorizontalBars /> when false', () => {
      const chart = mount(
        <svg>
          <HorizontalGroup {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent(HorizontalBars);
    });
  });
});
