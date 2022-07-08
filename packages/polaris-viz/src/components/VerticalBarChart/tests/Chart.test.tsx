import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis, XAxis} from '../../../components';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mountWithProvider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {Chart, Props} from '../Chart';
import {StackedBarGroups} from '../components';
import {LegendContainer} from '../../LegendContainer';
import {Annotations, YAxisAnnotations} from '../../Annotations';
import {normalizeData} from '../../../utilities';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => {
  return {
    ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
    estimateStringWidth: () => 100,
  };
});

jest.mock('../../../utilities/eventPoint', () => {
  return {
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 150, svgY: 150};
    },
  };
});

const renderTooltipContent = () => <p>Mock Tooltip</p>;

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
  dimensions: {width: 500, height: 250},
  renderTooltipContent,
  xAxisOptions: {
    labelFormatter: jest.fn((value) => `${value}`),
    hide: false,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
  },
  type: 'default',
  showLegend: false,
  theme: 'Default',
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

  it('renders an Labels', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);
    expect(chart).toContainReactComponent(XAxis);
  });

  it('does not render Labels if it is hidden', () => {
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

  it('does not render <TooltipAnimatedContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders tooltip content inside a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...MOCK_PROPS} />);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...MOCK_PROPS} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
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

  describe('showLegend', () => {
    it('does not render <LegendContainer /> when false', () => {
      const chart = mount(<Chart {...MOCK_PROPS} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(250);
    });

    it('renders <LegendContainer /> when true', () => {
      const chart = mount(<Chart {...MOCK_PROPS} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
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
});
