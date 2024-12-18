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

export type FunnelChartNextProps = {
  seriesNameFormatter?: LabelFormatter;
  labelFormatter?: LabelFormatter;
  renderScaleIconTooltipContent?: () => ReactNode;
  percentageFormatter?: (value: number) => string;
} & ChartProps;

const DEFAULT_LABEL_FORMATTER: LabelFormatter = (value) => `${value}`;

export function FunnelChartNext(props: FunnelChartNextProps) {
  const {theme: defaultTheme} = useChartContext();

  const {
    data,
    theme = defaultTheme,
    id,
    isAnimated,
    state,
    errorText,

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
          seriesNameFormatter={seriesNameFormatter}
          labelFormatter={labelFormatter}
          percentageFormatter={percentageFormatter}
          renderScaleIconTooltipContent={renderScaleIconTooltipContent}
        />
      )}
    </ChartContainer>
  );
}
