import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {LIGHT_THEME} from '@shopify/polaris-viz-core';

import {HorizontalBarChartXAxisLabels} from '../../../components/HorizontalBarChartXAxisLabels';
import {LegendContainer} from '../../LegendContainer';
import {
  GradientDefs,
  GroupLabel,
  HorizontalBars,
  HorizontalStackedBars,
} from '../../shared';
import type {ChartProps} from '../Chart';
import {Chart} from '../Chart';
import {
  HorizontalBarChartXAnnotations,
  HorizontalBarChartYAnnotations,
  VerticalGridLines,
} from '../components';
import {normalizeData} from '../../../utilities';
import {TooltipWrapper} from '../../TooltipWrapper';
// jest will not allow access to out of scope constants if they are not named `MOCK_`
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';
import {useChartContextMock} from '../../../../../../tests/setup/tests';

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
  isLargeDataSet: jest.fn(() => true),
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
  renderTooltipContent: (value) => `${value}`,
  data: DATA,
  xAxisOptions: {
    allowLineWrap: false,
    labelFormatter: (value) => `${value}`,
    hide: false,
  },
  yAxisOptions: {
    fixedWidth: false,
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
    maxYOverride: 100,
  },
  showLegend: false,
  type: 'default',
  seriesNameFormatter: (value) => `${value}`,
};

describe('<Chart />', () => {
  beforeAll(() => {
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      containerBounds: {height: 300, width: 100},
    });
  });

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
          LIGHT_THEME.seriesColors.all[0],
          LIGHT_THEME.seriesColors.all[1],
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
          LIGHT_THEME.seriesColors.all[0],
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

  describe('annotationsLookupTable', () => {
    it('does not render <HorizontalBarChartXAnnotations /> when empty', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const group = chart.find('g');

      expect(chart).not.toContainReactComponent(HorizontalBarChartXAnnotations);
      expect(chart).not.toContainReactComponent(HorizontalBarChartYAnnotations);
    });

    it('renders <HorizontalBarChartXAnnotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '1',
            label: 'Sales increase',
            axis: 'x',
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
      expect(chart).not.toContainReactComponent(HorizontalBarChartYAnnotations);
    });

    it('renders <HorizontalBarChartYAnnotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '1',
            label: 'Sales increase',
            axis: 'y',
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

      expect(chart).toContainReactComponent(HorizontalBarChartYAnnotations);
      expect(chart).not.toContainReactComponent(HorizontalBarChartXAnnotations);
    });

    it('renders <HorizontalBarChartXAnnotations /> & <HorizontalBarChartYAnnotations /> when provided', () => {
      const annotationsLookupTable = normalizeData(
        [
          {
            startKey: '10',
            label: 'Sales increase',
            axis: 'x',
          },
          {
            startKey: '1',
            label: 'Sales increase',
            axis: 'y',
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

      expect(chart).toContainReactComponent(HorizontalBarChartYAnnotations);
      expect(chart).toContainReactComponent(HorizontalBarChartXAnnotations);
    });
  });

  describe('<TooltipWrapper />', () => {
    it('does not render <TooltipWrapper /> data series is empty', () => {
      const chart = mount(
        <Chart {...MOCK_PROPS} data={[{name: 'Empty', data: []}]} />,
      );

      expect(chart).not.toContainReactComponent(TooltipWrapper);
    });

    it('renders <TooltipWrapper /> data series has data', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(TooltipWrapper);
    });
  });

  describe('<LegendContainer />', () => {
    it('renders <LegendContainer /> when showLegend is true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
    });

    it('renders <LegendContainer /> with renderLegendContent when showLegend is true', () => {
      const renderLegendContent = () => (
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
          <li>Group 3</li>
        </ul>
      );

      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          showLegend
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(chart).toContainReactComponent(LegendContainer, {
        renderLegendContent,
      });
    });

    it('does not render <LegendContainer /> when showLegend is false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(300);
    });
  });
});
