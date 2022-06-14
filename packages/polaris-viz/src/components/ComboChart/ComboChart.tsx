import React from 'react';
import {
  ChartProps,
  DEFAULT_CHART_PROPS,
  WithRequired,
  XAxisOptions,
} from '@shopify/polaris-viz-core';
import type {DataGroup} from '@shopify/polaris-viz-core/src/types';

import {getXAxisOptionsWithDefaults} from '../../utilities';
import {ChartContainer} from '../ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';

export type ComboChartProps = {
  data: DataGroup[];
  isAnimated?: boolean;
  showLegend?: boolean;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
} & Omit<ChartProps, 'data'>;

export function ComboChart(props: ComboChartProps) {
  const {
    data,
    isAnimated,
    showLegend = true,
    theme,
    xAxisOptions,
  }: WithRequired<ComboChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        showLegend={showLegend}
        theme={theme}
        xAxisOptions={xAxisOptionsWithDefaults}
      />
    </ChartContainer>
  );
}