import React from 'react';
import {mount} from '@shopify/react-testing';

import {Chart, ChartProps} from '../Chart';
import {
  GroupLabel,
  GradientDefs,
  HorizontalStackedBars,
  HorizontalBars,
  Label,
} from '../../shared';
import type {DataSeries} from '../../../types';

const SERIES: DataSeries[] = [
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
      {value: 1, key: 'Label 01'},
      {value: 2, key: 'Label 02'},
      {value: 3, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS: ChartProps = {
  dimensions: {
    height: 300,
    width: 600,
  },
  isAnimated: false,
  data: SERIES,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
  },
  type: 'default',
};

describe('<Chart />', () => {
  describe('svg', () => {
    it('renders svg', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent('svg');
    });

    describe('<GradientDefs />', () => {
      it('renders <GradientDefs />', () => {
        const chart = mount(<Chart {...MOCK_PROPS} />);

        expect(chart).toContainReactComponent(GradientDefs);
      });

      it('renders with series colors', () => {
        const chart = mount(<Chart {...MOCK_PROPS} />);

        const defs = chart.find(GradientDefs);

        expect(defs?.props.seriesColors).toStrictEqual([
          [
            {color: 'colorIndigo90', offset: 0},
            {color: 'colorIndigo70', offset: 100},
          ],
          [
            {color: 'colorBlue90', offset: 0},
            {color: 'colorBlue70', offset: 100},
          ],
        ]);
      });

      it('renders with color overrides', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                name: 'Group 1',
                color: 'red',
                data: [
                  {value: 5, key: 'Label 01'},
                  {value: 10, key: 'Label 02'},
                ],
              },
              {
                name: 'Group 2',
                data: [
                  {value: 1, key: 'Label 01'},
                  {value: 2, key: 'Label 02'},
                ],
              },
            ]}
          />,
        );
        const defs = chart.find(GradientDefs);

        expect(defs?.props.seriesColors).toStrictEqual([
          'red',
          [
            {color: 'colorIndigo90', offset: 0},
            {color: 'colorIndigo70', offset: 100},
          ],
        ]);
      });
    });

    it('renders <GroupLabel />', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponentTimes(GroupLabel, 3);
    });
  });

  describe('xAxisOptions', () => {
    describe('labelFormatter', () => {
      it('renders formatted Labels', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              labelFormatter: (value) => `${value} pickles`,
            }}
          />,
        );

        const labels = chart.findAll(Label);

        expect(labels[0]).toContainReactText('5 pickles');
      });
    });
  });

  describe('type', () => {
    it('renders <HorizontalStackedBars /> when "stacked"', () => {
      const chart = mount(<Chart {...MOCK_PROPS} type="stacked" />);

      expect(chart).toContainReactComponent(HorizontalStackedBars);
    });

    it('renders <HorizontalBars /> when "default"', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalBars);
    });
  });
});
