import type {
  ChartType,
  XAxisOptions,
  ChartProps,
} from '@shopify/polaris-viz-core';
import {DEFAULT_CHART_PROPS, ChartState} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components';
import type {RenderLegendContent} from '../../types';

import {Chart} from './Chart';

export type SimpleBarChartProps = {
  renderLegendContent?: RenderLegendContent;
  showLegend?: boolean;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
} & ChartProps;

export function SimpleBarChart(props: SimpleBarChartProps) {
  const {
    isAnimated,
    data,
    renderLegendContent,
    showLegend = true,
    theme,
    type = 'default',
    xAxisOptions,
    state,
    errorText,
  }: SimpleBarChartProps = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults();

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
          showLegend={showLegend}
          type={type}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
        />
      )}
    </ChartContainer>
  );
}
