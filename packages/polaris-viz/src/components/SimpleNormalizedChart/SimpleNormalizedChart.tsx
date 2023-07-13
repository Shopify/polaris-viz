import {
  ChartState,
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import type {
  ChartProps,
  Direction,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import type {LegendPosition, RenderLegendContent} from '../../types';

import {Chart} from './Chart';
import type {Size} from './types';

export type SimpleNormalizedChartProps = {
  comparisonMetrics?: ComparisonMetricProps[];
  labelFormatter?: LabelFormatter;
  legendPosition?: LegendPosition;
  direction?: Direction;
  size?: Size;
  showLegend?: boolean;
  renderLegendContent?: RenderLegendContent;
} & ChartProps;

export function SimpleNormalizedChart(props: SimpleNormalizedChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    comparisonMetrics = [],
    data,
    labelFormatter = (value) => `${value}`,
    legendPosition = 'top-left',
    direction = 'horizontal',
    size = 'small',
    showLegend = true,
    theme = defaultTheme,
    isAnimated,
    state,
    errorText,
    renderLegendContent,
    onError,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      data={data}
      theme={theme}
      isAnimated={isAnimated}
      onError={onError}
    >
      {state !== ChartState.Success ? (
        <ChartSkeleton
          type="SimpleNormalized"
          state={state}
          errorText={errorText}
          theme={theme}
          showLegend={showLegend && !renderLegendContent}
          size={size}
        />
      ) : (
        <Chart
          comparisonMetrics={comparisonMetrics}
          data={data}
          labelFormatter={labelFormatter}
          legendPosition={legendPosition}
          showLegend={showLegend}
          direction={direction}
          size={size}
          renderLegendContent={renderLegendContent}
        />
      )}
    </ChartContainer>
  );
}
