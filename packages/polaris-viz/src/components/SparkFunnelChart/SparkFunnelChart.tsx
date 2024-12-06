import type {ChartProps} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  ChartState,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../';

import {Chart} from './Chart';

export type SparkFunnelChartProps = {
  accessibilityLabel?: string;
} & ChartProps;

export function SparkFunnelChart(props: SparkFunnelChartProps) {
  const {theme: defaultTheme} = useChartContext();

  const {
    data,
    accessibilityLabel,
    theme = defaultTheme,
    id,
    isAnimated,
    state,
    errorText,
    onError,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      data={data}
      id={id}
      isAnimated={isAnimated}
      onError={onError}
      sparkChart
      theme={theme}
    >
      {state !== ChartState.Success ? (
        <ChartSkeleton
          type="Funnel"
          state={state}
          errorText={errorText}
          theme={theme}
        />
      ) : (
        <Chart data={data} accessibilityLabel={accessibilityLabel} />
      )}
    </ChartContainer>
  );
}
