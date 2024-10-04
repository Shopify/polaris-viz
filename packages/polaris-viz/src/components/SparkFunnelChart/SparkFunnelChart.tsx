import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  ChartState,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';
import {
  getYAxisOptionsWithDefaults,
  getXAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartSkeleton} from '../';

import {Chart} from './Chart';

export type SparkFunnelChartProps = {
  tooltipLabels: {
    reached: string;
    dropped: string;
  };
  xAxisOptions?: Pick<XAxisOptions, 'hide'>;
  yAxisOptions?: Pick<YAxisOptions, 'labelFormatter'>;
} & ChartProps;

export function SparkFunnelChart(props: SparkFunnelChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data,
    theme = defaultTheme,
    xAxisOptions,
    yAxisOptions,
    id,
    isAnimated,
    state,
    errorText,
    onError,
    tooltipLabels,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsForChart: Required<XAxisOptions> =
    getXAxisOptionsWithDefaults(xAxisOptions);

  const yAxisOptionsForChart: Required<YAxisOptions> =
    getYAxisOptionsWithDefaults(yAxisOptions);

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
        <Chart
          data={data}
          xAxisOptions={xAxisOptionsForChart}
          yAxisOptions={yAxisOptionsForChart}
          tooltipLabels={tooltipLabels}
        />
      )}
    </ChartContainer>
  );
}
