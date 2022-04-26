import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {HorizontalBars, HorizontalBarsProps} from '../HorizontalBars';
import {Bar, Label} from '../components';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: () => 100,
}));

const DATA: DataSeries[] = [
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

const MOCK_PROPS: HorizontalBarsProps = {
  activeGroupIndex: -1,
  barHeight: 20,
  groupIndex: 0,
  id: 'id',
  isAnimated: false,
  isSimple: false,
  labelFormatter: (value) => `${value}`,
  name: 'Bar',
  data: DATA,
  xScale: scaleLinear(),
  zeroPosition: 0,
};

describe('<HorizontalBars />', () => {
  it('renders g', () => {
    const chart = mount(
      <svg>
        <HorizontalBars {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('g');
  });

  describe('isSimple', () => {
    it('renders <Label /> when true', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} isSimple />
        </svg>,
      );

      expect(chart).toContainReactComponent(Label);
    });

    it('does not render <Label /> when false', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).not.toContainReactComponent(Label);
    });
  });

  describe('labelFormatter', () => {
    it('renders a formatted label when provided', () => {
      const chart = mount(
        <svg>
          <HorizontalBars
            {...MOCK_PROPS}
            isSimple
            labelFormatter={(value) => `${value}%`}
          />
        </svg>,
      );

      const labels = chart.findAll(Label);

      expect(labels[0].props.label).toStrictEqual('5%');
    });

    it('renders an unformatted label when not provided', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} isSimple />
        </svg>,
      );
      const label = chart.findAll(Label);

      expect(label[0].props.label).toStrictEqual('5');
    });
  });

  describe('<Bar />', () => {
    it('renders <Bar />', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponentTimes(Bar, 3);
    });

    it('applies width', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} />
        </svg>,
      );

      const bars = chart.findAll(Bar);

      expect(bars[0].props.width).toStrictEqual(5);
    });
  });

  describe('<Label />', () => {
    it('is positioned for positive values', () => {
      const chart = mount(
        <svg>
          <HorizontalBars {...MOCK_PROPS} isSimple />
        </svg>,
      );

      const labels = chart.findAll(Label);

      expect(labels[0].props.x).toStrictEqual(15);
    });

    it('is positioned for negative values', () => {
      const chart = mount(
        <svg>
          <HorizontalBars
            {...MOCK_PROPS}
            isSimple
            data={[{data: [{value: -5, key: 'Label 01'}]}]}
          />
        </svg>,
      );

      const labels = chart.findAll(Label);

      expect(labels[0].props.x).toStrictEqual(-115);
    });
  });
});
