import React from 'react';
import {
  ChartProps,
  DEFAULT_CHART_PROPS,
  InternalChartType,
  WithRequired,
  XAxisOptions,
} from '@shopify/polaris-viz-core';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {flattenDataGroupToDataSeries} from '../../utilities/flattenDataGroupToDataSeries';
import {TooltipContent} from '../TooltipContent';
import {getXAxisOptionsWithDefaults, normalizeData} from '../../utilities';
import {ChartContainer} from '../ChartContainer';
import type {
  ComboAnnotation,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';

import {Chart} from './Chart';
import {formatDataForTooltip} from './utilities/formatDataForTooltip';

export type ComboChartProps = {
  data: DataGroup[];
  annotations?: ComboAnnotation[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  showLegend?: boolean;
  xAxisOptions?: Partial<XAxisOptions>;
  renderLegendContent?: RenderLegendContent;
} & ChartProps<DataGroup[]>;

export function ComboChart(props: ComboChartProps) {
  const {
    data,
    annotations = [],
    isAnimated,
    renderTooltipContent,
    showLegend = true,
    theme,
    xAxisOptions,
    renderLegendContent,
  }: WithRequired<ComboChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startKey');

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
    <ChartContainer
      data={data}
      isAnimated={isAnimated}
      theme={theme}
      type={InternalChartType.Combo}
    >
      <Chart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        theme={theme}
        xAxisOptions={xAxisOptionsWithDefaults}
        renderLegendContent={renderLegendContent}
      />
    </ChartContainer>
  );
}
