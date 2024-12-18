import {mount} from '@shopify/react-testing';
import {ChartContext} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';
import React from 'react';

import {Chart} from '../Chart';
import {FunnelChartConnector, FunnelChartSegment} from '../../shared';
import {SingleTextLine} from '../../Labels';

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
  seriesNameFormatter: (value: string) => `$${value}`,
  labelFormatter: (value: string) => `$${value}`,
};

describe('<Chart />', () => {
  it('renders funnel segments for each data point', () => {
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactComponentTimes(FunnelChartSegment, 3);
  });

  it('renders n-1 connectors for n funnel segments, excluding the last segment', () => {
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart {...defaultProps} />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactComponentTimes(FunnelChartConnector, 2);
  });

  it('formats labels using the provided formatters', () => {
    const customFormatter = (value: string) => `Custom ${value}`;
    const chart = mount(
      <ChartContext.Provider value={mockContext}>
        <Chart
          {...defaultProps}
          seriesNameFormatter={customFormatter}
          labelFormatter={customFormatter}
        />
      </ChartContext.Provider>,
    );

    expect(chart).toContainReactComponent(SingleTextLine, {
      text: 'Custom Step 1',
    });
  });
});
