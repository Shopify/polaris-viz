import React from 'react';
import {mount} from '@shopify/react-testing';

import {Chart} from '../Chart';
import {Series} from '../types';
import {Crosshair, Line, Tooltip, XAxis, YAxis} from '../components';

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

const primarySeries: Series = {
  name: 'Primary',
  data: [
    {x: 'Jan 1', y: 1500},
    {x: 'Jan 2', y: 1000},
    {x: 'Jan 3', y: 800},
    {x: 'Jan 4', y: 1300},
  ],
};

const mockProps = {
  series: [primarySeries],
  xAxisLabels: ['Jan 1'],
  dimensions: new DOMRect(),
  formatYAxisValue: jest.fn(),
};

describe('<Chart />', () => {
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

    expect(chart).toContainReactComponent(Line, {activePointIndex: 0});
  });

  it('renders an <XAxis />', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent(XAxis, {
      labels: ['Jan 1'],
    });
  });

  it('creates an x scale with a domain corresponding to the longest series', () => {
    const longSeries: Series = {
      name: 'Long series',
      data: [
        {x: '1', y: 1},
        {x: '2', y: 2},
        {x: '3', y: 3},
        {x: '4', y: 4},
        {x: '5', y: 5},
        {x: '6', y: 6},
        {x: '7', y: 7},
        {x: '8', y: 8},
        {x: '9', y: 9},
        {x: '10', y: 10},
      ],
    };
    const lineChart = mount(
      <Chart {...mockProps} series={[primarySeries, longSeries]} />,
    );

    expect(
      lineChart
        .find(XAxis)!
        .prop('xScale')
        .domain(),
    ).toStrictEqual([0, 9]);
  });

  it('creates an x scale with range from 0 to the width of the chart, minus margins', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(
      chart
        .find(XAxis)!
        .prop('xScale')
        .range(),
    ).toStrictEqual([0, 420]);
  });

  it('renders a <YAxis />', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(chart).toContainReactComponent(YAxis);
  });

  it('creates a y scale with a domain corresponding to the minimum and maximum values in the data set, plus some padding', () => {
    const deeplyNegative: Series = {
      name: 'Deeply negative',
      data: [{x: '1', y: -10000}],
    };
    const highlyPositive: Series = {
      name: 'Highly positive',
      data: [{x: '1', y: 10000}],
    };
    const lineChart = mount(
      <Chart {...mockProps} series={[deeplyNegative, highlyPositive]} />,
    );

    // We expect the Y_SCALE_PADDING to be 1.2, so the max will be 12,000
    expect(
      lineChart
        .find(YAxis)!
        .prop('yScale')
        .domain(),
    ).toStrictEqual([-10000, 12000]);
  });

  it('creates a y scale with range from the height of the chart, minus margins to 0', () => {
    const chart = mount(<Chart {...mockProps} />);

    expect(
      chart
        .find(YAxis)!
        .prop('yScale')
        .range(),
    ).toStrictEqual([205, 0]);
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

  it('renders a <Tooltip /> if there is an active point', () => {
    const chart = mount(<Chart {...mockProps} />);

    // No tooltip if there is no active point
    expect(chart).not.toContainReactComponent(Tooltip);

    // create an active point
    const svg = chart.find('svg')!;
    svg.trigger('onMouseMove', fakeSVGEvent);

    expect(chart).toContainReactComponent(Tooltip);
  });
});
