import React from 'react';
import {mount} from '@shopify/react-testing';

import {Chart, ChartProps} from '../Chart';
import {
  GroupLabel,
  XAxisLabels,
  GradientDefs,
  VerticalGridLines,
  Label,
  StackedBars,
  HorizontalBars,
} from '../components';
import type {Series} from '../types';

const SERIES: Series[] = [
  {
    name: 'Group 1',
    data: [
      {rawValue: 5, label: 'Label 01'},
      {rawValue: 10, label: 'Label 02'},
      {rawValue: 12, label: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {rawValue: 1, label: 'Label 01'},
      {rawValue: 2, label: 'Label 02'},
      {rawValue: 3, label: 'Label 03'},
    ],
  },
];

const MOCK_PROPS: ChartProps = {
  dimensions: {
    height: 300,
    width: 600,
  },
  isAnimated: false,
  isSimple: false,
  isStacked: false,
  renderTooltipContent: (value) => `${value}`,
  series: SERIES,
  xAxisOptions: {
    labelFormatter: (value: string) => value,
    hide: false,
  },
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
          [
            {color: 'colorMagenta90', offset: 0},
            {color: 'colorMagenta70', offset: 100},
          ],
        ]);
      });

      it('renders with color overrides', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            series={[
              {
                name: 'Group 1',
                data: [
                  {rawValue: 5, label: 'Label 01', color: 'red'},
                  {rawValue: 10, label: 'Label 02'},
                ],
              },
              {
                name: 'Group 2',
                data: [
                  {rawValue: 1, label: 'Label 01'},
                  {rawValue: 2, label: 'Label 02'},
                ],
              },
            ]}
          />,
        );
        const defs = chart.find(GradientDefs);

        expect(defs?.props.colorOverrides).toStrictEqual([
          {color: 'red', id: 'HorizontalBarChart-8-series-0-0'},
        ]);
      });
    });

    it('renders <GroupLabel />', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponentTimes(GroupLabel, 2);
    });
  });

  describe('isSimple', () => {
    it('renders <VerticalGridLines /> & <XAxisLabels /> when false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(VerticalGridLines);
      expect(chart).toContainReactComponent(XAxisLabels);
    });
  });

  describe('xAxisOptions', () => {
    describe('hide', () => {
      it('renders <VerticalGridLines /> & <XAxisLabels /> when false', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              labelFormatter: MOCK_PROPS.xAxisOptions.labelFormatter,
              hide: false,
            }}
          />,
        );

        expect(chart).toContainReactComponent(VerticalGridLines);
        expect(chart).toContainReactComponent(XAxisLabels);
      });

      it('does not render <VerticalGridLines /> & <XAxisLabels /> when true', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              labelFormatter: MOCK_PROPS.xAxisOptions.labelFormatter,
              hide: true,
            }}
          />,
        );

        expect(chart).not.toContainReactComponent(VerticalGridLines);
        expect(chart).not.toContainReactComponent(XAxisLabels);
      });
    });

    describe('labelFormatter', () => {
      it('renders formatted xAxisLabels', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              labelFormatter: (value) => `${value} pickles`,
              hide: false,
            }}
          />,
        );

        const xAxisLabels = chart.findAll(XAxisLabels);

        expect(xAxisLabels[0]).toContainReactText('0 pickles');
      });

      it('renders formatted Labels', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            isSimple
            xAxisOptions={{
              labelFormatter: (value) => `${value} pickles`,
              hide: false,
            }}
          />,
        );

        const labels = chart.findAll(Label);

        expect(labels[0]).toContainReactText('5 pickles');
      });
    });
  });

  describe('isStacked', () => {
    it('renders <StackedBars /> when true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} isStacked />);

      expect(chart).toContainReactComponent(StackedBars);
    });

    it('renders <HorizontalBars /> when false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalBars);
    });
  });
});
