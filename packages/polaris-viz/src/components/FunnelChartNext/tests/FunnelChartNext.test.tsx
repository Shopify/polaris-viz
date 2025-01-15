import React from 'react';
import {mount} from '@shopify/react-testing';
import {ChartState, DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {FunnelChartNext} from '../FunnelChartNext';
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

const mockTooltipLabels = {
  reached: 'Reached',
  dropped: 'Dropped',
};

describe('<FunnelChartNext />', () => {
  describe('rendering states', () => {
    it('renders a Chart when state is Success', () => {
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
          state={ChartState.Success}
        />,
      );

      expect(funnel).toContainReactComponent(Chart);
    });

    it('renders a ChartSkeleton when state is Loading', () => {
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
          state={ChartState.Loading}
        />,
      );

      expect(funnel).toContainReactComponent(ChartSkeleton, {
        type: 'Funnel',
        state: ChartState.Loading,
      });
    });

    it('renders a ChartSkeleton with error text when state is Error', () => {
      const errorText = 'Something went wrong';
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
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
    it('passes theme to Chart component', () => {
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
          theme={DEFAULT_THEME_NAME}
          state={ChartState.Success}
        />,
      );

      expect(funnel).toContainReactComponent(Chart);
    });

    it('passes seriesNameFormatter to Chart', () => {
      const seriesNameFormatter = (value) => `$${value}`;
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
          seriesNameFormatter={seriesNameFormatter}
          state={ChartState.Success}
        />,
      );

      expect(funnel).toContainReactComponent(Chart, {
        seriesNameFormatter,
      });
    });

    it('passes yAxisOptions to Chart', () => {
      const labelFormatter = (value: number) => `$${value}`;
      const funnel = mount(
        <FunnelChartNext
          data={mockData}
          tooltipLabels={mockTooltipLabels}
          labelFormatter={labelFormatter}
          state={ChartState.Success}
        />,
      );

      expect(funnel).toContainReactComponent(Chart, {
        labelFormatter,
      });
    });

    describe('showTooltip', () => {
      it('passes showTooltip prop to Chart', () => {
        const funnel = mount(
          <FunnelChartNext
            data={mockData}
            tooltipLabels={mockTooltipLabels}
            showTooltip={false}
            state={ChartState.Success}
          />,
        );

        expect(funnel).toContainReactComponent(Chart, {
          showTooltip: false,
        });
      });

      it('defaults showTooltip to true when not provided', () => {
        const funnel = mount(
          <FunnelChartNext
            data={mockData}
            tooltipLabels={mockTooltipLabels}
            state={ChartState.Success}
          />,
        );

        expect(funnel).toContainReactComponent(Chart, {
          showTooltip: true,
        });
      });
    });
  });
});
