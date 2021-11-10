import React from 'react';
import {mount} from '@shopify/react-testing';

import {mockDefaultTheme} from '../../../test-utilities/mount-with-provider';
import {LinearXAxis} from '../../../components/LinearXAxis';
import {YAxis} from '../../../components/YAxis';
import {HorizontalGridLines} from '../../../components/HorizontalGridLines';
import {VisuallyHiddenRows} from '../../../components/VisuallyHiddenRows';
import {Point} from '../../../components/Point';
import {Crosshair} from '../../../components/Crosshair';
import {
  TooltipWrapper,
  TooltipAnimatedContainer,
} from '../../../components/TooltipWrapper';
import {mountWithProvider, triggerSVGMouseMove} from '../../../test-utilities';
import {StackedAreas} from '../components';
import {Chart} from '../Chart';

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: jest.fn(() => ({x: 0, y: 0})),
    eventPointNative: () => {
      return {clientX: 0, clientY: 0, svgX: 0, svgY: 0};
    },
  };
});

describe('<Chart />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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
        color: 'purple',
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
        color: 'teal',
      },
    ],
    xAxisOptions: {labels: ['Day 1', 'Day 2']},
    dimensions: {width: 500, height: 250},
    isAnimated: true,
    formatXAxisLabel: (val: string) => val,
    formatYAxisLabel: (val: number) => val.toString(),
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip Content</p>),
    colors: ['purple', 'teal'],
  };

  it('renders an SVG', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent('svg');
  });

  it('renders a LinearAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(LinearXAxis, {
      labels: ['Day 1', 'Day 2'],
      drawableHeight: 218,
      xAxisDetails: {
        maxXLabelHeight: 0,
        maxDiagonalLabelLength: 3,
        needsDiagonalLabels: false,
        ticks: [0, 1, 2, 3, 4, 5, 6],
        horizontalLabelWidth: 45.82857142857142,
      },
      fontSize: 12,
      drawableWidth: 480,
    });
  });

  it('does not render LinearAxis labels if the axis is hidden', () => {
    const chart = mountWithProvider(
      <Chart {...mockProps} />,
      mockDefaultTheme({xAxis: {hide: true}}),
    );
    expect(chart).not.toContainReactComponent(LinearXAxis);
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
        {value: 0, formattedValue: '0', yOffset: 218},
        {value: 500, formattedValue: '500', yOffset: 119.53568202348691},
        {value: 1000, formattedValue: '1000', yOffset: 21.071364046973812},
      ],
    });
  });

  it('renders a StackedAreas', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(StackedAreas, {
      width: 480,
      height: 218,
      transform: 'translate(16,8)',
      colors: ['purple', 'teal'],
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

    expect(chart).not.toContainReactComponent(Point, {visuallyHidden: false});
  });

  it('sets an active point and tooltip position on svg mouse or touch interaction', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(Point, {
      active: true,
      // ariaLabelledby points will always be rendered
      // even without active points, so lets ignore them
      ariaLabelledby: undefined,
    });
  });

  it('does not render a <Crosshair /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).not.toContainReactComponent(Crosshair);
  });

  it('renders a <Crosshair /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(Crosshair);
  });

  it('does not render a <TooltipAnimatedContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders a <TooltipAnimatedContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    expect(chart).toContainReactComponent(TooltipAnimatedContainer);
  });

  it('renders tooltip content inside a <TooltipWrapper /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    triggerSVGMouseMove(chart);

    const tooltipWrapper = chart.find(TooltipWrapper)!;
    expect(tooltipWrapper).toContainReactText('Mock Tooltip Content');
  });

  it('renders <VisuallyHiddenRows />', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent(VisuallyHiddenRows, {
      series: mockProps.series,
      xAxisLabels: mockProps.xAxisOptions.labels,
      formatYAxisLabel: mockProps.formatYAxisLabel,
    });
  });

  it('renders <HorizontalGridLines />', () => {
    const updatedProps = {
      ...mockProps,
      gridOtions: {horizontalOverflow: true},
    };
    const chart = mount(<Chart {...updatedProps} />);

    expect(chart).toContainReactComponent(HorizontalGridLines);
  });

  it("doesn't render <HorizontalGridLines /> when theme disables them", () => {
    const chart = mountWithProvider(
      <Chart {...mockProps} />,
      mockDefaultTheme({grid: {showHorizontalLines: false}}),
    );

    expect(chart).not.toContainReactComponent(HorizontalGridLines);
  });
});
