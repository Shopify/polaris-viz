import React from 'react';
import {mount} from '@shopify/react-testing';
import {ChartState} from '@shopify/polaris-viz-core';

import {SparkFunnelChart} from '../SparkFunnelChart';
import {Chart} from '../Chart';
import {ChartSkeleton} from '../../ChartSkeleton';

const mockData = [
  {
    name: 'Funnel',
    data: [
      {key: 'Step 1', value: 1000},
      {key: 'Step 2', value: 750},
      {key: 'Step 3', value: 500},
      {key: 'Step 4', value: 250},
    ],
  },
];

describe('<SparkFunnelChart />', () => {
  describe('rendering states', () => {
    it('renders a Chart when state is Success', () => {
      const funnel = mount(
        <SparkFunnelChart data={mockData} state={ChartState.Success} />,
      );

      expect(funnel).toContainReactComponent(Chart);
    });

    it('renders a ChartSkeleton when state is Loading', () => {
      const funnel = mount(
        <SparkFunnelChart data={mockData} state={ChartState.Loading} />,
      );

      expect(funnel).toContainReactComponent(ChartSkeleton, {
        type: 'Funnel',
        state: ChartState.Loading,
      });
    });

    it('renders a ChartSkeleton with error text when state is Error', () => {
      const errorText = 'Something went wrong';
      const funnel = mount(
        <SparkFunnelChart
          data={mockData}
          state={ChartState.Error}
          errorText={errorText}
        />,
      );

      expect(funnel).toContainReactComponent(ChartSkeleton, {
        type: 'Funnel',
        errorText,
        state: ChartState.Error,
      });
    });
  });

  describe('chart configuration', () => {
    it('passes data to Chart', () => {
      const funnel = mount(
        <SparkFunnelChart data={mockData} state={ChartState.Success} />,
      );

      expect(funnel).toContainReactComponent(Chart, {
        data: mockData,
      });
    });

    it('passes accessibility label to Chart', () => {
      const accessibilityLabel = 'Funnel chart showing conversion';
      const funnel = mount(
        <SparkFunnelChart
          data={mockData}
          accessibilityLabel={accessibilityLabel}
          state={ChartState.Success}
        />,
      );

      expect(funnel).toContainReactComponent(Chart, {
        accessibilityLabel,
      });
    });
  });
});
