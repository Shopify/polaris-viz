import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer, BarChartXAxis} from 'components';

import {Chart} from '../Chart';
import {BarGroup, StackedBarGroup} from '../components';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

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
    jest.resetAllMocks();
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
    isStacked: false,
    labels: ['stuff 1', 'stuff 2', 'stuff 3'],
    chartDimensions: new DOMRect(),
    formatXAxisLabel: jest.fn((value: string) => value),
    formatYAxisLabel: (value: number) => value.toString(),
    timeSeries: false,
    renderTooltipContent,
    hasRoundedCorners: false,
    isAnimated: false,
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
    expect(mockProps.formatXAxisLabel).toHaveBeenCalledTimes(3);
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

  describe('<BarGroup />', () => {
    it('renders a BarGroup for each data item', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponentTimes(BarGroup, 3);
    });

    it('passes active props to the BarGroup that is being hovered', () => {
      const chart = mount(<Chart {...mockProps} />);

      const svg = chart.find('svg')!;
      svg.trigger('onMouseMove', fakeSVGEvent);

      expect(chart).toContainReactComponent(BarGroup, {
        isActive: true,
      });
    });

    it('passes highlightColors with default colors to barGroup when no highlightColors are provided', () => {
      const chart = mount(<Chart {...mockProps} />);

      expect(chart).toContainReactComponent(BarGroup, {
        highlightColors: ['colorBlack', 'colorRed'],
      });
    });

    it('passes highlightColors barGroup', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          series={[
            {
              data: [
                {label: 'stuff 1', rawValue: 10},
                {label: 'stuff 2', rawValue: 20},
                {label: 'stuff 3', rawValue: 30},
              ],
              color: 'colorBlack' as Color,
              highlightColor: 'primary' as Color,
              name: 'LABEL1',
            },
            {
              data: [
                {label: 'stuff 1', rawValue: 10},
                {label: 'stuff 2', rawValue: 20},
                {label: 'stuff 3', rawValue: 30},
              ],
              color: 'colorRed' as Color,
              highlightColor: 'secondary' as Color,
              name: 'LABEL2',
            },
          ]}
        />,
      );

      expect(chart).toContainReactComponent(BarGroup, {
        highlightColors: ['primary', 'secondary'],
      });
    });

    it('does not render BarGroup if isStacked is true', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).not.toContainReactComponent(BarGroup);
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

    it('passes highlightColors StackedBarGroup', () => {
      const chart = mount(
        <Chart
          {...mockProps}
          series={[
            {
              data: [
                {label: 'stuff 1', rawValue: 10},
                {label: 'stuff 2', rawValue: 20},
                {label: 'stuff 3', rawValue: 30},
              ],
              color: 'colorBlack' as Color,
              highlightColor: 'primary' as Color,
              name: 'LABEL1',
            },
            {
              data: [
                {label: 'stuff 1', rawValue: 10},
                {label: 'stuff 2', rawValue: 20},
                {label: 'stuff 3', rawValue: 30},
              ],
              color: 'colorRed' as Color,
              highlightColor: 'secondary' as Color,
              name: 'LABEL2',
            },
          ]}
          isStacked
        />,
      );

      expect(chart).toContainReactComponent(StackedBarGroup, {
        highlightColors: ['primary', 'secondary'],
      });
    });

    it('passes highlightColors with default colors to StackedBarGroup when no highlightColors are provided', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      expect(chart).toContainReactComponent(StackedBarGroup, {
        highlightColors: ['colorBlack', 'colorRed'],
      });
    });

    it('passes active props to the BarGroup that is being hovered', () => {
      const chart = mount(<Chart {...mockProps} isStacked />);

      const svg = chart.find('svg')!;
      svg.trigger('onMouseMove', fakeSVGEvent);

      expect(chart).toContainReactComponent(StackedBarGroup, {
        activeBarGroup: 0,
      });
    });
  });
});
