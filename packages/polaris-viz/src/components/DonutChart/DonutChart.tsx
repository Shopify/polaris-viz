import type {LabelFormatter, ChartProps} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {useRenderTooltipContent} from '../../hooks';
import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import type {
  LegendPosition,
  RenderInnerValueContent,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';

import {Chart} from './Chart';

export type DonutChartProps = {
  comparisonMetric?: ComparisonMetricProps;
  showLegend?: boolean;
  labelFormatter?: LabelFormatter;
  legendFullWidth?: boolean;
  legendPosition?: LegendPosition;
  tooltipOptions?: TooltipOptions;
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
    labelFormatter = (value) => `${value}`,
    legendFullWidth,
    legendPosition = 'left',
    onError,
    isAnimated,
    state,
    errorText,
    tooltipOptions,
    renderInnerValueContent,
    renderLegendContent,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const renderTooltip = useRenderTooltipContent({tooltipOptions, theme, data});

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
        legendFullWidth={legendFullWidth}
        legendPosition={legendPosition}
        renderInnerValueContent={renderInnerValueContent}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={tooltipOptions ? renderTooltip : undefined}
        theme={theme}
      />
    </ChartContainer>
  );
}
