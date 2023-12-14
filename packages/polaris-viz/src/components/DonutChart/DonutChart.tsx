import type {LabelFormatter, ChartProps} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import type {
  LegendPosition,
  RenderInnerValueContent,
  RenderLegendContent,
} from '../../types';

import {Chart} from './Chart';
import type {DonutChartDataSeries} from './types';

export type DonutChartProps = {
  data: DonutChartDataSeries[];
  comparisonMetric?: ComparisonMetricProps;
  showLegend?: boolean;
  showLegendValues?: boolean;
  labelFormatter?: LabelFormatter;
  legendFullWidth?: boolean;
  legendPosition?: LegendPosition;
  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
} & ChartProps;

export function DonutChart(props: DonutChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data,
    theme = defaultTheme,
    comparisonMetric,
    showLegend = true,
    showLegendValues = false,
    labelFormatter = (value) => `${value}`,
    legendFullWidth,
    legendPosition = 'left',
    onError,
    isAnimated,
    state,
    errorText,
    renderInnerValueContent,
    renderLegendContent,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      skeletonType="Donut"
      data={data}
      onError={onError}
      theme={theme}
      isAnimated={isAnimated}
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
        theme={theme}
      />
    </ChartContainer>
  );
}
