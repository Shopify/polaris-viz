import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer, BarChartXAxis, Bar} from 'components';

import {Chart} from '../Chart';

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
  const mockProps = {
    data: [
      {rawValue: 10, label: 'data'},
      {rawValue: 20, label: 'data 2'},
    ],
    chartDimensions: new DOMRect(),
    barOptions: {
      color: 'colorPurple' as Color,
      highlightColor: 'colorPurple' as Color,
      margin: 0,
      hasRoundedCorners: false,
    },
    xAxisOptions: {
      labelFormatter: (value: string) => value.toString(),
      showTicks: true,
      labelColor: 'red',
    },
    yAxisOptions: {
      labelFormatter: (value: number) => value.toString(),
      labelColor: 'red',
    },
    gridOptions: {showHorizontalLines: true, color: 'red'},
    renderTooltipContent: jest.fn(() => <p>Mock Tooltip</p>),
  };

  it('renders an SVG element', () => {
    const barChart = mount(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent('svg');
  });

  it('renders an xAxis', () => {
    const barChart = mount(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent(BarChartXAxis);
  });

  it('renders an yAxis', () => {
    const barChart = mount(<Chart {...mockProps} />);
    expect(barChart).toContainReactComponent(YAxis);
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

  it('renders the tooltip content in a <TooltipContainer /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);
    const svg = chart.find('svg')!;

    svg.trigger('onMouseMove', fakeSVGEvent);

    const tooltipContainer = chart.find(TooltipContainer)!;

    expect(tooltipContainer).toContainReactComponent('p', {
      children: 'Mock Tooltip',
    });
  });

  it('renders a Bar for each data item', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponentTimes(Bar, 2);
  });

  it('passes an active prop to the Bar that is being hovered on or nearby', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(Bar, {isSelected: true});
  });

  describe('empty state', () => {
    it('does not render tooltip for empty state', () => {
      const chart = mount(<Chart {...mockProps} data={[]} />);

      expect(chart).not.toContainReactText('Mock Tooltip');
      expect(chart).not.toContainReactComponent(TooltipContainer);
    });
  });
});
