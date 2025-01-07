import {mount} from '@shopify/react-testing';
import {ChartContext} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';
import React from 'react';

import {Chart} from '../Chart';
import {FunnelChartConnector, FunnelChartSegment} from '../../shared';

const mockData: DataSeries[] = [
  {
    name: 'Group 1',
    data: [
      {key: 'Step 1', value: 100},
      {key: 'Step 2', value: 75},
      {key: 'Step 3', value: 50},
    ],
  },
];

const mockContext = {
  containerBounds: {
    width: 500,
    height: 300,
    x: 0,
    y: 0,
  },
};

const defaultProps = {
  data: mockData,
  accessibilityLabel: 'Funnel chart showing conversion',
};

describe('<Chart />', () => {
  it('renders funnel segments for each data point', () => {
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactComponentTimes(
      FunnelChartSegment,
      mockData[0].data.length,
    );
  });

  it('renders n-1 connectors for n funnel segments, excluding the last segment', () => {
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactComponentTimes(
      FunnelChartConnector,
      mockData[0].data.length - 1,
    );
  });

  it('renders accessibility label when provided', () => {
    const accessibilityLabel = 'Custom accessibility label';
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} accessibilityLabel={accessibilityLabel} />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactText(accessibilityLabel);
  });

  it('renders segments with expected aria labels', () => {
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} />
      </ChartContext.Provider>,
    );

    const firstSegment = chart.findAll(FunnelChartSegment)[0];
    expect(firstSegment).toHaveReactProps({
      ariaLabel: 'Step 1: 100',
    });
  });
});
