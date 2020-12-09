import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {LinearXAxis} from 'components/LinearXAxis';
import {YAxis} from 'components/YAxis';
import {Point, Crosshair, TooltipContainer, Tooltip} from 'components';

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
    xAxisLabels: ['Day 1', 'Day 2'],
    formatXAxisLabel: (val: string) => val,
    formatYAxisLabel: (val: number) => val.toString(),
    dimensions: new DOMRect(),
    opacity: 1,
    isAnimated: true,
    totalMesage: 'Total',
    series: [
      {
        label: 'Asia',
        data: [502, 1000, 2000, 1000, 100, 1000, 5000],
        color: 'colorPurple' as Color,
      },
      {
        label: 'Africa',
        data: [106, 107, 111, 133, 100, 767, 1766],
        color: 'colorTeal' as Color,
      },
    ],
  };

  it('renders an SVG', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent('svg');
  });

  it('renders a LinearAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(LinearXAxis, {
      labels: ['Day 1', 'Day 2'],
      dimensions: new DOMRect(),
      drawableHeight: 212,
      axisMargin: 24,
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
    expect(formatXAxisLabelSpy).toHaveBeenCalledTimes(2);
  });

  it('renders a YAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis, {
      ticks: [
        {value: 0, formattedValue: '0', yOffset: 212},
        {value: 1000, formattedValue: '1000', yOffset: 106},
        {value: 2000, formattedValue: '2000', yOffset: 0},
      ],
      drawableWidth: 472,
    });
  });

  it('renders a StackedAreas', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(StackedAreas, {
      width: 472,
      height: 212,
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

  it('renders a <Tooltip /> inside a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactComponent(Tooltip);
  });
});
