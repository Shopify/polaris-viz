import {
  DEFAULT_CHART_PROPS,
  InternalChartType,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import type {
  DataGroup,
  ChartProps,
  XAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import {flattenDataGroupToDataSeries} from '../../utilities/flattenDataGroupToDataSeries';
import {TooltipContent} from '../TooltipContent';
import {getXAxisOptionsWithDefaults, normalizeData} from '../../utilities';
import {ChartContainer} from '../ChartContainer';
import type {
  ComboAnnotation,
  RenderAnnotationContentData,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';

import {Chart} from './Chart';
import {formatDataForTooltip} from './utilities/formatDataForTooltip';

export type ComboChartProps = {
  data: DataGroup[];
  annotations?: ComboAnnotation[];
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderTooltipContent?(data: RenderTooltipContentData): ReactNode;
  seriesNameFormatter?: LabelFormatter;
  showLegend?: boolean;
  xAxisOptions?: Partial<XAxisOptions>;
  renderLegendContent?: RenderLegendContent;
} & ChartProps<DataGroup[]>;

export function ComboChart(props: ComboChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    data,
    annotations = [],
    onError,
    id,
    isAnimated,
    renderAnnotationContent,
    renderTooltipContent,
    seriesNameFormatter = (value) => `${value}`,
    showLegend = true,
    theme = defaultTheme,
    xAxisOptions,
    renderLegendContent,
  } = {
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
      onError={onError}
      id={id}
      isAnimated={isAnimated}
      theme={theme}
      type={InternalChartType.Combo}
    >
      <Chart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        renderAnnotationContent={renderAnnotationContent}
        renderTooltipContent={renderTooltip}
        seriesNameFormatter={seriesNameFormatter}
        showLegend={showLegend}
        theme={theme}
        xAxisOptions={xAxisOptionsWithDefaults}
        renderLegendContent={renderLegendContent}
      />
    </ChartContainer>
  );
}
