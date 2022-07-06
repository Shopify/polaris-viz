import React from 'react';
import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {HorizontalBarChartXAxisLabels} from '../../../components/HorizontalBarChartXAxisLabels';
import {LegendContainer} from '../../LegendContainer';
import {
  GradientDefs,
  GroupLabel,
  HorizontalBars,
  HorizontalStackedBars,
} from '../../shared';
import {Chart, ChartProps} from '../Chart';
import {
  HorizontalBarChartXAnnotations,
  HorizontalBarChartYAnnotations,
  VerticalGridLines,
} from '../components';
import {normalizeData} from '../../../utilities';

jest.mock('../../Labels/utilities/getWidestLabel', () => {
  return {
    getWidestLabel: () => {
      return {truncatedWidth: 50};
    },
  };
});

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
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
      {value: 1, key: 'Label 01'},
      {value: 2, key: 'Label 02'},
      {value: 3, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS: ChartProps = {
  annotationsLookupTable: {},
  dimensions: {
    height: 300,
    width: 600,
  },
  isAnimated: false,
  renderTooltipContent: (value) => `${value}`,
  data: DATA,
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
    hide: false,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
  },
  showLegend: false,
  type: 'default',
  theme: 'Default',
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
    describe('hide', () => {
      it('renders <VerticalGridLines /> when false', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              ...MOCK_PROPS.xAxisOptions,
              labelFormatter: MOCK_PROPS.xAxisOptions.labelFormatter,
              hide: false,
            }}
          />,
        );

        expect(chart).toContainReactComponent(VerticalGridLines);
        expect(chart).toContainReactComponent(HorizontalBarChartXAxisLabels);
      });

      it('does not render <VerticalGridLines /> when true', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            xAxisOptions={{
              ...MOCK_PROPS.xAxisOptions,
              labelFormatter: MOCK_PROPS.xAxisOptions.labelFormatter,
              hide: true,
            }}
          />,
        );

        expect(chart).not.toContainReactComponent(VerticalGridLines);
        expect(chart).not.toContainReactComponent(
          HorizontalBarChartXAxisLabels,
        );
      });
    });
  });

  describe('type', () => {
    it('renders <HorizontalStackedBars /> when stacked', () => {
      const chart = mount(<Chart {...MOCK_PROPS} type="stacked" />);

      expect(chart).toContainReactComponent(HorizontalStackedBars);
    });

    it('renders <HorizontalBars /> when default', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalBars);
    });
  });

  describe('showLegend', () => {
    it('does not render <LegendContainer /> when false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(300);
    });

    it('renders <LegendContainer /> when true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
    });
  });

  describe('annotationsLookupTable', () => {
    it('does not render <HorizontalBarChartXAnnotations /> when empty', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const group = chart.find('g');

      expect(chart).not.toContainReactComponent(HorizontalBarChartXAnnotations);
      expect(chart).not.toContainReactComponent(HorizontalBarChartYAnnotations);

      expect(group?.props.transform).toStrictEqual(
        'translate(23.076923076923077, 5)',
      );
    });

    it('renders <Annotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '1',
            label: 'Sales increase',
          },
        ],
        'startKey',
      );

      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />,
      );
      const group = chart.find('g');

      expect(chart).toContainReactComponent(HorizontalBarChartXAnnotations);
      expect(chart).toContainReactComponent(HorizontalBarChartYAnnotations);

      expect(group?.props.transform).toStrictEqual(
        'translate(23.076923076923077, 33)',
      );
    });
  });
});
