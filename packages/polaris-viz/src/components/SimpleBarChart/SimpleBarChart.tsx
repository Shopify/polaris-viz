import type {
  ChartType,
  XAxisOptions,
  ChartProps,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {DEFAULT_CHART_PROPS, ChartState} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components';
import type {LegendPosition, RenderLegendContent} from '../../types';

import {Chart} from './Chart';
import type {SimpleBarChartDataSeries} from './types';

export type SimpleBarChartProps = {
  data: SimpleBarChartDataSeries[];
  renderLegendContent?: RenderLegendContent;
  legendPosition?: LegendPosition;
  showLegend?: boolean;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
  yAxisOptions?: YAxisOptions;
} & ChartProps;

export function SimpleBarChart(props: SimpleBarChartProps) {
  const {
    isAnimated,
    data,
    renderLegendContent,
    legendPosition = 'bottom-right',
    showLegend = true,
    theme,
    type = 'default',
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

  return (
    <ChartContainer data={data} theme={theme} isAnimated={isAnimated}>
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
          legendPosition={legendPosition}
          showLegend={showLegend}
          type={type}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
        />
      )}
    </ChartContainer>
  );
}
