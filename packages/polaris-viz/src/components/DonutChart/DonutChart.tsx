import {
  LabelFormatter,
  ChartProps,
  WithRequired,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import type {
  LegendPosition,
  RenderInnerValueContent,
  RenderLegendContent,
} from '../../types';

import {Chart} from './Chart';

export type DonutChartProps = {
  comparisonMetric?: ComparisonMetricProps;
  showLegend?: boolean;
  labelFormatter?: LabelFormatter;
  legendFullWidth?: boolean;
  legendPosition?: LegendPosition;
  renderInnerValueContent?: RenderInnerValueContent;
  renderLegendContent?: RenderLegendContent;
} & ChartProps;

export function DonutChart(props: DonutChartProps) {
  const {
    data,
    theme,
    comparisonMetric,
    showLegend,
    labelFormatter,
    legendFullWidth,
    legendPosition,
    isAnimated,
    state,
    errorText,
    renderInnerValueContent,
    renderLegendContent,
  }: WithRequired<DonutChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    labelFormatter: (value) => `${value}`,
    showLegend: true,
    legendPosition: 'left',
    ...props,
  };

  return (
    <ChartContainer
      skeletonType="Donut"
      data={data}
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
        legendFullWidth={legendFullWidth}
        legendPosition={legendPosition}
        renderInnerValueContent={renderInnerValueContent}
        renderLegendContent={renderLegendContent}
        theme={theme}
      />
    </ChartContainer>
  );
}
