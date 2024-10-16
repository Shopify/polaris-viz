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

export type FunnelChartNextProps = {
  showConnectionPercentage?: boolean;
  tooltipLabels: {
    reached: string;
    dropped: string;
  };
  xAxisOptions?: Pick<XAxisOptions, 'hide'>;
  yAxisOptions?: Pick<YAxisOptions, 'labelFormatter'>;
} & ChartProps;

export function FunnelChartNext(props: FunnelChartNextProps) {
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
    showConnectionPercentage = false,
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
          showConnectionPercentage={showConnectionPercentage}
          tooltipLabels={tooltipLabels}
          xAxisOptions={xAxisOptionsForChart}
          yAxisOptions={yAxisOptionsForChart}
        />
      )}
    </ChartContainer>
  );
}
