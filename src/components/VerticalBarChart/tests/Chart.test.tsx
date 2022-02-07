import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis, BarChartXAxis} from '../../../components';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {Chart, Props} from '../Chart';
import {BarGroup, StackedBarGroups} from '../components';
import {LegendContainer} from '../../LegendContainer';

const ZERO_AS_MIN_HEIGHT_THEME = {
  themes: {
    Default: {
      bar: {
        zeroAsMinHeight: true,
      },
    },
  },
};

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 100, svgY: 100};
    },
  };
});

describe('Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const renderTooltipContent = () => <p>Mock Tooltip</p>;

  const mockProps: Props = {
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
      labelFormatter: jest.fn((value: string) => value.toString()),
      hide: false,
      wrapLabels: false,
      useMinimalLabels: false,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      integersOnly: false,
    },
    type: 'default',
    showLegend: false,
  };

  it('renders an SVG element', () => {
    const multiSeriesBarChart = mount(<Chart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent('svg');
  });

  it('renders an BarChartXAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(BarChartXAxis);
  });

  it('does not render BarChartXAxis if it is hidden', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        xAxisOptions={{...mockProps.xAxisOptions, hide: true}}
      />,
    );
    expect(chart).not.toContainReactComponent(BarChartXAxis);
  });

  it('renders an yAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis);
  });

  it('formats the x axis labels', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        xAxisOptions={{
          ...mockProps.xAxisOptions,
          labelFormatter: (value: string) => `${value} pickles`,
        }}
      />,
    );

    const xAxis = chart.find(BarChartXAxis);

    expect(xAxis?.props.labels[0].value).toStrictEqual('stuff 1 pickles');
  });

  it('does not render <TooltipAnimatedContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders tooltip content inside a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });
  });

  describe('<BarGroup />', () => {
    it('renders a BarGroup for each data item', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(BarGroup, 3);
    });

    it('does not render BarGroup if type is stacked', () => {
      const chart = mount(<Chart {...mockProps} type="stacked" />);

      expect(chart).not.toContainReactComponent(BarGroup);
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: -1},
                  {key: '', value: 0},
                  {key: '', value: -2},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: -3},
                  {key: '', value: -4},
                  {key: '', value: -1},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: true,
        });
      });

      it('receives false if not all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 3},
                  {key: '', value: 0},
                  {key: '', value: -3},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: -4},
                  {key: '', value: 5},
                  {key: '', value: -4},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });

      it('receives false if all values are 0', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: 0},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: 0},
                ],
              },
            ]}
          />,
          ZERO_AS_MIN_HEIGHT_THEME,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });

      it('receives false if zeroAsMinHeight is false', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            data={[
              {
                ...mockProps.data[0],
                data: [
                  {key: '', value: 0},
                  {key: '', value: -5},
                  {key: '', value: 0},
                ],
              },
              {
                ...mockProps.data[1],
                data: [
                  {key: '', value: 0},
                  {key: '', value: 0},
                  {key: '', value: -3},
                ],
              },
            ]}
          />,
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });
    });
  });

  describe('<StackedBarGroups />', () => {
    it('renders StackedBarGroups if type is stacked', () => {
      const chart = mount(<Chart {...mockProps} type="stacked" />);

      expect(chart).toContainReactComponent(StackedBarGroups);
    });
  });

  describe('gridOptions.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const chart = mountWithProvider(
        <Chart {...mockProps} />,
        mockDefaultTheme({grid: {showHorizontalLines: false}}),
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });

  describe('showLegend', () => {
    it('does not render <LegendContainer /> when false', () => {
      const chart = mount(<Chart {...mockProps} />);
      const svg = chart.find('svg');

      expect(chart).not.toContainReactComponent(LegendContainer);

      expect(svg?.props.height).toStrictEqual(250);
    });

    it('renders <LegendContainer /> when true', () => {
      const chart = mount(<Chart {...mockProps} showLegend />);

      expect(chart).toContainReactComponent(LegendContainer);
    });
  });
});
