import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer, BarChartXAxis} from 'components';

import {Chart} from '../Chart';
import {Bar} from '../components';

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
    histogram: false,
    color: 'colorPurple' as Color,
    highlightColor: 'colorPurple' as Color,
    formatXAxisLabel: (value: string) => value.toString(),
    formatYAxisLabel: (value: number) => value.toString(),
    barMargin: 0,
    timeSeries: false,
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
});
