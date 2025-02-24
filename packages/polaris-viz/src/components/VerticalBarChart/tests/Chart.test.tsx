import {mount} from '@shopify/react-testing';

import {useChartContextMock} from '../../../../../../tests/setup/tests';
import {YAxis, XAxis} from '../../../components';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {
  mockDefaultTheme,
  mountWithProvider,
} from '../../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {TooltipWrapper} from '../../../components/TooltipWrapper';
import type {Props} from '../Chart';
import {Chart} from '../Chart';
import {StackedBarGroups} from '../components';
import {LegendContainer} from '../../LegendContainer';
import {Annotations, YAxisAnnotations} from '../../Annotations';
import {normalizeData} from '../../../utilities';
import {TextLine} from '../../TextLine';
import {DEFAULT_CHART_CONTEXT as MOCK_DEFAULT_CHART_CONTEXT} from '../../../storybook/constants';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => {
  return {
    ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
    estimateStringWidth: () => 100,
  };
});

jest.mock('../../TooltipWrapper/utilities/eventPoint', () => {
  return {
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 150, svgY: 150};
    },
  };
});

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

const MOCK_PROPS: Props = {
  data: [
    {
      data: [
        {key: 'stuff 1', value: 10},
        {key: 'stuff 2', value: 20},
        {key: 'stuff 3', value: 30},
      ],
      color: 'black',
      name: 'LABEL1',
    },
    {
      data: [
        {key: 'stuff 1', value: 10},
        {key: 'stuff 2', value: 20},
        {key: 'stuff 3', value: 30},
      ],
      color: 'red',
      name: 'LABEL2',
    },
  ],
  renderTooltipContent: () => <p>Mock Tooltip</p>,
  xAxisOptions: {
    allowLineWrap: false,
    labelFormatter: jest.fn((value) => `${value}`),
    hide: false,
  },
  yAxisOptions: {
    fixedWidth: false,
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
    maxYOverride: 1,
  },
  type: 'default',
  showLegend: false,
  seriesNameFormatter: (value) => `${value}`,
};

describe('Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders an SVG element', () => {
    const multiSeriesBarChart = mount(<Chart {...MOCK_PROPS} />);

    expect(multiSeriesBarChart).toContainReactComponent('svg');
  });

  it('passes maxYOverride as a prop', () => {
    const chart = mount(
      <Chart
        {...MOCK_PROPS}
        yAxisOptions={{...MOCK_PROPS.yAxisOptions, maxYOverride: 1}}
      />,
    );

    expect(chart.prop('yAxisOptions').maxYOverride).toStrictEqual(1);
  });

  describe('XAxis', () => {
    it('renders <XAxis>', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      expect(chart).toContainReactComponent(XAxis);
    });

    it('does not render <XAxis> if it is hidden', () => {
      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          xAxisOptions={{...MOCK_PROPS.xAxisOptions, hide: true}}
        />,
      );
      expect(chart).not.toContainReactComponent(XAxis);
    });

    it('renders an yAxis', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      expect(chart).toContainReactComponent(YAxis);
    });

    it('formats the x axis labels', () => {
      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          xAxisOptions={{
            ...MOCK_PROPS.xAxisOptions,
            labelFormatter: (value) => `${value} pickles`,
          }}
        />,
      );

      const xAxis = chart.find(XAxis);

      expect(xAxis?.props.labels[0]).toStrictEqual('stuff 1 pickles');
    });

    it('renders all labels', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart.findAll(TextLine)).toHaveLength(3);
    });
  });

  describe('<StackedBarGroups />', () => {
    it('renders StackedBarGroups if type is stacked', () => {
      const chart = mount(<Chart {...MOCK_PROPS} type="stacked" />);

      expect(chart).toContainReactComponent(StackedBarGroups);
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
      const chart = mount(<Chart {...MOCK_PROPS} />);

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
        y: 5,
      });
    });
  });

  describe('annotationsLookupTable', () => {
    it('does not render <Annotations /> when empty', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).not.toContainReactComponent(Annotations);
      expect(chart).not.toContainReactComponent(YAxisAnnotations);
    });

    it('renders <Annotations /> when not empty', () => {
      const annotationsLookupTable = normalizeData(
        [{label: '', startIndex: 0, axis: 'x'}],
        'startIndex',
      );

      const chart = mount(
        <Chart
          {...MOCK_PROPS}
          annotationsLookupTable={annotationsLookupTable}
        />,
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

  describe('<TooltipWrapper />', () => {
    it('renders', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);

      expect(chart).toContainReactComponent(TooltipWrapper, {
        chartType: 'Bar',
        getMarkup: expect.any(Function),
        parentElement: expect.any(SVGElement),
      });
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
      useChartContextMock.mockReturnValue({
        ...MOCK_DEFAULT_CHART_CONTEXT,
        containerBounds: {width: 500, height: 250},
      });

      const chart = mount(<Chart {...MOCK_PROPS} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(250);
    });

    it('does not render <LegendContainer /> when the chart has a height of less than 125', () => {
      useChartContextMock.mockReturnValue({
        ...MOCK_DEFAULT_CHART_CONTEXT,
        containerBounds: {width: 100, height: 100},
      });

      const chart = mount(<Chart {...MOCK_PROPS} />);
      expect(chart).not.toContainReactComponent(LegendContainer);
    });
  });
});
