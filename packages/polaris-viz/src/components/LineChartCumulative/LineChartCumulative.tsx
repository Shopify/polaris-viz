import {Fragment} from 'react';
import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  Color,
} from '@shopify/polaris-viz-core';
import {
  InternalChartType,
  ChartState,
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {fillMissingDataPoints} from '../../utilities/fillMissingDataPoints';
import {getLineChartDataWithDefaults} from '../../utilities/getLineChartDataWithDefaults';
import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';

import {Chart} from './Chart';

export type LineChartCumulativeProps = {
  errorText?: string;
  emptyStateText?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  scrollContainer?: Element | null;
  fixedActiveIndex: number;
  seriesColors: Color[];
} & ChartProps;

export function LineChartCumulative(props: LineChartCumulativeProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data: dataSeries,
    emptyStateText,
    errorText,
    id,
    isAnimated,
    onError,
    seriesNameFormatter = (value) => `${value}`,
    state,
    theme = defaultTheme,
    xAxisOptions,
    yAxisOptions,
    scrollContainer,
    fixedActiveIndex,
    seriesColors = ['#b0b0b6', '#b0b0b6', 'rgba(4, 123, 93, 1)'],
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = fillMissingDataPoints(dataSeries, true);

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const dataWithDefaults = getLineChartDataWithDefaults(data, seriesColors);

  return (
    <Fragment>
      <ChartContainer
        id={id}
        data={data}
        theme={theme}
        isAnimated={isAnimated}
        type={InternalChartType.Line}
        onError={onError}
        scrollContainer={scrollContainer}
      >
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            data={dataWithDefaults}
            emptyStateText={emptyStateText}
            seriesNameFormatter={seriesNameFormatter}
            theme={theme}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            fixedActiveIndex={fixedActiveIndex}
          />
        )}
      </ChartContainer>
    </Fragment>
  );
}
