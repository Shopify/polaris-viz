import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

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

const MOCK_PROPS: HorizontalGroupProps = {
  animationDelay: 0,
  areAllNegative: false,
  ariaLabel: '',
  barHeight: 12,
  containerWidth: 200,
  id: 'id',
  index: 1,
  isAnimated: false,
  isSimple: false,
  isStacked: false,
  labelFormatter: (value) => `${value}`,
  name: 'name',
  opacity: 0 as any,
  data: DATA,
  transform: '' as any,
  xScale: scaleLinear(),
  xScaleStacked: scaleLinear(),
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
