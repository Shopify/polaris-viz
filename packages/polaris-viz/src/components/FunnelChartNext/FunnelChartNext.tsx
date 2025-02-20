import type {ChartProps, LabelFormatter} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  ChartState,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../';

import {Chart} from './Chart';
import type {FunnelChartDataSeries} from './types';

const DEFAULT_LABEL_FORMATTER: LabelFormatter = (value) => `${value}`;
const DEFAULT_TOOLTIP_LABELS = {
  reached: 'Reached this step',
  dropped: 'Dropped off',
} as const;

export type FunnelChartNextProps = {
  data: FunnelChartDataSeries[];
  tooltipLabels?: {
    reached: string;
    dropped: string;
  };
  showTooltip?: boolean;
  seriesNameFormatter?: LabelFormatter;
  labelFormatter?: LabelFormatter;
  renderScaleIconTooltipContent?: () => ReactNode;
  percentageFormatter?: (value: number) => string;
} & ChartProps;

export function FunnelChartNext(props: FunnelChartNextProps) {
  const {theme: defaultTheme} = useChartContext();

  const {
    data,
    theme = defaultTheme,
    id,
    isAnimated,
    state,
    errorText,
    tooltipLabels = DEFAULT_TOOLTIP_LABELS,
    showTooltip = true,
    seriesNameFormatter = DEFAULT_LABEL_FORMATTER,
    labelFormatter = DEFAULT_LABEL_FORMATTER,
    percentageFormatter,
    onError,
    renderScaleIconTooltipContent,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      data={data}
      id={id}
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
          data={data}
          tooltipLabels={tooltipLabels}
          showTooltip={showTooltip}
          seriesNameFormatter={seriesNameFormatter}
          labelFormatter={labelFormatter}
          percentageFormatter={percentageFormatter}
          renderScaleIconTooltipContent={renderScaleIconTooltipContent}
        />
      )}
    </ChartContainer>
  );
}
