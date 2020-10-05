import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {YAxis, TooltipContainer} from 'components';

import {Chart} from '../Chart';
import {XAxis, Tooltip, BarGroup} from '../components';

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
    jest.useRealTimers();
  });

  const mockProps = {
    series: [
      {data: [10, 20, 30], color: 'colorBlack' as Color, label: 'LABEL1'},
      {data: [10, 20, 30], color: 'colorRed' as Color, label: 'LABEL2'},
    ],
    stacked: false,
    labels: ['stuff 1', 'stuff 2', 'stuff 3'],
    chartDimensions: new DOMRect(),
    formatYValue: (value: number) => value.toString(),
    timeSeries: false,
  };

  it('renders an SVG element', () => {
    const groupedBarChart = mount(<Chart {...mockProps} />);

    expect(groupedBarChart).toContainReactComponent('svg');
  });

  it('renders an xAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(XAxis);
  });

  it('renders an yAxis', () => {
    const chart = mount(<Chart {...mockProps} />);
    expect(chart).toContainReactComponent(YAxis);
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

  it('renders a BarGroup for each data item', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponentTimes(BarGroup, 3);
  });

  it('passes active props to the BarGroup that is being hovered on', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(BarGroup, {
      isActive: true,
    });
  });

  it('passes hasActiveGroup to BarGroups that are not active', () => {
    const chart = mount(<Chart {...mockProps} />);

    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(BarGroup, {
      isActive: false,
      hasActiveGroup: true,
    });
  });
});
