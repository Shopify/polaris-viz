import React from 'react';
import {mount} from '@shopify/react-testing';
import {
  Crosshair,
  LinearXAxis,
  TooltipContainer,
  VisuallyHiddenRows,
  Point,
} from 'components';

import {Chart} from '../Chart';
import {Series} from '../types';
import {Line, GradientArea} from '../components';
import {YAxis} from '../../YAxis';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

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
  showArea: false,
  data: [
    {label: 'Jan 1', rawValue: 1500},
    {label: 'Jan 2', rawValue: 1000},
    {label: 'Jan 3', rawValue: 800},
    {label: 'Jan 4', rawValue: 1300},
  ],
};

const mockProps = {
  series: [primarySeries],
  xAxisLabels: ['Jan 1'],
  dimensions: new DOMRect(),
  formatXAxisLabel: jest.fn((value) => value),
  formatYAxisLabel: jest.fn((value) => value),
  renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  hideXAxisLabels: false,
  hasSpline: false,
};

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
          formatXAxisLabel={(value) => `Formatted: ${value}`}
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

  it('renders a <Crosshair /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    // No crosshair if there is no active point
    expect(chart).not.toContainReactComponent(Crosshair);

    // create an active point
    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(Crosshair);
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

  it('renders a <Point /> for each data item in each series', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        series={[primarySeries, {...primarySeries, name: 'A second series'}]}
      />,
    );

    expect(chart).toContainReactComponentTimes(Point, 8);
  });

  it('passes props to <Point />', () => {
    const chart = mount(
      <Chart
        {...mockProps}
        series={[primarySeries, {...primarySeries, name: 'A second series'}]}
      />,
    );

    expect(chart).toContainReactComponent(Point, {
      color: 'primary',
      cx: 0,
      cy: 0,
      active: false,
      index: 0,
      tabIndex: -1,
    });
  });

  it('renders a <GradientArea /> for a series when showArea is true', () => {
    const chart = mount(
      <Chart {...mockProps} series={[{...primarySeries, showArea: true}]} />,
    );

    expect(chart).toContainReactComponentTimes(GradientArea, 1);
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
      xAxisLabels: mockProps.xAxisLabels,
      formatYAxisLabel: mockProps.formatYAxisLabel,
    });
  });
});
