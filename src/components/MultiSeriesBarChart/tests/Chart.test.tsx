import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {
  YAxis,
  TooltipContainer,
  BarChartXAxis,
  HorizontalGridLines,
} from 'components';

import {Chart} from '../Chart';
import {BarGroup, StackedBarGroup} from '../components';

const fakeSVGEvent = {
  currentTarget: {
    getScreenCTM: () => ({
      inverse: () => ({x: 100, y: 100}),
    }),
    createSVGPoint: () => ({
      x: 100,
      y: 100,
      matrixTransform: () => ({x: 100, y: 100}),
    }),
  },
};

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
        color: 'colorBlack' as Color,
        highlightColor: 'colorBlack' as Color,
        name: 'LABEL1',
      },
      {
        data: [
          {label: 'stuff 1', rawValue: 10},
          {label: 'stuff 2', rawValue: 20},
          {label: 'stuff 3', rawValue: 30},
        ],
        color: 'colorRed' as Color,
        highlightColor: 'colorRed' as Color,
        name: 'LABEL2',
      },
    ],
    chartDimensions: {width: 500, height: 250},
    renderTooltipContent,
    barOptions: {
      innerMargin: 0,
      outerMargin: 0,
      hasRoundedCorners: false,
      isStacked: false,
    },
    xAxisOptions: {
      labelFormatter: jest.fn((value: string) => value.toString()),
      showTicks: true,
      labels: ['stuff 1', 'stuff 2', 'stuff 3'],
      labelColor: 'red',
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      labelColor: 'red',
      backgroundColor: 'transparent',
      integersOnly: false,
    },
    gridOptions: {
      showHorizontalLines: true,
      color: 'red',
      horizontalOverflow: false,
      horizontalMargin: 0,
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

  it('renders an yAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis);
  });

  it('formats the x axis labels', () => {
    mount(<Chart {...mockProps} />);
    expect(mockProps.xAxisOptions.labelFormatter).toHaveBeenCalledTimes(3);
  });

  it('does not render <TooltipContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipContainer);
  });

  it('renders tooltip content inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockProps} series={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipContainer);
    });
  });

  describe('<BarGroup />', () => {
    it('renders a BarGroup for each data item', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(BarGroup, 3);
    });

    it('passes isSubdued props to the BarGroup around what is being hovered', () => {
      const chart = mount(<Chart {...mockProps} />);

      const svg = chart.find('svg')!;
      svg.trigger('onMouseMove', fakeSVGEvent);

      expect(chart).toContainReactComponent(BarGroup, {
        isSubdued: true,
      });
    });

    it('does not render BarGroup if isStacked is true', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          barOptions={{...mockProps.barOptions, isStacked: true}}
        />,
      );

      expect(chart).not.toContainReactComponent(BarGroup);
    });

    describe('rotateZeroBars', () => {
      it('receives true if all values are 0 or negative', () => {
        const chart = mount(
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
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: true,
        });
      });

      it('receives false if not all values are 0 or negative', () => {
        const chart = mount(
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
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });

      it('receives false if all values are 0', () => {
        const chart = mount(
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
        );
        expect(chart).toContainReactComponent(BarGroup, {
          rotateZeroBars: false,
        });
      });
    });
  });

  describe('<StackedBarGroup />', () => {
    it('renders StackedBarGroup if isStacked is true', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          barOptions={{...mockProps.barOptions, isStacked: true}}
        />,
      );

      expect(chart).toContainReactComponent(StackedBarGroup);
    });

    it('renders a StackedBarGroup for each stacked data item', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          barOptions={{...mockProps.barOptions, isStacked: true}}
        />,
      );

      expect(chart).toContainReactComponentTimes(StackedBarGroup, 2);
    });

    it('passes active props to the BarGroup that is being hovered', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          barOptions={{...mockProps.barOptions, isStacked: true}}
        />,
      );

      const svg = chart.find('svg')!;
      svg.trigger('onMouseMove', fakeSVGEvent);

      expect(chart).toContainReactComponent(StackedBarGroup, {
        activeBarGroup: 0,
      });
    });
  });

  describe('gridOptions.showHorizontalLines', () => {
    it('does not render HorizontalGridLines when false', () => {
      const updatedProps = {
        ...mockProps,
        gridOptions: {...mockProps.gridOptions, showHorizontalLines: false},
      };
      const chart = mount(<Chart {...updatedProps} />);

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });
});
