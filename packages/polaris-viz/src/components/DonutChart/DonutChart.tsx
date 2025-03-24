import type {LabelFormatter, ChartProps} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import type {
  LegendPosition,
  RenderHiddenLegendLabel,
  RenderInnerValueContent,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';
import {bucketDataSeries} from '../../utilities/bucketDataSeries';

import {Chart} from './Chart';
import type {DonutChartDataSeries} from './types';

export type DonutChartProps = {
  data: DonutChartDataSeries[];
  comparisonMetric?: ComparisonMetricProps;
  showLegend?: boolean;
  maxSeries?: number;
  showLegendValues?: boolean;
  labelFormatter?: LabelFormatter;
  legendFullWidth?: boolean;
  legendPosition?: LegendPosition;
  tooltipOptions?: TooltipOptions;

  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
  renderHiddenLegendLabel?: RenderHiddenLegendLabel;
  renderBucketLegendLabel?: () => string;
  seriesNameFormatter?: LabelFormatter;
} & ChartProps;

export function DonutChart(props: DonutChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data: dataSeries,
    theme = defaultTheme,
    comparisonMetric,
    showLegend = true,
    maxSeries,
    showLegendValues = false,
    labelFormatter = (value) => `${value}`,
    legendFullWidth,
    legendPosition = 'left',
    onError,
    id,
    isAnimated,
    state,
    errorText,
    tooltipOptions,
    renderInnerValueContent,
    renderLegendContent,
    renderHiddenLegendLabel,
    renderBucketLegendLabel,
    seriesNameFormatter = (value) => `${value}`,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = maxSeries
    ? bucketDataSeries({dataSeries, maxSeries, renderBucketLegendLabel})
    : dataSeries;

  const renderTooltip = getTooltipContentRenderer({
    tooltipOptions,
    theme,
    data,
    ignoreColorVisionEvents: true,
  });

  return (
    <ChartContainer
      skeletonType="Donut"
      data={data}
      onError={onError}
      theme={theme}
      isAnimated={isAnimated}
      id={id}
    >
      <Chart
        errorText={errorText}
        state={state}
        data={data}
        labelFormatter={labelFormatter}
        comparisonMetric={comparisonMetric}
        showLegend={showLegend}
        showLegendValues={showLegendValues}
        legendFullWidth={legendFullWidth}
        legendPosition={legendPosition}
        renderInnerValueContent={renderInnerValueContent}
        renderLegendContent={renderLegendContent}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
        seriesNameFormatter={seriesNameFormatter}
        renderTooltipContent={renderTooltip}
        theme={theme}
      />
    </ChartContainer>
  );
}
