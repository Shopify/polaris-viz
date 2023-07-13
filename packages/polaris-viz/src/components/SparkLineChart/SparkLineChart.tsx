import type {ChartProps} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  ChartState,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';

import {Chart} from './Chart';

export type SparkLineChartProps = {
  accessibilityLabel?: string;
  offsetLeft?: number;
  offsetRight?: number;
} & ChartProps;

export function SparkLineChart(props: SparkLineChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data,
    accessibilityLabel,
    isAnimated,
    offsetLeft = 0,
    offsetRight = 0,
    onError,
    theme = defaultTheme,
    state,
    errorText,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      isAnimated={isAnimated}
      data={data}
      theme={theme}
      sparkChart
      onError={onError}
    >
      {state !== ChartState.Success ? (
        <ChartSkeleton
          type="Spark"
          state={state}
          errorText={errorText}
          theme={theme}
        />
      ) : (
        <Chart
          data={data}
          accessibilityLabel={accessibilityLabel}
          offsetLeft={offsetLeft}
          offsetRight={offsetRight}
          theme={theme}
        />
      )}
    </ChartContainer>
  );
}
