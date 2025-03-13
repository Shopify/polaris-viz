import {mount} from '@shopify/react-testing';
import type {
  LineChartDataSeriesWithDefaults,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {
  LinearGradientWithStops,
  LineSeries,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {LegendContainer} from '../../LegendContainer';
import {Crosshair} from '../../../components/Crosshair';
import {VisuallyHiddenRows} from '../../../components/VisuallyHiddenRows';
import {Point} from '../../../components/Point';
import {triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {
  mockDefaultTheme,
  mountWithProvider,
} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {
  TooltipAnimatedContainer,
  TooltipWrapper,
} from '../../../components/TooltipWrapper';
import type {ChartProps} from '../Chart';
import {Chart} from '../Chart';
import {YAxis} from '../../YAxis';
import {Annotations, YAxisAnnotations} from '../../Annotations';
import {normalizeData} from '../../../utilities';
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';

const MOCK_DATA: Required<LineChartDataSeriesWithDefaults> = {
  name: 'Primary',
  color: 'red',
  areaColor: 'red',
  isComparison: false,
  data: [
    {key: 'Jan 1', value: 1500},
    {key: 'Jan 2', value: 1000},
    {key: 'Jan 3', value: 800},
    {key: 'Jan 4', value: 1300},
  ],
  metadata: {},
  styleOverride: {},
  fillValue: 0,
  strokeDasharray: '',
  width: 1,
};

const xAxisOptions: Required<XAxisOptions> = {
  allowLineWrap: false,
  labelFormatter: jest.fn(),
  hide: false,
};

const yAxisOptions: Required<YAxisOptions> = {
  fixedWidth: false,
  labelFormatter: jest.fn(),
  integersOnly: false,
  maxYOverride: 1,
};

const MOCK_PROPS: ChartProps = {
  data: [MOCK_DATA],
  annotationsLookupTable: {},
  xAxisOptions,
  yAxisOptions,
  renderAnnotationContent: jest.fn(() => <p>Mock Annotation</p>),
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  showLegend: false,
  seriesNameFormatter: (value) => `${value}`,
  hideLegendOverflow: false,
};

jest.mock('@shopify/polaris-viz-core/src/utilities/estimateStringWidth', () => {
  return {
    estimateStringWidth: () => 100,
  };
});

jest.mock('../../../utilities/getPathLength', () => {
  return {
    getPathLength: () => 0,
  };
});

jest.mock('../../../utilities/getPointAtLength', () => {
  return {
    getPointAtLength: () => ({x: 0, y: 0}),
  };
});

jest.mock('../../TooltipWrapper/utilities/eventPoint', () => {
  return {
    ...jest.requireActual('../../TooltipWrapper/utilities/eventPoint'),
    eventPointNative: () => {
      return {clientX: 200, clientY: 200, svgX: 200, svgY: 200};
    },
  };
});

jest.mock('d3-shape', () => ({
  ...jest.requireActual('d3-shape'),
  line: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    shape.curve = () => shape;
    shape.defined = () => shape;
    return shape;
  }),
}));

jest.mock('@shopify/polaris-viz-core/src/hooks/useChartContext', () => ({
  useChartContext: jest.fn(() => ({
    ...MOCK_DEFAULT_CHART_CONTEXT,
    containerBounds: {width: 500, height: 250, x: 0, y: 0},
  })),
}));

jest.mock('../../../hooks/useResizeObserver', () => {
  return {
    useResizeObserver: () => {
      return {
        setRef: () => {},
        entry: {
          contentRect: {
            width: 100,
            height: 100,
          },
          target: {
            getBoundingClientRect: () => ({
              width: 100,
              height: 100,
            }),
          },
        },
      };
    },
  };
});

const useChartContextMock = useChartContext as jest.Mock;

describe('<Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      containerBounds: {width: 500, height: 250, x: 0, y: 0},
    });
  });

  it('renders an svg element', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('sets an active point and tooltip position on svg mouse or touch interaction', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(Point, {active: true});
  });

  it('renders a <YAxis />', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent(YAxis);
  });

  it('renders a <LineSeries /> for each data-point', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        data={[MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}]}
      />,
    );

    expect(chart).toContainReactComponentTimes(LineSeries, 2);
  });

  it('renders a <Point /> for each data item in each data-point', () => {
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      shouldAnimate: false,
    });

    const data = [MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}];
    const chart = mount(<Chart {...MOCK_PROPS} data={data} />);

    expect(chart).toContainReactComponentTimes(Point, 8);
  });

  it('renders an additional <Point /> for each data-point if isAnimated is true', () => {
    useChartContextMock.mockReturnValue({
      ...MOCK_DEFAULT_CHART_CONTEXT,
      shouldAnimate: true,
    });

    const data = [MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}];
    const chart = mount(<Chart {...MOCK_PROPS} data={data} />);

    expect(chart).toContainReactComponentTimes(Point, 8 + data.length);
  });

  it('passes props to <Point />', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        data={[MOCK_DATA, {...MOCK_DATA, name: 'A second data-point'}]}
      />,
    );

    expect(chart).toContainReactComponent(Point, {
      color: 'rgb(255, 0, 0)',
      cx: 0,
      cy: 0,
      active: false,
      index: 0,
      tabIndex: 0,
    });
  });

  it('passes maxYOverride as a prop', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        yAxisOptions={{...MOCK_PROPS.yAxisOptions, maxYOverride: 10}}
      />,
    );

    expect(chart.prop('yAxisOptions').maxYOverride).toStrictEqual(10);
  });

  it('renders tooltip content inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    // No tooltip if there is no active point
    expect(chart).not.toContainReactText('Mock Tooltip');
    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  it('renders <VisuallyHiddenRows />', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).toContainReactComponent(VisuallyHiddenRows, {
      data: MOCK_PROPS.data,
      xAxisLabels: MOCK_DATA.data.map(({key}) => `${key}`),
    });
  });

  describe('<Crosshair />', () => {
    it('renders a <Crosshair /> at full opacity if there is an active point', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      triggerSVGMouseMove(chart);

      expect(chart.find(Crosshair)).toHaveReactProps({opacity: 1});
    });

    it('renders a <Crosshair /> at 0 opacity if there is no active point', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart.find(Crosshair)).toHaveReactProps({opacity: 0});
    });

    it('correctly positions <Crosshair /> for single data point', () => {
      const mockSingleDataPoint: Required<LineChartDataSeriesWithDefaults> = {
        ...MOCK_DATA,
        data: [{key: 'Apr 1', value: 1500}],
      };

      const chart = mount(
        <Chart {...MOCK_PROPS} data={[mockSingleDataPoint]} />,
      );

      triggerSVGMouseMove(chart);

      const crosshair = chart.find(Crosshair);

      expect(crosshair).toHaveReactProps({
        opacity: 1,
        x: 173.5,
      });
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });

    it('does not render crosshair for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactComponent(Crosshair);
    });

    it('does not render Visually Hidden Rows for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactComponent(VisuallyHiddenRows);
    });
  });

  describe('data-point.color', () => {
    describe('is a CSS color color', () => {
      it('removes transparency for <Point />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: 'rgba(255, 255, 255, 0.5)',
              },
            ]}
          />,
        );

        expect(chart.find(Point)).toHaveReactProps({
          color: 'rgb(255, 255, 255)',
        });
      });

      it('does not remove transparency for <Line />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: 'rgb(255, 255, 255)',
              },
            ]}
          />,
        );

        const lineSeries = chart.find(LineSeries);

        expect(lineSeries?.props.data.color).toStrictEqual(
          'rgb(255, 255, 255)',
        );
      });
    });

    describe('is of type GradientStop[]', () => {
      it('renders a LinearGradientWithStops if data-point color is a gradient', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'red',
                  },
                ],
              },
            ]}
          />,
        );

        expect(chart).toContainReactComponent(LinearGradientWithStops);
      });

      it('passes point gradient url as color prop to <Point />', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'red',
                  },
                ],
              },
            ]}
          />,
        );

        const pointColor = chart.find(Point)?.prop('color');

        expect(pointColor).toContain('url(#lineChartGradient-');
      });

      it('removes transparency from the gradient', () => {
        const chart = mount(
          <Chart
            {...MOCK_PROPS}
            data={[
              {
                ...MOCK_DATA,
                color: [
                  {
                    offset: 1,
                    color: 'rgba(255, 0, 0, 0.1)',
                  },
                ],
              },
            ]}
          />,
        );

        expect(chart).toContainReactComponent(LinearGradientWithStops, {
          gradient: [
            {
              offset: 1,
              color: 'rgb(255, 0, 0)',
            },
          ],
        });
      });
    });
  });

  describe('gridOptions.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const chart = mountWithProvider(
        <Chart {...MOCK_PROPS} />,
        mockDefaultTheme({grid: {showHorizontalLines: false}}),
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mountWithProvider(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });

  describe('gridOptions.horizontalMargin', () => {
    it('applies horizontalMargin to chart', () => {
      const chart = mountWithProvider(
        <Chart {...MOCK_PROPS} />,
        mockDefaultTheme({grid: {horizontalMargin: 75}}),
      );

      expect(chart).toContainReactComponent(YAxis, {
        x: 75,
      });
    });
  });

  describe('annotationsLookupTable', () => {
    it('does not render <Annotations /> when empty', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const group = chart.find('g', {transform: 'translate(0,8)'});

      expect(chart).not.toContainReactComponent(Annotations);
      expect(chart).not.toContainReactComponent(YAxisAnnotations);
      expect(group).toBeDefined();
    });

    it('renders <Annotations /> when provided', () => {
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
      const group = chart.find('g', {transform: 'translate(0,36)'});

      expect(chart).toContainReactComponent(Annotations);
      expect(chart).not.toContainReactComponent(YAxisAnnotations);
      expect(group).toBeDefined();
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
        <Chart
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />,
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
        <Chart
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />,
      );

      expect(chart).toContainReactComponent(YAxisAnnotations);
      expect(chart).toContainReactComponent(Annotations);
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
      const chart = mount(<Chart {...MOCK_PROPS} showLegend={false} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(250);
    });

    it('does not render <LegendContainer /> when the chart has a height of less than 125', () => {
      useChartContextMock.mockReturnValue({
        ...MOCK_DEFAULT_CHART_CONTEXT,
        containerBounds: {width: 100, height: 100, x: 0, y: 0},
      });

      const chart = mount(<Chart {...MOCK_PROPS} />);
      expect(chart).not.toContainReactComponent(LegendContainer);
    });
  });

  describe('<TooltipWrapper />', () => {
    it('does not render <TooltipWrapper /> data series is empty', () => {
      const chart = mount(
        <Chart {...MOCK_PROPS} data={[{name: 'Empty', color: [], data: []}]} />,
      );

      expect(chart).not.toContainReactComponent(TooltipWrapper);
    });

    it('renders <TooltipWrapper /> data series has data', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(TooltipWrapper);
    });
  });
});
