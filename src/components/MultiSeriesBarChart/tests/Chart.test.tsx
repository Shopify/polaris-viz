import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer, Tooltip} from 'components';

import {Chart} from '../Chart';
import {XAxis, BarGroup, StackedBarGroup} from '../components';

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

  const mockProps = {
    series: [
      {data: [10, 20, 30], color: 'colorBlack' as Color, label: 'LABEL1'},
      {data: [10, 20, 30], color: 'colorRed' as Color, label: 'LABEL2'},
    ],
    isStacked: false,
    labels: ['stuff 1', 'stuff 2', 'stuff 3'],
    chartDimensions: new DOMRect(),
    formatXAxisLabel: jest.fn((value: string) => value),
    formatYAxisLabel: (value: number) => value.toString(),
    timeSeries: false,
  };

  it('renders an SVG element', () => {
    const multiSeriesBarChart = mount(<Chart {...mockProps} />);

    expect(multiSeriesBarChart).toContainReactComponent('svg');
  });

  it('renders an xAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(XAxis);
  });

  it('renders an yAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis);
  });

  it('formats the x axis labels', () => {
    mount(<Chart {...mockProps} />);
    expect(mockProps.formatXAxisLabel).toHaveBeenCalledTimes(3);
  });

  it('does not render a <Tooltip /> or <TooltipContainer /> if there is no active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).not.toContainReactComponent(TooltipContainer);
    expect(chart).not.toContainReactComponent(Tooltip);
  });

  it('renders a <Tooltip /> and <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(TooltipContainer);
    expect(chart).toContainReactComponent(Tooltip);
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
              data: [10, 20, 30],
              color: 'colorBlack' as Color,
              highlightColor: 'primary' as Color,
              label: 'LABEL1',
            },
            {
              data: [10, 20, 30],
              color: 'colorRed' as Color,
              highlightColor: 'secondary' as Color,
              label: 'LABEL2',
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
              data: [10, 20, 30],
              color: 'colorBlack' as Color,
              highlightColor: 'primary' as Color,
              label: 'LABEL1',
            },
            {
              data: [10, 20, 30],
              color: 'colorRed' as Color,
              highlightColor: 'secondary' as Color,
              label: 'LABEL2',
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
