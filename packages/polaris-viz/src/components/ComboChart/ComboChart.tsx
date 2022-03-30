import React from 'react';
import {
  ChartProps,
  DEFAULT_CHART_PROPS,
  WithRequired,
  XAxisOptions,
} from '@shopify/polaris-viz-core';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {flattenDataGroupToDataSeries} from '../../utilities/flattenDataGroupToDataSeries';
import {TooltipContent} from '../TooltipContent';
import {getXAxisOptionsWithDefaults} from '../../utilities';
import {ChartContainer} from '../ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';
import type {RenderTooltipContentData} from '../../types';

import {Chart} from './Chart';
import {formatDataForTooltip} from './utilities/formatDataForTooltip';

export type ComboChartProps = {
  data: DataGroup[];
  isAnimated?: boolean;
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  showLegend?: boolean;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
} & Omit<ChartProps, 'data'>;

export function ComboChart(props: ComboChartProps) {
  const {
    data,
    isAnimated,
    renderTooltipContent,
    showLegend = true,
    theme,
    xAxisOptions,
  }: WithRequired<ComboChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);

  const {prefersReducedMotion} = usePrefersReducedMotion();

  function renderTooltip(tooltipData: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({
        ...tooltipData,
        dataSeries: flattenDataGroupToDataSeries(data),
      });
    }

    const {title, formattedData} = formatDataForTooltip({
      data: tooltipData,
      xAxisOptions: xAxisOptionsWithDefaults,
    });

    return <TooltipContent data={formattedData} theme={theme} title={title} />;
  }

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        theme={theme}
        xAxisOptions={xAxisOptionsWithDefaults}
      />
    </ChartContainer>
  );
}
