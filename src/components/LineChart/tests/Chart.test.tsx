import React from 'react';
import {mount} from '@shopify/react-testing';
import {
  Crosshair,
  LinearXAxis,
  TooltipContainer,
  VisuallyHiddenRows,
  Point,
  HorizontalGridLines,
} from 'components';
import {line} from 'd3-shape';

import {LinearGradient} from '../../LinearGradient';
import {Chart} from '../Chart';
import {Series} from '../types';
import {Line, GradientArea} from '../components';
import {YAxis} from '../../YAxis';

const fakeSVGEvent = {
  persist: jest.fn(),
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

const primarySeries: Required<Series> = {
  name: 'Primary',
  color: 'primary',
  lineStyle: 'solid',
  areaColor: 'primary',
  data: [
    {label: 'Jan 1', rawValue: 1500},
    {label: 'Jan 2', rawValue: 1000},
    {label: 'Jan 3', rawValue: 800},
    {label: 'Jan 4', rawValue: 1300},
  ],
};

const xAxisOptions = {
  xAxisLabels: ['Jan 1'],
  labelFormatter: jest.fn((value) => value),
  hideXAxisLabels: false,
  showTicks: true,
  labelColor: 'red',
  useMinimalLabels: false,
};

const lineOptions = {hasSpline: false, width: 2};

const yAxisOptions = {
  labelFormatter: jest.fn((value) => value),
  labelColor: 'red',
  backgroundColor: 'transparent',
};

const gridOptions = {
  showVerticalLines: true,
  showHorizontalLines: true,
  color: 'orange',
  horizontalOverflow: false,
  horizontalMargin: 0,
};

const crossHairOptions = {width: 10, color: 'red', opacity: 1};

const mockProps = {
  series: [primarySeries],
  dimensions: {width: 500, height: 250},
  lineOptions,
  xAxisOptions,
  yAxisOptions,
  gridOptions,
  crossHairOptions,
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  isAnimated: false,
};

const mockEmptyStateProps = {
  series: [],
  dimensions: {width: 100, height: 100},
  lineOptions,
  xAxisOptions,
  yAxisOptions,
  gridOptions,
  crossHairOptions,
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  isAnimated: false,
};
jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: () => ({x: 0, y: 0}),
    uniqueId: (prefix: string) => `${prefix}-1`,
  };
});

jest.mock('d3-shape', () => ({
  ...jest.requireActual('d3-shape'),
  line: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y = () => shape;
    return shape;
  }),
}));

describe('<Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders an svg element', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent('svg');
  });

  it('sets an active point and tooltip position on svg mouse or touch interaction', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;

    chart.act(() => {
      svg.trigger('onMouseMove', fakeSVGEvent);
    });

    expect(chart).toContainReactComponent(Point, {active: true});
  });

  describe('<LinearAxis />', () => {
    it('renders a <LinearXAxis />', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(LinearXAxis, {
        labels: ['Jan 1'],
      });
    });

    it('passes formatted labels to the <LinearXAxis>, formatting them with formatXAxisLabel', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          xAxisOptions={{
            ...mockProps.xAxisOptions,
            labelFormatter: (value) => `Formatted: ${value}`,
          }}
        />,
      );

      expect(chart).toContainReactComponent(LinearXAxis, {
        labels: ['Formatted: Jan 1'],
      });
    });
  });

  it('renders a <YAxis />', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent(YAxis);
  });

  it('renders a <Crosshair /> at full opacity if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    // create an active point
    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart.find(Crosshair)).toHaveReactProps({opacity: 1});
  });

  it('renders a <Crosshair /> at 0 opacity if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart.find(Crosshair)).toHaveReactProps({opacity: 0});
  });

  it('renders a <Line /> for each series', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        series={[primarySeries, {...primarySeries, name: 'A second series'}]}
      />,
    );

    expect(chart).toContainReactComponentTimes(Line, 2);
  });

  it('calls the d3 curve method when hasSpline is true', () => {
    const curveSpy = jest.fn();
    (line as jest.Mock).mockImplementationOnce(() => {
      const shape = (value: any) => value;
      shape.x = () => shape;
      shape.y = () => shape;
      shape.curve = curveSpy;
      return shape;
    });

    mount(
      <Chart
        {...mockProps}
        lineOptions={{hasSpline: true, width: 2}}
        series={[primarySeries, {...primarySeries, name: 'A second series'}]}
      />,
    );

    expect(curveSpy).toHaveBeenCalled();
  });

  it('renders a <Point /> for each data item in each series', () => {
    const series = [primarySeries, {...primarySeries, name: 'A second series'}];
    const chart = mount(<Chart {...mockProps} series={series} />);

    expect(chart).toContainReactComponentTimes(Point, 8);
  });

  it('renders an additional <Point /> for each series if isAnimated is true', () => {
    const series = [primarySeries, {...primarySeries, name: 'A second series'}];
    const chart = mount(<Chart {...mockProps} series={series} isAnimated />);

    expect(chart).toContainReactComponentTimes(Point, 8 + series.length);
  });

  it('passes props to <Point />', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        series={[primarySeries, {...primarySeries, name: 'A second series'}]}
      />,
    );

    expect(chart).toContainReactComponent(Point, {
      color: 'rgb(0,161,159)',
      cx: 0,
      cy: 0,
      active: false,
      index: 0,
      tabIndex: -1,
    });
  });

  it('renders tooltip content inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    // No tooltip if there is no active point
    expect(chart).not.toContainReactText('Mock Tooltip');
    expect(chart).not.toContainReactComponent(TooltipContainer);

    // create an active point
    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactText('Mock Tooltip');
  });

  it('renders <VisuallyHiddenRows />', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent(VisuallyHiddenRows, {
      series: mockProps.series,
      xAxisLabels: mockProps.xAxisOptions.xAxisLabels,
      formatYAxisLabel: mockProps.yAxisOptions.labelFormatter,
    });
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockEmptyStateProps} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipContainer);
    });

    it('does not render crosshair for empty state', () => {
      const chart = mount(<Chart {...mockEmptyStateProps} />);

      expect(chart).not.toContainReactComponent(Crosshair);
    });

    it('does not render Visually Hidden Rows for empty state', () => {
      const chart = mount(<Chart {...mockEmptyStateProps} />);

      expect(chart).not.toContainReactComponent(VisuallyHiddenRows);
    });
  });

  describe('series.color', () => {
    describe('is of type GradientStop[]', () => {
      it('renders a LinearGradient if series color is a gradient', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            series={[
              {
                ...primarySeries,
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

        expect(chart).toContainReactComponent(LinearGradient);
      });

      it('passes gradient url as color prop to <Line />', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            series={[
              {
                ...primarySeries,
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

        expect(chart.find(Line)).toHaveReactProps({
          color: 'url(#lineChartGradient-1-0)',
        });
      });

      it('passes gradient url as color prop to <Point />', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            series={[
              {
                ...primarySeries,
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

        expect(chart.find(Point)).toHaveReactProps({
          color: 'url(#lineChartGradient-1-0)',
        });
      });
    });
  });

  describe('areaColor', () => {
    it('renders a <GradientArea /> for a series if areaColor is specified', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          series={[{...primarySeries, areaColor: 'red'}]}
        />,
      );

      expect(chart).toContainReactComponentTimes(GradientArea, 1);
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
