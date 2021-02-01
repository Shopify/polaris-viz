import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {LinearXAxis} from 'components/LinearXAxis';
import {YAxis} from 'components/YAxis';
import {Point, Crosshair, TooltipContainer} from 'components';

import {StackedAreas} from '../components';
import {Chart} from '../Chart';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

describe('<Chart />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
      }),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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

  const mockProps = {
    series: [
      {
        name: 'Asia',
        data: [
          {label: '1', rawValue: 502},
          {label: '2', rawValue: 1000},
          {label: '3', rawValue: 2000},
          {label: '4', rawValue: 1000},
          {label: '5', rawValue: 100},
          {label: '6', rawValue: 1000},
          {label: '7', rawValue: 5000},
        ],
        color: 'colorPurple' as Color,
      },
      {
        name: 'Africa',
        data: [
          {label: '1', rawValue: 106},
          {label: '2', rawValue: 107},
          {label: '3', rawValue: 111},
          {label: '4', rawValue: 133},
          {label: '5', rawValue: 100},
          {label: '6', rawValue: 767},
          {label: '7', rawValue: 1766},
        ],
        color: 'colorTeal' as Color,
      },
    ],
    xAxisLabels: ['Day 1', 'Day 2'],
    dimensions: new DOMRect(),
    opacity: 1,
    isAnimated: true,
    formatXAxisLabel: (val: string) => val,
    formatYAxisLabel: (val: number) => val.toString(),
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip Content</p>),
  };

  it('renders an SVG', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent('svg');
  });

  it('renders a LinearAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(LinearXAxis, {
      labels: ['Day 1', 'Day 2'],
      drawableHeight: 230,
      xAxisDetails: {
        maxXLabelHeight: 0,
        maxDiagonalLabelLength: 0,
        needsDiagonalLabels: false,
        ticks: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        horizontalLabelWidth: 26.523076923076925,
      },
      fontSize: 12,
      drawableWidth: 472,
    });
  });

  it('formats the x axis labels before passing them to the LinearAxis', () => {
    const formatXAxisLabelSpy = jest.fn((value) => `Formatted: ${value}`);
    const chart = mount(
      <Chart {...mockProps} formatXAxisLabel={formatXAxisLabelSpy} />,
    );

    expect(chart).toContainReactComponent(LinearXAxis, {
      labels: ['Formatted: Day 1', 'Formatted: Day 2'],
    });
  });

  it('renders a YAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis, {
      ticks: [
        {value: 0, formattedValue: '0', yOffset: 230},
        {value: 1000, formattedValue: '1000', yOffset: 115},
        {value: 2000, formattedValue: '2000', yOffset: 0},
      ],
      drawableWidth: 472,
    });
  });

  it('renders a StackedAreas', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(StackedAreas, {
      width: 472,
      height: 230,
      transform: 'translate(24,8)',
      colors: ['colorPurple', 'colorTeal'],
      opacity: 1,
      isAnimated: true,
      stackedValues: expect.any(Object),
    });
  });

  it('passes calculated values to StackedAreas', () => {
    const chart = mount(<Chart {...mockProps} />);
    const values = chart.find(StackedAreas)!.props.stackedValues;
    expect(values.toString()).toStrictEqual(
      [
        [
          [106, 608],
          [107, 1107],
        ],
        [
          [0, 106],
          [0, 107],
        ],
      ].toString(),
    );
  });

  it('does not have an active Point if there is not an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(Point, {active: true});
  });

  it('sets an active point and tooltip position on svg mouse or touch interaction', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;

    chart.act(() => {
      svg.trigger('onMouseMove', fakeSVGEvent);
    });

    expect(chart).toContainReactComponent(Point, {active: true});
  });

  it('does not render a <Crosshair /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).not.toContainReactComponent(Crosshair);
  });

  it('renders a <Crosshair /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(Crosshair);
  });

  it('does not render a <TooltipContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipContainer);
  });

  it('renders a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(TooltipContainer);
  });

  it('renders tooltip content inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;
    expect(tooltipContainer).toContainReactText('Mock Tooltip Content');
  });
});
