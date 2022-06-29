import React from 'react';
import {mount} from '@shopify/react-testing';

import {LegendContainer} from '../../LegendContainer';
import {mockDefaultTheme} from '../../../test-utilities/mountWithProvider';
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
import {Chart, Props} from '../Chart';
import {Annotations} from '../../Annotations';

jest.mock('@shopify/polaris-viz-core/src/utilities/estimateStringWidth', () => {
  return {
    estimateStringWidth: () => 0,
  };
});

jest.mock('../../../utilities', () => {
  return {
    ...jest.requireActual('../../../utilities'),
    getPathLength: () => 0,
    getPointAtLength: jest.fn(() => ({x: 0, y: 0})),
    eventPointNative: () => {
      return {clientX: 100, clientY: 100, svgX: 100, svgY: 100};
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

  const mockProps: Props = {
    annotationsLookupTable: {},
    data: [
      {
        name: 'Asia',
        data: [
          {key: '1', value: 502},
          {key: '2', value: 1000},
        ],
        color: 'purple',
      },
      {
        name: 'Africa',
        data: [
          {key: '1', value: 106},
          {key: '2', value: 107},
        ],
        color: 'teal',
      },
    ],
    xAxisOptions: {
      hide: false,
      labelFormatter: (value) => `Day ${value}`,
    },
    yAxisOptions: {
      labelFormatter: (value) => `${value}`,
      integersOnly: false,
    },
    dimensions: {width: 500, height: 250},
    isAnimated: true,
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip Content</p>),
    showLegend: false,
    theme: 'Default',
  };

  it('renders an SVG', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent('svg');
  });

  it('renders a YAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis, {
      ticks: [
        {value: 0, formattedValue: '0', yOffset: 212},
        {value: 500, formattedValue: '500', yOffset: 116.2457091237579},
        {value: 1000, formattedValue: '1000', yOffset: 20.491418247515817},
      ],
    });
  });

  it('renders a StackedAreas', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(StackedAreas, {
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
      data: mockProps.data,
      xAxisLabels: mockProps.data[0].data.map(({key}) =>
        mockProps.xAxisOptions.labelFormatter(key),
      ),
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

  describe('annotationsLookupTable', () => {
    it('does not render <Annotations /> when false', () => {
      const chart = mount(<Chart {...mockProps} />);
      const group = chart.find('g');

      expect(chart).not.toContainReactComponent(Annotations);

      expect(group?.props.transform).toStrictEqual('translate(16,236)');
    });

    it('renders <LegendContainer /> when true', () => {
      const chart = mount(<Chart {...mockProps} showLegend />);
      const group = chart.find('g');

      expect(chart).not.toContainReactComponent(Annotations);

      expect(group?.props.transform).toStrictEqual('translate(16,191)');
    });
  });
});
