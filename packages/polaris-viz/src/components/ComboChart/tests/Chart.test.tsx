import {mount} from '@shopify/react-testing';
import type {DataGroup} from '@shopify/polaris-viz-core';

import type {ChartProps} from '../Chart';
import {Chart} from '../Chart';
import {getXAxisOptionsWithDefaults, normalizeData} from '../../../utilities';
import {LegendContainer} from '../../LegendContainer';
import {Annotations, YAxisAnnotations} from '../../Annotations';
import {AxisLabel} from '../components';
import {YAxis} from '../../YAxis';
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';
import {useChartContextMock} from '../../../../../../tests/setup/tests';

jest.mock('../../../hooks/useEstimateStringWidth', () => ({
  useEstimateStringWidth: () => 100,
}));

jest.mock('../../../hooks/useThemeSeriesColorsForDataGroup', () => ({
  useThemeSeriesColorsForDataGroup: () => [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
  ],
}));

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
  getAverageColor: jest.fn(() => 'red'),
}));

const DATA: DataGroup[] = [
  {
    shape: 'Bar',
    name: 'Total Sales',
    series: [
      {
        name: 'POS',
        data: [{value: 3, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Online',
        data: [{value: 4, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Mobile',
        data: [{value: 7, key: '2020-07-07T12:00:00'}],
      },
    ],
  },
  {
    shape: 'Line',
    name: 'Total Sessions',
    series: [
      {
        name: 'Sessions from Google ads',
        data: [{value: 333, key: '2020-07-07T12:00:00'}],
      },
      {
        name: 'Sessions from Facebooks ads',
        data: [{value: 709, key: '2020-07-07T12:00:00'}],
      },
    ],
  },
];

const PROPS: ChartProps = {
  annotationsLookupTable: {},
  data: DATA,
  renderTooltipContent: () => null,
  showLegend: false,
  theme: 'Light',
  xAxisOptions: getXAxisOptionsWithDefaults(),
  seriesNameFormatter: (value) => `${value}`,
};

describe('<Chart />', () => {
  beforeAll(() => {
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      containerBounds: {height: 400, width: 800, x: 0, y: 0},
    });
  });

  describe('<LegendContainer />', () => {
    it('renders <LegendContainer /> when showLegend is true', () => {
      const chart = mount(<Chart {...PROPS} showLegend />);

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
          {...PROPS}
          showLegend
          renderLegendContent={renderLegendContent}
        />,
      );

      expect(chart).toContainReactComponent(LegendContainer, {
        renderLegendContent,
      });
    });

    it('does not render <LegendContainer /> when showLegend is false', () => {
      const chart = mount(<Chart {...PROPS} showLegend={false} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(400);
    });
  });

  describe('annotationsLookupTable', () => {
    it('does not render <Annotations /> when empty', () => {
      const chart = mount(<Chart {...PROPS} />);

      expect(chart).not.toContainReactComponent(Annotations);
      expect(chart).not.toContainReactComponent(YAxisAnnotations);
    });

    it('renders <Annotations /> when not empty', () => {
      const annotationsLookupTable = normalizeData(
        [{label: '', startIndex: 0, axis: 'x'}],
        'startIndex',
      );

      const chart = mount(
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(Annotations);
    });

    it('renders <YAXisAnnotations /> when provided', () => {
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
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(YAxisAnnotations);
      expect(chart).not.toContainReactComponent(Annotations);
    });

    it('renders <Annotations /> & <YAXisAnnotations /> when provided', () => {
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
        <Chart {...PROPS} annotationsLookupTable={annotationsLookupTable} />,
      );

      expect(chart).toContainReactComponent(YAxisAnnotations);
      expect(chart).toContainReactComponent(Annotations);
    });
  });

  describe('<AxisLabel />', () => {
    it('renders <AxisLabel /> for each axis', () => {
      const component = mount(<Chart {...PROPS} />);

      expect(component).toContainReactComponentTimes(AxisLabel, 2);
    });

    it('renders only primary <AxisLabel />', () => {
      const component = mount(
        <Chart
          {...PROPS}
          data={[
            {
              shape: 'Bar',
              name: 'Total Sales',
              series: [
                {
                  name: 'POS',
                  data: [{value: 3, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
            {
              shape: 'Line',
              series: [
                {
                  name: 'Sessions from Google ads',
                  data: [{value: 333, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
          ]}
        />,
      );

      expect(component).toContainReactComponentTimes(AxisLabel, 1);
      expect(component).toContainReactComponent(AxisLabel, {
        name: 'Total Sales',
      });
    });

    it('renders only secondary <AxisLabel />', () => {
      const component = mount(
        <Chart
          {...PROPS}
          data={[
            {
              shape: 'Bar',
              series: [
                {
                  name: 'POS',
                  data: [{value: 3, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
            {
              shape: 'Line',
              name: 'Total Sessions',
              series: [
                {
                  name: 'Sessions from Google ads',
                  data: [{value: 333, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
          ]}
        />,
      );

      expect(component).toContainReactComponentTimes(AxisLabel, 1);
      expect(component).toContainReactComponent(AxisLabel, {
        name: 'Total Sessions',
      });
    });

    it('applies outside offset for each <AxisLabel />', () => {
      const component = mount(<Chart {...PROPS} />);

      const [primaryAxis, secondaryAxis] = component.findAll(YAxis);

      expect(primaryAxis).toHaveReactProps({
        x: 44,
        y: 5,
      });

      expect(secondaryAxis).toHaveReactProps({
        x: 656,
        y: 5,
      });
    });

    it('does not apply outside offset when no AxisLabels are used', () => {
      const component = mount(
        <Chart
          {...PROPS}
          data={[
            {
              shape: 'Bar',
              series: [
                {
                  name: 'POS',
                  data: [{value: 3, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
            {
              shape: 'Line',
              series: [
                {
                  name: 'Sessions from Google ads',
                  data: [{value: 333, key: '2020-07-07T12:00:00'}],
                },
              ],
            },
          ]}
        />,
      );

      const [primaryAxis, secondaryAxis] = component.findAll(YAxis);

      expect(primaryAxis).toHaveReactProps({
        x: 16,
        y: 5,
      });

      expect(secondaryAxis).toHaveReactProps({
        x: 684,
        y: 5,
      });
    });
  });
});
