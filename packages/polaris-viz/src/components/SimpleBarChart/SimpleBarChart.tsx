import type {
  ChartType,
  XAxisOptions,
  ChartProps,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  ChartState,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components';
import type {
  LegendPosition,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';

import {Chart} from './Chart';
import type {SimpleBarChartDataSeries} from './types';

export type SimpleBarChartProps = {
  data: SimpleBarChartDataSeries[];
  renderLegendContent?: RenderLegendContent;
  legendPosition?: LegendPosition;
  seriesNameFormatter?: LabelFormatter;
  showLegend?: boolean;
  tooltipOptions?: TooltipOptions;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
  yAxisOptions?: YAxisOptions;
} & ChartProps;

export function SimpleBarChart(props: SimpleBarChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    id,
    isAnimated,
    data,
    renderLegendContent,
    legendPosition = 'bottom-right',
    onError,
    seriesNameFormatter = (value) => `${value}`,
    showLegend = true,
    theme = defaultTheme,
    type = 'default',
    tooltipOptions,
    xAxisOptions,
    yAxisOptions,
    state,
    errorText,
  }: SimpleBarChartProps = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const renderTooltip = getTooltipContentRenderer({
    tooltipOptions,
    theme,
    data,
  });

  return (
    <ChartContainer
      data={data}
      theme={theme}
      id={id}
      isAnimated={isAnimated}
      onError={onError}
      skeletonType="SimpleBar"
    >
      {state !== ChartState.Success ? (
        <ChartSkeleton
          type="SimpleBar"
          state={state}
          errorText={errorText}
          theme={theme}
        />
      ) : (
        <Chart
          data={data}
          renderLegendContent={renderLegendContent}
          seriesNameFormatter={seriesNameFormatter}
          legendPosition={legendPosition}
          renderTooltipContent={renderTooltip}
          showLegend={showLegend}
          type={type}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
        />
      )}
    </ChartContainer>
  );
}
