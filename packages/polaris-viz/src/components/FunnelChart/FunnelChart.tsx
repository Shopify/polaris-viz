import type {ReactNode} from 'react';
import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  useTheme,
  useThemeSeriesColors,
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

export interface LabelHelpers {
  key: number | string;
  value: ReactNode | null;
}

export type FunnelChartProps = {
  xAxisOptions?: Omit<XAxisOptions, 'hide'>;
  yAxisOptions?: Omit<XAxisOptions, 'integersOnly'>;
  labelHelpers?: LabelHelpers[];
} & ChartProps;

export function FunnelChart(props: FunnelChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data,
    theme = defaultTheme,
    xAxisOptions,
    yAxisOptions,
    isAnimated,
    state,
    errorText,
    labelHelpers,
    onError,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  const xAxisOptionsForChart: Required<XAxisOptions> =
    getXAxisOptionsWithDefaults(xAxisOptions);

  const yAxisOptionsForChart: Required<YAxisOptions> =
    getYAxisOptionsWithDefaults(yAxisOptions);

  return (
    <ChartContainer
      data={data}
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
          data={seriesWithDefaults}
          labelHelpers={labelHelpers}
          xAxisOptions={xAxisOptionsForChart}
          yAxisOptions={yAxisOptionsForChart}
        />
      )}
    </ChartContainer>
  );
}
