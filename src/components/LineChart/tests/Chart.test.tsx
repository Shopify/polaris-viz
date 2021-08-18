import React from 'react';
import {mount} from '@shopify/react-testing';
import {Crosshair, LinearXAxis, VisuallyHiddenRows, Point} from 'components';
import {line} from 'd3-shape';
import {mountWithProvider, triggerSVGMouseMove} from 'test-utilities';
import {HorizontalGridLines} from 'components/HorizontalGridLines';
import {mockDefaultTheme} from 'test-utilities/mount-with-provider';
import {TooltipAnimatedContainer} from 'components/TooltipWrapper';

import {LinearGradient} from '../../LinearGradient';
import {Chart} from '../Chart';
import type {Series} from '../types';
import {Line, GradientArea} from '../components';
import {YAxis} from '../../YAxis';

const primarySeries: Required<Series> = {
  name: 'Primary',
  color: 'red',
  lineStyle: 'solid',
  areaColor: 'red',
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
  hide: false,
};

const yAxisOptions = {
  labelFormatter: jest.fn((value) => value),
  labelColor: 'red',
  backgroundColor: 'transparent',
  integersOnly: false,
};

const mockProps = {
  series: [primarySeries],
  dimensions: {width: 500, height: 250},
  xAxisOptions,
  yAxisOptions,
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  isAnimated: false,
};

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: () => ({x: 0, y: 0}),
    uniqueId: (prefix: string) => `${prefix}-1`,
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 0, svgY: 0};
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

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(Point, {active: true});
  });

  describe('<LinearAxis />', () => {
    it('renders a <LinearXAxis />', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(LinearXAxis, {
        labels: ['Jan 1'],
      });
    });

    it('does not render a <LinearXAxis /> if it is hidden', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          xAxisOptions={{...mockProps.xAxisOptions, hide: true}}
        />,
      );

      expect(chart).not.toContainReactComponent(LinearXAxis);
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

    triggerSVGMouseMove(chart);

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
      color: 'rgb(255, 0, 0)',
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
    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);

    triggerSVGMouseMove(chart);

    const tooltipContainer = chart.find(TooltipAnimatedContainer)!;

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
      const chart = mount(<Chart {...mockProps} series={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
    });

    it('does not render crosshair for empty state', () => {
      const chart = mount(<Chart {...mockProps} series={[]} />);

      expect(chart).not.toContainReactComponent(Crosshair);
    });

    it('does not render Visually Hidden Rows for empty state', () => {
      const chart = mount(<Chart {...mockProps} series={[]} />);

      expect(chart).not.toContainReactComponent(VisuallyHiddenRows);
    });
  });

  describe('series.color', () => {
    describe('is a CSS color color', () => {
      it('removes transparency for <Point />', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            series={[
              {
                ...primarySeries,
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
            {...mockProps}
            series={[
              {
                ...primarySeries,
                color: 'rgb(255, 255, 255)',
              },
            ]}
          />,
        );

        expect(chart.find(Line)).toHaveReactProps({
          color: 'rgb(255, 255, 255)',
        });
      });
    });

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

      it('passes point gradient url as color prop to <Point />', () => {
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
          color: 'url(#lineChartGradient-1-point-0)',
        });
      });

      it('removes transparency from the gradient', () => {
        const chart = mount(
          <Chart
            {...mockProps}
            series={[
              {
                ...primarySeries,
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

        expect(chart).toContainReactComponent(LinearGradient, {
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
      const chart = mountWithProvider(
        <Chart {...mockProps} />,
        mockDefaultTheme({grid: {showHorizontalLines: false}}),
      );

      expect(chart).not.toContainReactComponent(HorizontalGridLines);
    });

    it('renders HorizontalGridLines when true', () => {
      const chart = mountWithProvider(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(HorizontalGridLines);
    });
  });
});
