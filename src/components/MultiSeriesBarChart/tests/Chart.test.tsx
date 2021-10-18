import React from 'react';
import {mount} from '@shopify/react-testing';

import {YAxis, BarChartXAxis} from '../../../components';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {TooltipAnimatedContainer} from '../../../components/TooltipWrapper';
import {Chart} from '../Chart';
import {BarGroup, StackedBarGroup} from '../components';

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

  const mockProps = {
    series: [
      {
        data: [
          {label: 'stuff 1', rawValue: 10},
          {label: 'stuff 2', rawValue: 20},
          {label: 'stuff 3', rawValue: 30},
        ],
        color: 'black',
        highlightColor: 'black',
        name: 'LABEL1',
      },
      {
        data: [
          {label: 'stuff 1', rawValue: 10},
          {label: 'stuff 2', rawValue: 20},
          {label: 'stuff 3', rawValue: 30},
        ],
        color: 'red',
        highlightColor: 'red',
        name: 'LABEL2',
      },
    ],
    chartDimensions: {width: 500, height: 250},
    renderTooltipContent,
    isStacked: false,
    xAxisOptions: {
      labelFormatter: jest.fn((value: string) => value.toString()),
      showTicks: true,
      labels: ['stuff 1', 'stuff 2', 'stuff 3'],
      labelColor: 'red',
      hide: false,
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      labelColor: 'red',
      backgroundColor: 'transparent',
      integersOnly: false,
    },
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
    mount(<Chart {...mockProps} />);
    expect(mockProps.xAxisOptions.labelFormatter).toHaveBeenCalledTimes(3);
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
      const chart = mount(<Chart {...mockProps} series={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });
  });

  describe('<BarGroup />', () => {
    it('renders a BarGroup for each data item', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(BarGroup, 3);
    });

    it('passes isSubdued props to the BarGroup around what is being hovered', () => {
      const chart = mount(<Chart {...mockProps} />);

      triggerSVGMouseMove(chart);

      expect(chart).toContainReactComponent(BarGroup, {
        isSubdued: true,
      });
    });

    it('does not render BarGroup if isStacked is true', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).not.toContainReactComponent(BarGroup);
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mountWithProvider(
          <Chart
            {...mockProps}
            series={[
              {
                ...mockProps.series[0],
                data: [
                  {label: '', rawValue: -1},
                  {label: '', rawValue: 0},
                  {label: '', rawValue: -2},
                ],
              },
              {
                ...mockProps.series[1],
                data: [
                  {label: '', rawValue: -3},
                  {label: '', rawValue: -4},
                  {label: '', rawValue: -1},
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
            series={[
              {
                ...mockProps.series[0],
                data: [
                  {label: '', rawValue: 3},
                  {label: '', rawValue: 0},
                  {label: '', rawValue: -3},
                ],
              },
              {
                ...mockProps.series[1],
                data: [
                  {label: '', rawValue: -4},
                  {label: '', rawValue: 5},
                  {label: '', rawValue: -4},
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
            series={[
              {
                ...mockProps.series[0],
                data: [
                  {label: '', rawValue: 0},
                  {label: '', rawValue: 0},
                  {label: '', rawValue: 0},
                ],
              },
              {
                ...mockProps.series[1],
                data: [
                  {label: '', rawValue: 0},
                  {label: '', rawValue: 0},
                  {label: '', rawValue: 0},
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
            series={[
              {
                ...mockProps.series[0],
                data: [
                  {label: '', rawValue: 0},
                  {label: '', rawValue: -5},
                  {label: '', rawValue: 0},
                ],
              },
              {
                ...mockProps.series[1],
                data: [
                  {label: '', rawValue: 0},
                  {label: '', rawValue: 0},
                  {label: '', rawValue: -3},
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

  describe('<StackedBarGroup />', () => {
    it('renders StackedBarGroup if isStacked is true', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).toContainReactComponent(StackedBarGroup);
    });

    it('renders a StackedBarGroup for each stacked data item', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).toContainReactComponentTimes(StackedBarGroup, 2);
    });

    it('passes active props to the BarGroup that is being hovered', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      triggerSVGMouseMove(chart);

      expect(chart).toContainReactComponent(StackedBarGroup, {
        activeBarGroup: 0,
      });
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
});
